import type { Metadata } from 'next';
import siteConfig from '@/lib/config';
import { getPosts, getAllTags, getPostsByTag, paginate } from '@/lib/content';
import Navbar from '@/src/components/Navbar/Navbar';
import Footer from '@/src/components/Footer/Footer';
import Page from '@/src/components/Page/Page';
import Feed from '@/src/components/Feed/Feed';
import Pagination from '@/src/components/Pagination/Pagination';

interface Props {
  params: Promise<{ slug: string; page: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  const tags = getAllTags(posts);
  const params: { slug: string; page: string }[] = [];

  for (const tag of tags) {
    const tagSlug = tag.slug.replace(/^\/tag\/|\/$/g, '');
    const tagPosts = getPostsByTag(posts, tagSlug);
    const totalPages = Math.ceil(tagPosts.length / siteConfig.postsPerPage);
    for (let i = 1; i < totalPages; i++) {
      params.push({ slug: tagSlug, page: String(i) });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, page } = await params;
  const posts = await getPosts();
  const tags = getAllTags(posts);
  const tag = tags.find((t) => t.slug === `/tag/${slug}/`);
  return {
    title: `All Posts tagged as "${tag?.name || slug}" - Page ${Number(page) + 1} - ${siteConfig.title}`,
  };
}

export default async function PaginatedTagPage({ params }: Props) {
  const { slug, page } = await params;
  const pageNum = Number(page);
  const posts = await getPosts();
  const tags = getAllTags(posts);
  const tag = tags.find((t) => t.slug === `/tag/${slug}/`);
  const tagPosts = getPostsByTag(posts, slug);
  const { items, hasNextPage, hasPrevPage } = paginate(tagPosts, pageNum, siteConfig.postsPerPage);

  return (
    <>
      <Navbar />
      <main>
        <Page title={tag?.name || slug}>
          <Feed posts={items} />
          <Pagination
            prevPagePath={pageNum <= 1 ? `/tag/${slug}/` : `/tag/${slug}/page/${pageNum - 1}/`}
            nextPagePath={`/tag/${slug}/page/${pageNum + 1}/`}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
          />
        </Page>
      </main>
      <Footer />
    </>
  );
}
