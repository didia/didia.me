import type { Metadata } from 'next';
import siteConfig from '@/lib/config';
import { getPosts, getAllCategories, getPostsByCategory, paginate } from '@/lib/content';
import Navbar from '@/src/components/Navbar/Navbar';
import Footer from '@/src/components/Footer/Footer';
import Page from '@/src/components/Page/Page';
import Feed from '@/src/components/Feed/Feed';
import Pagination from '@/src/components/Pagination/Pagination';

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
    <>
      <Navbar />
      <main>
        <Page title={category?.name || slug}>
          <Feed posts={items} />
          <Pagination
            prevPagePath={`/category/${slug}/`}
            nextPagePath={`/category/${slug}/page/1/`}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
          />
        </Page>
      </main>
      <Footer />
    </>
  );
}
