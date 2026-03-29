import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import siteConfig from '@/lib/config';
import { getPosts, getPages } from '@/lib/content';
import Post from '@/src/components/Post/Post';
import Sidebar from '@/src/components/Sidebar/Sidebar';
import Page from '@/src/components/Page/Page';
import styles from '@/src/components/Layout/Layout.module.scss';

interface Props {
  params: Promise<{ slug: string[] }>;
}

function slugToPath(segments: string[]): string {
  return `/${segments.join('/')}/`;
}

export async function generateStaticParams() {
  const [posts, pages] = await Promise.all([getPosts(), getPages()]);
  const params: { slug: string[] }[] = [];

  for (const post of posts) {
    const clean = post.slug.replace(/^\/|\/$/g, '');
    if (clean) {
      params.push({ slug: clean.split('/') });
    }
  }

  for (const page of pages) {
    const clean = page.slug.replace(/^\/|\/$/g, '');
    if (clean) {
      params.push({ slug: clean.split('/') });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = slugToPath(slug);
  const [posts, pages] = await Promise.all([getPosts(), getPages()]);

  const post = posts.find((p) => p.slug === path || p.slug === `/${slug.join('/')}` || p.slug.replace(/\/$/,'') === `/${slug.join('/')}`);
  if (post) {
    return {
      title: `${post.frontmatter.title} - ${siteConfig.title}`,
      description: post.frontmatter.description || siteConfig.subtitle,
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        type: 'article',
        authors: ['Aristote Diasonama'],
        images: post.frontmatter.thumbnail
          ? [{ url: post.frontmatter.thumbnail }]
          : [{ url: siteConfig.image, width: Number(siteConfig.imageWidth), height: Number(siteConfig.imageHeight) }],
      },
      twitter: {
        card: 'summary_large_image',
        creator: '@didia_aristote',
      },
    };
  }

  const page = pages.find((p) => p.slug === path || p.slug === `/${slug.join('/')}`);
  if (page) {
    return {
      title: `${page.frontmatter.title} - ${siteConfig.title}`,
    };
  }

  return {};
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;
  const path = slugToPath(slug);
  const [posts, pages] = await Promise.all([getPosts(), getPages()]);

  const post = posts.find((p) => p.slug === path || p.slug === `/${slug.join('/')}` || p.slug.replace(/\/$/,'') === `/${slug.join('/')}`);
  if (post) {
    return <Post post={post} />;
  }

  const page = pages.find((p) => p.slug === path || p.slug === `/${slug.join('/')}`);
  if (page) {
    return (
      <div className={styles['layout']}>
        <Sidebar />
        <Page title={page.frontmatter.title}>
          <div dangerouslySetInnerHTML={{ __html: page.html }} />
        </Page>
      </div>
    );
  }

  notFound();
}
