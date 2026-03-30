import type { Metadata } from 'next';
import Link from 'next/link';
import siteConfig from '@/lib/config';
import { getPosts, getAllCategories } from '@/lib/content';
import Navbar from '@/src/components/Navbar/Navbar';
import Footer from '@/src/components/Footer/Footer';
import Page from '@/src/components/Page/Page';

export const metadata: Metadata = {
  title: `Categories - ${siteConfig.title}`,
};

export default async function CategoriesPage() {
  const posts = await getPosts();
  const categories = getAllCategories(posts);

  return (
    <>
      <Navbar />
      <main>
        <Page title="Categories">
          <ul>
            {categories.map((category) => (
              <li key={category.name}>
                <Link href={category.slug}>
                  {category.name} ({category.count})
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
