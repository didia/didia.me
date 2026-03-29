import siteConfig from '@/lib/config';
import Author from './Author/Author';
import Contacts from '../Contacts/Contacts';
import Copyright from './Copyright/Copyright';
import FollowButtons from '../FollowButtons/FollowButtons';
import Menu from './Menu/Menu';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  isIndex?: boolean;
}

const Sidebar = ({ isIndex }: SidebarProps) => {
  const { author, copyright, menu } = siteConfig;

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        <Author author={author} isIndex={isIndex} />
        <FollowButtons />
        <Menu menu={menu} />
        <Contacts contacts={author.contacts} />
        <Copyright copyright={copyright} />
      </div>
    </div>
  );
};

export default Sidebar;
