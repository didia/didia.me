import type { Metadata } from 'next';
import siteConfig from '@/lib/config';
import { getPosts, getAllTags, getPostsByTag, paginate } from '@/lib/content';
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
  const tags = getAllTags(posts);
  return tags.map((tag) => ({
    slug: tag.slug.replace(/^\/tag\/|\/$/g, ''),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getPosts();
  const tags = getAllTags(posts);
  const tag = tags.find((t) => t.slug === `/tag/${slug}/`);
  return {
    title: `All Posts tagged as "${tag?.name || slug}" - ${siteConfig.title}`,
  };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const posts = await getPosts();
  const tags = getAllTags(posts);
  const tag = tags.find((t) => t.slug === `/tag/${slug}/`);
  const tagPosts = getPostsByTag(posts, slug);
  const { items, hasNextPage, hasPrevPage } = paginate(tagPosts, 0, siteConfig.postsPerPage);

  return (
    <div className={styles['layout']}>
      <Sidebar />
      <Page title={tag?.name || slug}>
        <Feed posts={items} />
        <Pagination
          prevPagePath={`/tag/${slug}/`}
          nextPagePath={`/tag/${slug}/page/1/`}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </div>
  );
}
