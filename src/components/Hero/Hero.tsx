import Link from 'next/link';
import siteConfig from '@/lib/config';
import styles from './Hero.module.scss';

const Hero = () => {
  const { author } = siteConfig;

  return (
    <section className={styles['hero']}>
      <div className={styles['hero__inner']}>
        <div className={styles['hero__content']}>
          <p className={styles['hero__label']}>Fractional CTO</p>
          <h1 className={styles['hero__title']}>
            Turning AI and technology investments into{' '}
            <span className={styles['hero__title-accent']}>measurable ROI</span>.
          </h1>
          <p className={styles['hero__description']}>
            I work with growing companies to reduce technology costs and turn AI initiatives into measurable business
            outcomes. By aligning technology strategy with financial priorities, I help leadership teams simplify
            architecture, eliminate waste, and focus investments on initiatives that deliver real value.
          </p>
          <div className={styles['hero__actions']}>
            <Link href="/contact/" className={styles['hero__cta']}>
              Book a Call
            </Link>
            <Link href="/#services" className={styles['hero__cta-secondary']}>
              View Services
            </Link>
          </div>
        </div>
        <div className={styles['hero__photo']}>
          <img src={author.photo} alt={author.name} className={styles['hero__photo-img']} width="280" height="280" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
