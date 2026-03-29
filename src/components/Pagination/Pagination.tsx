import Link from 'next/link';
import clsx from 'clsx';
import { PAGINATION } from '../../constants';
import styles from './Pagination.module.scss';

interface PaginationProps {
  prevPagePath: string;
  nextPagePath: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Pagination = ({ prevPagePath, nextPagePath, hasNextPage, hasPrevPage }: PaginationProps) => (
  <div className={styles['pagination']}>
    <div className={styles['pagination__prev']}>
      <Link
        rel="prev"
        href={hasPrevPage ? prevPagePath : '#'}
        className={clsx(styles['pagination__prev-link'], {
          [styles['pagination__prev-link--disable']]: !hasPrevPage,
        })}
      >
        {PAGINATION.PREV_PAGE}
      </Link>
    </div>
    <div className={styles['pagination__next']}>
      <Link
        rel="next"
        href={hasNextPage ? nextPagePath : '#'}
        className={clsx(styles['pagination__next-link'], {
          [styles['pagination__next-link--disable']]: !hasNextPage,
        })}
      >
        {PAGINATION.NEXT_PAGE}
      </Link>
    </div>
  </div>
);

export default Pagination;
