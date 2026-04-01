import type { Metadata } from 'next';
import siteConfig from '@/lib/config';
import Navbar from '@/src/components/Navbar/Navbar';
import Footer from '@/src/components/Footer/Footer';
import styles from './contact.module.scss';

export const metadata: Metadata = {
  title: `Contact - ${siteConfig.title}`,
  description: 'Get in touch to discuss technology strategy, Fractional CTO engagements, or how we can work together.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className={styles['contact']}>
          <div className={styles['contact__inner']}>
            <h1 className={styles['contact__title']}>Let&apos;s Talk</h1>
            <p className={styles['contact__subtitle']}>
              Whether you are looking for a Fractional CTO, need a technology cost audit, or want to explore how AI can
              deliver real ROI for your business — I would love to hear from you.
            </p>

            <div className={styles['contact__options']}>
              <div className={styles['contact__option']}>
                <span className={styles['contact__option-icon']}>&#9993;</span>
                <h2>Send an Email</h2>
                <p>
                  The simplest way to start a conversation. Tell me about your challenge and I will reply within 24
                  hours.
                </p>
                <a
                  href="mailto:aristote@didia.me?subject=Fractional%20CTO%20Inquiry"
                  className={styles['contact__cta']}
                >
                  aristote@didia.me
                </a>
              </div>

              <div className={styles['contact__option']}>
                <span className={styles['contact__option-icon']}>&#128197;</span>
                <h2>Book a Discovery Call</h2>
                <p>
                  Prefer to talk live? Book a free 30-minute call to discuss your technology challenges and see if we
                  are a good fit.
                </p>
                <a
                  href="https://www.linkedin.com/in/diasonama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['contact__cta']}
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            <div className={styles['contact__details']}>
              <h3>What to expect</h3>
              <ul>
                <li>
                  <strong>Initial conversation</strong> — We discuss your current technology landscape, pain points, and
                  goals.
                </li>
                <li>
                  <strong>Scope & proposal</strong> — I outline a clear engagement model, timeline, and expected
                  outcomes.
                </li>
                <li>
                  <strong>Kick-off</strong> — We begin with an Audit to identify quick wins and long-term opportunities.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
