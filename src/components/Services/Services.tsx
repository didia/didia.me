import styles from './Services.module.scss';

const services = [
  {
    title: 'Technology Cost Audit',
    description:
      'A structured review of cloud costs, vendor contracts, and tool sprawl to identify quick wins and long-term savings.',
    icon: '📊',
  },
  {
    title: 'AI ROI Assessment',
    description:
      'Evaluate current and potential AI initiatives against measurable business outcomes. Prioritise what to build, buy, or drop.',
    icon: '🤖',
  },
  {
    title: 'Fractional CTO Engagement',
    description:
      'Embedded executive leadership on a fractional basis — strategic direction, architecture governance, and hands-on guidance without a full-time hire.',
    icon: '🎯',
  },
  {
    title: 'Technology Strategy & Roadmap',
    description:
      'Translate business priorities into a clear technology roadmap that leadership teams can rally behind and track financially.',
    icon: '🗺️',
  },
  {
    title: 'Architecture Simplification',
    description:
      'Reduce over-engineering, retire unused services, and rebuild a leaner, more maintainable architecture that supports growth.',
    icon: '⚙️',
  },
];

const Services = () => (
  <section className={styles['services']} id="services">
    <div className={styles['services__inner']}>
      <p className={styles['services__label']}>Services</p>
      <h2 className={styles['services__title']}>How I Can Help</h2>
      <p className={styles['services__subtitle']}>
        Five core offerings, each aligned to reducing costs and delivering measurable business value.
      </p>
      <div className={styles['services__grid']}>
        {services.map((service) => (
          <div className={styles['services__card']} key={service.title}>
            <span className={styles['services__card-icon']}>{service.icon}</span>
            <h3 className={styles['services__card-title']}>{service.title}</h3>
            <p className={styles['services__card-description']}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
