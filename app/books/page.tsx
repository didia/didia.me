import type { Metadata } from 'next';
import siteConfig from '@/lib/config';
import { getBooks, paginate } from '@/lib/content';
import Sidebar from '@/src/components/Sidebar/Sidebar';
import Page from '@/src/components/Page/Page';
import BookFeed from '@/src/components/BookFeed/BookFeed';
import Pagination from '@/src/components/Pagination/Pagination';
import styles from '@/src/components/Layout/Layout.module.scss';

export const metadata: Metadata = {
  title: 'Livres lus par Didia Aristote',
  description: "Je partage ici les livres que je suis entrain de lire ou que j'ai lus dans le passé",
};

export default async function BooksPage() {
  const books = await getBooks();
  const { items, hasNextPage, hasPrevPage } = paginate(books, 0, siteConfig.postsPerPage);

  return (
    <div className={styles['layout']}>
      <Sidebar />
      <Page>
        <BookFeed books={items} />
        <Pagination
          prevPagePath="/books/"
          nextPagePath="/books/page/1/"
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </div>
  );
}
