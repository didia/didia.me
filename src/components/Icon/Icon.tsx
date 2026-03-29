import styles from './Icon.module.scss';

interface IconProps {
  icon: { viewBox: string; path: string };
}

const Icon = ({ icon }: IconProps) => (
  <svg className={styles['icon']} viewBox={icon.viewBox}>
    <path d={icon.path} />
  </svg>
);

export default Icon;
