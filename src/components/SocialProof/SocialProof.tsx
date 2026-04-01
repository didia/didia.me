import styles from './SocialProof.module.scss';

const results = [
  {
    metric: '10+',
    label: 'Years in Technology Leadership',
  },
  {
    metric: '40%',
    label: 'Average Cloud Cost Reduction',
  },
  {
    metric: '15+',
    label: 'Companies Advised',
  },
];

const testimonial = {
  quote:
    'Aristote brought clarity to our technology strategy in weeks, not months. He identified over six figures in annual savings we were leaving on the table and helped us prioritise our AI initiatives around actual business outcomes.',
  author: 'CEO, Growth-Stage SaaS Company',
};

const SocialProof = () => (
  <section className={styles['proof']}>
    <div className={styles['proof__inner']}>
      <div className={styles['proof__metrics']}>
        {results.map((result) => (
          <div className={styles['proof__metric']} key={result.label}>
            <span className={styles['proof__metric-value']}>{result.metric}</span>
            <span className={styles['proof__metric-label']}>{result.label}</span>
          </div>
        ))}
      </div>
      <blockquote className={styles['proof__testimonial']}>
        <p className={styles['proof__testimonial-quote']}>&ldquo;{testimonial.quote}&rdquo;</p>
        <cite className={styles['proof__testimonial-author']}>&mdash; {testimonial.author}</cite>
      </blockquote>
    </div>
  </section>
);

export default SocialProof;
