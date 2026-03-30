import { ContentItem, PostFrontmatter } from '@/lib/content';
import Author from './Author/Author';
import Comments from './Comments/Comments';
import Content from './Content/Content';
import Meta from './Meta/Meta';
import Tags from './Tags/Tags';
import CallToAction from './CallToAction/CallToAction';
import styles from './Post.module.scss';

interface PostProps {
  post: ContentItem<PostFrontmatter>;
}

const Post = ({ post }: PostProps) => {
  const { tags, title, date } = post.frontmatter;

  return (
    <div className={styles['post']}>
      <div className={styles['post__content']}>
        <Content body={post.html} title={title} />
      </div>

      <div className={styles['post__footer']}>
        <CallToAction />
        <Meta date={date} />
        {tags && tags.length > 0 && <Tags tags={tags} tagSlugs={post.tagSlugs} />}
        <Author />
      </div>

      <div className={styles['post__comments']}>
        <Comments postSlug={post.slug} postTitle={title} />
      </div>
    </div>
  );
};

export default Post;
