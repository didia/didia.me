import styles from './Content.module.scss';

interface ContentProps {
  body: string;
  title: string;
}

const Content = ({ body, title }: ContentProps) => (
  <div className={styles['content']}>
    <h1 className={styles['content__title']}>{title}</h1>
    <div className={styles['content__body']} dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export default Content;
