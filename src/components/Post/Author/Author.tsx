import siteConfig from '@/lib/config';
import Contacts from '../../Contacts/Contacts';
import styles from './Author.module.scss';

const Author = () => {
  const { author } = siteConfig;

  return (
    <div className={styles['author']}>
      <div className={styles['author__bio']}>
        {author.bio}
        <Contacts contacts={author.contacts} />
      </div>
    </div>
  );
};

export default Author;
