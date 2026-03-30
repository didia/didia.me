import styles from './Framework.module.scss';

const steps = [
  {
    number: '01',
    title: 'Audit',
    description:
      'Identify cost and AI opportunities across the technology landscape: cloud spend, tool sprawl, team structure, and AI readiness.',
  },
  {
    number: '02',
    title: 'Align',
    description:
      'Connect every technology decision to a financial goal. Translate architecture choices into business outcomes the CFO and CEO can act on.',
  },
  {
    number: '03',
    title: 'Execute',
    description:
      'Deliver measurable ROI through prioritised initiatives, simplified architecture, and governance that keeps teams focused on business value.',
  },
];

const Framework = () => (
  <section className={styles['framework']} id="framework">
    <div className={styles['framework__inner']}>
      <p className={styles['framework__label']}>How I Work</p>
      <h2 className={styles['framework__title']}>The ROI-Driven Technology Framework</h2>
      <p className={styles['framework__subtitle']}>
        A repeatable three-step approach that anchors every engagement.
      </p>
      <div className={styles['framework__steps']}>
        {steps.map((step) => (
          <div className={styles['framework__step']} key={step.number}>
            <span className={styles['framework__step-number']}>{step.number}</span>
            <h3 className={styles['framework__step-title']}>{step.title}</h3>
            <p className={styles['framework__step-description']}>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Framework;
