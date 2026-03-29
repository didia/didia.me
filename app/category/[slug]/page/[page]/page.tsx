import type { Metadata } from 'next';
import siteConfig from '@/lib/config';
import { getPosts, getAllCategories, getPostsByCategory, paginate } from '@/lib/content';
import Sidebar from '@/src/components/Sidebar/Sidebar';
import Page from '@/src/components/Page/Page';
import Feed from '@/src/components/Feed/Feed';
import Pagination from '@/src/components/Pagination/Pagination';
import styles from '@/src/components/Layout/Layout.module.scss';

interface Props {
  params: Promise<{ slug: string; page: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  const categories = getAllCategories(posts);
  const params: { slug: string; page: string }[] = [];

  for (const cat of categories) {
    const catSlug = cat.slug.replace(/^\/category\/|\/$/g, '');
    const catPosts = getPostsByCategory(posts, catSlug);
    const totalPages = Math.ceil(catPosts.length / siteConfig.postsPerPage);
    for (let i = 1; i < totalPages; i++) {
      params.push({ slug: catSlug, page: String(i) });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, page } = await params;
  const posts = await getPosts();
  const categories = getAllCategories(posts);
  const category = categories.find((c) => c.slug === `/category/${slug}/`);
  return {
    title: `${category?.name || slug} - Page ${Number(page) + 1} - ${siteConfig.title}`,
  };
}

export default async function PaginatedCategoryPage({ params }: Props) {
  const { slug, page } = await params;
  const pageNum = Number(page);
  const posts = await getPosts();
  const categories = getAllCategories(posts);
  const category = categories.find((c) => c.slug === `/category/${slug}/`);
  const categoryPosts = getPostsByCategory(posts, slug);
  const { items, hasNextPage, hasPrevPage } = paginate(categoryPosts, pageNum, siteConfig.postsPerPage);

  return (
    <div className={styles['layout']}>
      <Sidebar />
      <Page title={category?.name || slug}>
        <Feed posts={items} />
        <Pagination
          prevPagePath={pageNum <= 1 ? `/category/${slug}/` : `/category/${slug}/page/${pageNum - 1}/`}
          nextPagePath={`/category/${slug}/page/${pageNum + 1}/`}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </div>
  );
}
