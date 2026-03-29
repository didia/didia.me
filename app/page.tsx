import siteConfig from '@/lib/config';
import { getPosts, paginate } from '@/lib/content';
import Sidebar from '@/src/components/Sidebar/Sidebar';
import Page from '@/src/components/Page/Page';
import Feed from '@/src/components/Feed/Feed';
import Pagination from '@/src/components/Pagination/Pagination';
import styles from '@/src/components/Layout/Layout.module.scss';

export default async function HomePage() {
  const posts = await getPosts();
  const { items, hasNextPage, hasPrevPage } = paginate(posts, 0, siteConfig.postsPerPage);

  return (
    <div className={styles['layout']}>
      <Sidebar isIndex />
      <Page>
        <Feed posts={items} />
        <Pagination
          prevPagePath="/"
          nextPagePath="/page/1/"
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </div>
  );
}
