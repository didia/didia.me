import type { Metadata } from 'next';
import Link from 'next/link';
import siteConfig from '@/lib/config';
import { getPosts, getAllTags } from '@/lib/content';
import Navbar from '@/src/components/Navbar/Navbar';
import Footer from '@/src/components/Footer/Footer';
import Page from '@/src/components/Page/Page';

export const metadata: Metadata = {
  title: `Tags - ${siteConfig.title}`,
};

export default async function TagsPage() {
  const posts = await getPosts();
  const tags = getAllTags(posts);

  return (
    <>
      <Navbar />
      <main>
        <Page title="Tags">
          <ul>
            {tags.map((tag) => (
              <li key={tag.name}>
                <Link href={tag.slug}>
                  {tag.name} ({tag.count})
                </Link>
              </li>
            ))}
          </ul>
        </Page>
      </main>
      <Footer />
    </>
  );
}
