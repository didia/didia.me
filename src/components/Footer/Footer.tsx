import Link from 'next/link';
import siteConfig from '@/lib/config';
import { getContactHref } from '../../utils';
import styles from './Footer.module.scss';

const Footer = () => {
  const { author, copyright } = siteConfig;

  return (
    <footer className={styles['footer']}>
      <div className={styles['footer__inner']}>
        <div className={styles['footer__columns']}>
          <div className={styles['footer__brand']}>
            <p className={styles['footer__name']}>{author.name}</p>
            <p className={styles['footer__tagline']}>Fractional CTO for ROI-Driven AI and Cost Optimisation</p>
          </div>
          <div className={styles['footer__nav']}>
            <p className={styles['footer__nav-title']}>Navigation</p>
            <Link href="/">Home</Link>
            <Link href="/#services">Services</Link>
            <Link href="/about/">About</Link>
            <Link href="/blog/">Blog</Link>
            <Link href="/contact/">Contact</Link>
          </div>
          <div className={styles['footer__nav']}>
            <p className={styles['footer__nav-title']}>Connect</p>
            <a href={getContactHref('email', author.contacts.email)}>Email</a>
            <a href={getContactHref('linkedin', author.contacts.linkedin)} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://www.rdcetudes.com" target="_blank" rel="noopener noreferrer">
              RDC Etudes
            </a>
          </div>
        </div>
        <div className={styles['footer__bottom']}>
          <p className={styles['footer__copyright']}>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
