import { format } from 'date-fns';
import styles from './Meta.module.scss';

interface MetaProps {
  date: string;
}

const Meta = ({ date }: MetaProps) => (
  <div className={styles['meta']}>
    <p className={styles['meta__date']}>Published {format(new Date(date), 'd MMM yyyy')}</p>
  </div>
);

export default Meta;
