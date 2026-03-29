import Link from 'next/link';
import styles from './Tags.module.scss';

interface TagsProps {
  tags: string[];
  tagSlugs: string[];
}

const Tags = ({ tags, tagSlugs }: TagsProps) => (
  <div className={styles['tags']}>
    <ul className={styles['tags__list']}>
      {tagSlugs.map((slug, i) => (
        <li className={styles['tags__list-item']} key={tags[i]}>
          <Link href={slug} className={styles['tags__list-item-link']}>
            {tags[i]}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Tags;
