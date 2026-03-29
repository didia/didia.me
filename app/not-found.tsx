import siteConfig from '@/lib/config';
import Sidebar from '@/src/components/Sidebar/Sidebar';
import Page from '@/src/components/Page/Page';
import styles from '@/src/components/Layout/Layout.module.scss';

export const metadata = {
  title: `Not Found | Rien trouvé - ${siteConfig.title}`,
};

export default function NotFound() {
  return (
    <div className={styles['layout']}>
      <Sidebar />
      <Page title="NOT FOUND | Rien trouvé">
        <p>You just hit a route that doesn&apos;t exist... the sadness.</p>
        <p>Malheureusement, rien n&apos;existe à cet endroit</p>
      </Page>
    </div>
  );
}
