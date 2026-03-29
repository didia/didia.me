import type { Metadata } from 'next';
import siteConfig from '@/lib/config';
import { getBooks, paginate } from '@/lib/content';
import Sidebar from '@/src/components/Sidebar/Sidebar';
import Page from '@/src/components/Page/Page';
import BookFeed from '@/src/components/BookFeed/BookFeed';
import Pagination from '@/src/components/Pagination/Pagination';
import styles from '@/src/components/Layout/Layout.module.scss';

interface Props {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const books = await getBooks();
  const totalPages = Math.ceil(books.length / siteConfig.postsPerPage);
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 1),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Page ${Number(page) + 1} - Livres lus par Didia Aristote`,
    description: "Je partage ici les livres que je suis entrain de lire ou que j'ai lus dans le passé",
  };
}

export default async function PaginatedBooksPage({ params }: Props) {
  const { page } = await params;
  const pageNum = Number(page);
  const books = await getBooks();
  const { items, hasNextPage, hasPrevPage } = paginate(books, pageNum, siteConfig.postsPerPage);

  return (
    <div className={styles['layout']}>
      <Sidebar />
      <Page>
        <BookFeed books={items} />
        <Pagination
          prevPagePath={pageNum <= 1 ? '/books/' : `/books/page/${pageNum - 1}/`}
          nextPagePath={`/books/page/${pageNum + 1}/`}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </div>
  );
}
