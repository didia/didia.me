import type { Metadata } from 'next';
import siteConfig from '@/lib/config';
import { getPosts, getAllCategories, getPostsByCategory, paginate } from '@/lib/content';
import Sidebar from '@/src/components/Sidebar/Sidebar';
import Page from '@/src/components/Page/Page';
import Feed from '@/src/components/Feed/Feed';
import Pagination from '@/src/components/Pagination/Pagination';
import styles from '@/src/components/Layout/Layout.module.scss';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  const categories = getAllCategories(posts);
  return categories.map((cat) => ({
    slug: cat.slug.replace(/^\/category\/|\/$/g, ''),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getPosts();
  const categories = getAllCategories(posts);
  const category = categories.find((c) => c.slug === `/category/${slug}/`);
  return {
    title: `${category?.name || slug} - ${siteConfig.title}`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const posts = await getPosts();
  const categories = getAllCategories(posts);
  const category = categories.find((c) => c.slug === `/category/${slug}/`);
  const categoryPosts = getPostsByCategory(posts, slug);
  const { items, hasNextPage, hasPrevPage } = paginate(categoryPosts, 0, siteConfig.postsPerPage);

  return (
    <div className={styles['layout']}>
      <Sidebar />
      <Page title={category?.name || slug}>
        <Feed posts={items} />
        <Pagination
          prevPagePath={`/category/${slug}/`}
          nextPagePath={`/category/${slug}/page/1/`}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </div>
  );
}
