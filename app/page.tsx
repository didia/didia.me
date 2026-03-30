import { getPosts } from '@/lib/content';
import Navbar from '@/src/components/Navbar/Navbar';
import Hero from '@/src/components/Hero/Hero';
import SocialProof from '@/src/components/SocialProof/SocialProof';
import Framework from '@/src/components/Framework/Framework';
import Services from '@/src/components/Services/Services';
import RecentPosts from '@/src/components/RecentPosts/RecentPosts';
import Footer from '@/src/components/Footer/Footer';

export default async function HomePage() {
  const posts = await getPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Framework />
        <Services />
        <RecentPosts posts={recentPosts} />
      </main>
      <Footer />
    </>
  );
}
