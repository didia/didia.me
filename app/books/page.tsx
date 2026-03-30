import type { Metadata } from 'next';
import siteConfig from '@/lib/config';
import { getBooks, paginate } from '@/lib/content';
import Navbar from '@/src/components/Navbar/Navbar';
import Footer from '@/src/components/Footer/Footer';
import Page from '@/src/components/Page/Page';
import BookFeed from '@/src/components/BookFeed/BookFeed';
import Pagination from '@/src/components/Pagination/Pagination';

export const metadata: Metadata = {
  title: 'Livres lus par Didia Aristote',
  description: "Je partage ici les livres que je suis entrain de lire ou que j'ai lus dans le passé",
};

export default async function BooksPage() {
  const books = await getBooks();
  const { items, hasNextPage, hasPrevPage } = paginate(books, 0, siteConfig.postsPerPage);

  return (
    <>
      <Navbar />
      <main>
        <Page>
          <BookFeed books={items} />
          <Pagination
            prevPagePath="/books/"
            nextPagePath="/books/page/1/"
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
          />
        </Page>
      </main>
      <Footer />
    </>
  );
}
