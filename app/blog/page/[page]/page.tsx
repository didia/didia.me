import type { Metadata } from 'next';
import siteConfig from '@/lib/config';
import { getPosts, paginate } from '@/lib/content';
import Navbar from '@/src/components/Navbar/Navbar';
import Page from '@/src/components/Page/Page';
import Feed from '@/src/components/Feed/Feed';
import Pagination from '@/src/components/Pagination/Pagination';
import Footer from '@/src/components/Footer/Footer';

interface Props {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  const totalPages = Math.ceil(posts.length / siteConfig.postsPerPage);
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 1),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog - Page ${Number(page) + 1} - ${siteConfig.title}`,
  };
}

export default async function PaginatedBlogPage({ params }: Props) {
  const { page } = await params;
  const pageNum = Number(page);
  const posts = await getPosts();
  const { items, hasNextPage, hasPrevPage } = paginate(posts, pageNum, siteConfig.postsPerPage);

  return (
    <>
      <Navbar />
      <main>
        <Page title="Blog">
          <Feed posts={items} />
          <Pagination
            prevPagePath={pageNum <= 1 ? '/blog/' : `/blog/page/${pageNum - 1}/`}
            nextPagePath={`/blog/page/${pageNum + 1}/`}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
          />
        </Page>
      </main>
      <Footer />
    </>
  );
}
