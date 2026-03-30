'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import siteConfig from '@/lib/config';
import styles from './Navbar.module.scss';

const isAbsoluteUrl = (url: string) => /^https?:\/\/.+/.test(url);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { menu, author } = siteConfig;

  return (
    <nav className={styles['navbar']}>
      <div className={styles['navbar__inner']}>
        <Link href="/" className={styles['navbar__brand']}>
          {author.name}
        </Link>
        <button
          className={styles['navbar__toggle']}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span className={styles['navbar__toggle-bar']} />
          <span className={styles['navbar__toggle-bar']} />
          <span className={styles['navbar__toggle-bar']} />
        </button>
        <ul className={`${styles['navbar__menu']} ${mobileOpen ? styles['navbar__menu--open'] : ''}`}>
          {menu.map((item) => (
            <li key={item.path} className={styles['navbar__menu-item']}>
              {isAbsoluteUrl(item.path) ? (
                <a
                  href={item.path}
                  className={styles['navbar__menu-link']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.path}
                  className={`${styles['navbar__menu-link']} ${
                    pathname === item.path ? styles['navbar__menu-link--active'] : ''
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
