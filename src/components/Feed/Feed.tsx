import Link from 'next/link';
import { format } from 'date-fns';
import { ContentItem, PostFrontmatter } from '@/lib/content';
import styles from './Feed.module.scss';

interface FeedProps {
  posts: ContentItem<PostFrontmatter>[];
}

const Feed = ({ posts }: FeedProps) => (
  <div className={styles['feed']}>
    {posts.map((post) => (
      <div className={styles['feed__item']} key={post.slug}>
        <div className={styles['feed__item-meta']}>
          <time
            className={styles['feed__item-meta-time']}
            dateTime={format(new Date(post.frontmatter.date), 'MMMM d, yyyy')}
          >
            {format(new Date(post.frontmatter.date), 'MMMM yyyy')}
          </time>
          <span className={styles['feed__item-meta-divider']} />
          <span className={styles['feed__item-meta-category']}>
            <Link href={post.categorySlug} className={styles['feed__item-meta-category-link']}>
              {post.frontmatter.category}
            </Link>
          </span>
        </div>
        <h2 className={styles['feed__item-title']}>
          <Link className={styles['feed__item-title-link']} href={post.slug}>
            {post.frontmatter.title}
          </Link>
        </h2>
        <p className={styles['feed__item-description']}>{post.frontmatter.description}</p>
        <Link className={styles['feed__item-readmore']} href={post.slug}>
          Read
        </Link>
      </div>
    ))}
  </div>
);

export default Feed;
