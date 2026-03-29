import siteConfig from '@/lib/config';
import Contacts from '../../Contacts/Contacts';
import styles from './Author.module.scss';

const Author = () => {
  const { author } = siteConfig;

  return (
    <div className={styles['author']}>
      <p className={styles['author__bio']}>
        {author.bio}
        <Contacts contacts={author.contacts} />
      </p>
    </div>
  );
};

export default Author;
