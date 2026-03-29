'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Menu.module.scss';

const isAbsoluteUrl = (url: string) => /^https?:\/\/.+/.test(url);

interface MenuItem {
  label: string;
  path: string;
}

interface MenuProps {
  menu: readonly MenuItem[];
}

const Menu = ({ menu }: MenuProps) => {
  const pathname = usePathname();

  return (
    <nav className={styles['menu']}>
      <ul className={styles['menu__list']}>
        {menu.map((item) => (
          <li className={styles['menu__list-item']} key={item.path}>
            {isAbsoluteUrl(item.path) ? (
              <a href={item.path} className={styles['menu__list-item-link']}>
                {item.label}
              </a>
            ) : (
              <Link
                href={item.path}
                className={`${styles['menu__list-item-link']}${
                  pathname === item.path ? ` ${styles['menu__list-item-link--active']}` : ''
                }`}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
