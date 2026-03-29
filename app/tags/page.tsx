import type { Metadata } from 'next';
import Link from 'next/link';
import siteConfig from '@/lib/config';
import { getPosts, getAllTags } from '@/lib/content';
import Sidebar from '@/src/components/Sidebar/Sidebar';
import Page from '@/src/components/Page/Page';
import styles from '@/src/components/Layout/Layout.module.scss';

export const metadata: Metadata = {
  title: `Tags - ${siteConfig.title}`,
};

export default async function TagsPage() {
  const posts = await getPosts();
  const tags = getAllTags(posts);

  return (
    <div className={styles['layout']}>
      <Sidebar />
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
    </div>
  );
}
