import type { Metadata } from 'next';
import siteConfig from '@/lib/config';
import { getPosts, paginate } from '@/lib/content';
import Sidebar from '@/src/components/Sidebar/Sidebar';
import Page from '@/src/components/Page/Page';
import Feed from '@/src/components/Feed/Feed';
import Pagination from '@/src/components/Pagination/Pagination';
import styles from '@/src/components/Layout/Layout.module.scss';

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
    title: `Posts - Page ${Number(page) + 1} - ${siteConfig.title}`,
  };
}

export default async function PaginatedHomePage({ params }: Props) {
  const { page } = await params;
  const pageNum = Number(page);
  const posts = await getPosts();
  const { items, hasNextPage, hasPrevPage } = paginate(posts, pageNum, siteConfig.postsPerPage);

  return (
    <div className={styles['layout']}>
      <Sidebar />
      <Page>
        <Feed posts={items} />
        <Pagination
          prevPagePath={pageNum <= 1 ? '/' : `/page/${pageNum - 1}/`}
          nextPagePath={`/page/${pageNum + 1}/`}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </div>
  );
}
