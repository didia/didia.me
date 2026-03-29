import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import clsx from 'clsx';
import { ContentItem, BookFrontmatter } from '@/lib/content';
import styles from './BookFeed.module.scss';

interface BookProps {
  book: ContentItem<BookFrontmatter>;
}

const ReadingTime = ({ book }: BookProps) => {
  const { readingStart, readingEnd } = book.frontmatter;

  if (readingEnd) {
    return (
      <time className={styles['feed__item-meta-time']} dateTime={format(new Date(readingStart), 'MMMM d, yyyy')}>
        {`Lu du ${format(new Date(readingStart), 'd MMMM yyyy', { locale: fr })} au ${format(new Date(readingEnd), 'd MMMM yyyy', { locale: fr })}`}
      </time>
    );
  }

  return (
    <time className={styles['feed__item-meta-time']} dateTime={format(new Date(readingStart), 'MMMM d, yyyy')}>
      {`En lecture depuis le ${format(new Date(readingStart), 'd MMMM yyyy', { locale: fr })}`}
    </time>
  );
};

const BookActionButtons = ({ book }: BookProps) => {
  if (!book.html && !book.frontmatter.amazonLink) return null;

  return (
    <div className={styles['feed__item-actions']}>
      {book.html && (
        <Link className={styles['feed__item-actions-button']} href={book.slug}>
          Lire mon résumé
        </Link>
      )}
      {book.frontmatter.amazonLink && (
        <a
          className={styles['feed__item-actions-button']}
          href={book.frontmatter.amazonLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Acheter
        </a>
      )}
    </div>
  );
};

const CurrentBook = ({ book }: BookProps) => (
  <div className={clsx(styles['feed__item'], styles['feed__item--featured'])}>
    <div className={styles['feed__item-body']}>
      <h2 className={styles['feed__item-title']}>{book.frontmatter.title}</h2>
      <p className={clsx(styles['feed__item-subtitle'], styles['feed__item-subtitle--author'])}>
        Par {book.frontmatter.author}
      </p>
    </div>
    <div className={styles['feed__item-content']}>
      {book.frontmatter.thumbnail && (
        <div className={styles['feed__item-media']}>
          <img src={book.frontmatter.thumbnail} alt={book.frontmatter.title} />
        </div>
      )}
      <div className={styles['feed__item-body']}>
        <p className={styles['feed__item-description']}>{book.frontmatter.description}</p>
        <p className={styles['feed__item-subtitle']}>
          <ReadingTime book={book} />
        </p>
      </div>
    </div>
    <BookActionButtons book={book} />
  </div>
);

const Book = ({ book }: BookProps) => (
  <div className={styles['feed__item']}>
    <div className={clsx(styles['feed__item-content'], styles['feed__item-content--horizontal'])}>
      {book.frontmatter.thumbnail && (
        <div className={clsx(styles['feed__item-media'], styles['feed__item-media--square'])}>
          <img src={book.frontmatter.thumbnail} alt={book.frontmatter.title} />
        </div>
      )}
      <div className={clsx(styles['feed__item-body'], styles['feed__item-body--horizontal'])}>
        <h2 className={clsx(styles['feed__item-title'], styles['feed__item-title--horizontal'])}>
          {book.frontmatter.title}
        </h2>
        <p className={clsx(styles['feed__item-subtitle'], styles['feed__item-subtitle--author'])}>
          Par {book.frontmatter.author}
        </p>
        <p className={clsx(styles['feed__item-description'], styles['feed__item-description--horizontal'])}>
          {book.frontmatter.description}
        </p>
        <p className={styles['feed__item-subtitle']}>
          <ReadingTime book={book} />
        </p>
      </div>
    </div>
    <BookActionButtons book={book} />
  </div>
);

interface BookFeedProps {
  books: ContentItem<BookFrontmatter>[];
}

const BookFeed = ({ books }: BookFeedProps) => (
  <>
    {books.length > 0 && <CurrentBook book={books[0]} />}
    <div className={styles['feed']}>
      {books.slice(1).map((book) => (
        <Book book={book} key={book.slug} />
      ))}
    </div>
  </>
);

export default BookFeed;
