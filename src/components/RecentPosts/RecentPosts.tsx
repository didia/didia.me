import Link from 'next/link';
import { format } from 'date-fns';
import { ContentItem, PostFrontmatter } from '@/lib/content';
import styles from './RecentPosts.module.scss';

interface RecentPostsProps {
  posts: ContentItem<PostFrontmatter>[];
}

const RecentPosts = ({ posts }: RecentPostsProps) => (
  <section className={styles['recent']}>
    <div className={styles['recent__inner']}>
      <div className={styles['recent__header']}>
        <div>
          <p className={styles['recent__label']}>Blog</p>
          <h2 className={styles['recent__title']}>Latest Thoughts</h2>
        </div>
        <Link href="/blog/" className={styles['recent__view-all']}>
          View all articles &rarr;
        </Link>
      </div>
      <div className={styles['recent__grid']}>
        {posts.map((post) => (
          <article className={styles['recent__post']} key={post.slug}>
            <div className={styles['recent__post-meta']}>
              <time dateTime={format(new Date(post.frontmatter.date), 'yyyy-MM-dd')}>
                {format(new Date(post.frontmatter.date), 'MMMM yyyy')}
              </time>
              <span className={styles['recent__post-category']}>
                {post.frontmatter.category}
              </span>
            </div>
            <h3 className={styles['recent__post-title']}>
              <Link href={post.slug}>{post.frontmatter.title}</Link>
            </h3>
            <p className={styles['recent__post-description']}>
              {post.frontmatter.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default RecentPosts;
