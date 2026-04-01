import type { Metadata } from 'next';
import Link from 'next/link';
import siteConfig from '@/lib/config';
import Navbar from '@/src/components/Navbar/Navbar';
import Footer from '@/src/components/Footer/Footer';
import styles from './about.module.scss';

export const metadata: Metadata = {
  title: `About - ${siteConfig.title}`,
  description:
    'Fractional CTO, builder, and educator bridging Canada and Congo. Learn about my mission, ventures, and the values that drive my work.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <article className={styles['about']}>
          {/* Intro */}
          <section className={styles['about__hero']}>
            <div className={styles['about__hero-inner']}>
              <img
                src={siteConfig.author.photo}
                alt={siteConfig.author.name}
                className={styles['about__hero-photo']}
                width="160"
                height="160"
              />
              <h1 className={styles['about__hero-title']}>CTO by trade. Builder by nature. Educator at heart.</h1>
              <p className={styles['about__hero-subtitle']}>
                I split my life between two worlds — helping Canadian companies get more from their technology
                investments, and building businesses that create opportunity in the Democratic Republic of Congo.
              </p>
            </div>
          </section>

          {/* Story */}
          <section className={styles['about__section']}>
            <div className={styles['about__section-inner']}>
              <h2 className={styles['about__section-title']}>My Story</h2>
              <div className={styles['about__prose']}>
                <p>
                  I grew up in Kinshasa, in the Democratic Republic of Congo. From an early age, I understood that
                  education was the most reliable path out of poverty — not just for me, but for my community. That
                  conviction led me to Canada, where I built a career in technology that now spans over a decade of
                  engineering, leadership, and strategic advisory work.
                </p>
                <p>
                  Today, I work as a Fractional CTO helping companies reduce technology costs and turn AI initiatives
                  into measurable business outcomes. I have led technology teams, simplified architectures, and aligned
                  engineering with financial priorities for companies ranging from startups to established businesses.
                </p>
                <p>
                  But my work in Canada has always served a larger purpose: to generate the income, skills, and
                  connections needed to invest back home. Canada and the Western world are my source of opportunity.
                  Congo is where that opportunity becomes impact.
                </p>
              </div>
            </div>
          </section>

          {/* Two worlds */}
          <section className={`${styles['about__section']} ${styles['about__section--alt']}`}>
            <div className={styles['about__section-inner']}>
              <h2 className={styles['about__section-title']}>Two Worlds, One Mission</h2>
              <div className={styles['about__prose']}>
                <p>
                  My master plan is simple: while based in Canada, I seek opportunities that generate enough income to
                  care for my family and invest time and money in my businesses in Congo. Every engagement I take on as
                  a Fractional CTO fuels the ventures I am building back home.
                </p>
                <p>
                  This is not charity work — it is entrepreneurship designed to create stable employment and inspire a
                  new generation of proactive, responsible Congolese citizens. I want to channel resources from wealthy
                  environments toward underserved communities, creating real economic value on both sides.
                </p>
              </div>
            </div>
          </section>

          {/* Ventures */}
          <section className={styles['about__section']}>
            <div className={styles['about__section-inner']}>
              <h2 className={styles['about__section-title']}>Ventures & Impact</h2>
              <p className={styles['about__section-subtitle']}>
                I don&apos;t just advise — I build. Here are the projects I am actively investing in.
              </p>
              <div className={styles['about__ventures']}>
                <div className={styles['about__venture']}>
                  <h3>RDC Etudes</h3>
                  <p>
                    An education platform helping Congolese students navigate international study opportunities.
                    Co-founded and led as strategy director, RDC Etudes has guided thousands of students toward higher
                    education abroad. We are now launching the <em>Académie des Élites</em> and publishing{' '}
                    <em>Étudier comme un lauréat</em> to deepen our impact.
                  </p>
                  <a href="https://www.rdcetudes.com" target="_blank" rel="noopener noreferrer">
                    Visit rdcetudes.com &rarr;
                  </a>
                </div>
                <div className={styles['about__venture']}>
                  <h3>Trid Innovations</h3>
                  <p>
                    Building a technology bridge between Canada and francophone Africa. Through a partnership with Congo based 243 Technologies, we help Canadian and Québec companies execute projects through talented
                    francophone developers — lowering costs here, building experience there.
                  </p>
                </div>
                <div className={styles['about__venture']}>
                  <h3>Africa Heroes — Songololo Project</h3>
                  <p>
                    A community-driven commercial venture in DR Congo combining transportation, entertainment, and
                    retail to create local employment and economic activity.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className={`${styles['about__section']} ${styles['about__section--alt']}`}>
            <div className={styles['about__section-inner']}>
              <h2 className={styles['about__section-title']}>What I Stand For</h2>
              <div className={styles['about__values']}>
                <div className={styles['about__value']}>
                  <h3>Discipline over talent</h3>
                  <p>
                    Discipline gives me the freedom to live as I choose. I apply it to every area of my life — from
                    health to work to relationships.
                  </p>
                </div>
                <div className={styles['about__value']}>
                  <h3>Commitments kept</h3>
                  <p>I honour every commitment I make. If I am not sure I can keep it, I simply will not make it.</p>
                </div>
                <div className={styles['about__value']}>
                  <h3>Empathy first</h3>
                  <p>
                    I listen to understand, not to judge. I choose curiosity over defensiveness — in leadership, in
                    business, and in life.
                  </p>
                </div>
                <div className={styles['about__value']}>
                  <h3>Resilience through faith</h3>
                  <p>
                    I will not be crushed by failure. Every hard lesson prepares me for what is ahead. I extract the
                    lesson and do better next time.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className={styles['about__cta']}>
            <div className={styles['about__section-inner']}>
              <h2>Want to work together?</h2>
              <p>
                Whether you need a Fractional CTO, want to discuss technology strategy, or are curious about my ventures
                in Congo — I would love to hear from you.
              </p>
              <Link href="/contact/" className={styles['about__cta-button']}>
                Get in Touch
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
