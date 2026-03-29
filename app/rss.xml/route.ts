import { Feed } from 'feed';
import siteConfig from '@/lib/config';
import { getPosts } from '@/lib/content';

export const dynamic = 'force-static';

export async function GET() {
  const posts = await getPosts();

  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.subtitle,
    id: siteConfig.url,
    link: siteConfig.url,
    copyright: siteConfig.copyright,
    author: {
      name: siteConfig.author.name,
      email: siteConfig.author.contacts.email,
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.frontmatter.title,
      id: `${siteConfig.url}${post.slug}`,
      link: `${siteConfig.url}${post.slug}`,
      description: post.frontmatter.description,
      content: post.html,
      date: new Date(post.frontmatter.date),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
