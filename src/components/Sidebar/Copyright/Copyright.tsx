import styles from './Copyright.module.scss';

interface CopyrightProps {
  copyright: string;
}

const Copyright = ({ copyright }: CopyrightProps) => (
  <div className={styles['copyright']}>{copyright}</div>
);

export default Copyright;
