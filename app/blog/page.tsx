import type { Metadata } from 'next';
import siteConfig from '@/lib/config';
import { getPosts, paginate } from '@/lib/content';
import Navbar from '@/src/components/Navbar/Navbar';
import Page from '@/src/components/Page/Page';
import Feed from '@/src/components/Feed/Feed';
import Pagination from '@/src/components/Pagination/Pagination';
import Footer from '@/src/components/Footer/Footer';

export const metadata: Metadata = {
  title: `Blog - ${siteConfig.title}`,
};

export default async function BlogPage() {
  const posts = await getPosts();
  const { items, hasNextPage, hasPrevPage } = paginate(posts, 0, siteConfig.postsPerPage);

  return (
    <>
      <Navbar />
      <main>
        <Page title="Blog">
          <Feed posts={items} />
          <Pagination
            prevPagePath="/blog/"
            nextPagePath="/blog/page/1/"
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
          />
        </Page>
      </main>
      <Footer />
    </>
  );
}
