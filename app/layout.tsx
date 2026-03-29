import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import siteConfig from '@/lib/config';
import '@/src/assets/scss/init.scss';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.subtitle,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.subtitle,
    url: siteConfig.url,
    siteName: siteConfig.title,
    images: [
      {
        url: siteConfig.image,
        width: Number(siteConfig.imageWidth),
        height: Number(siteConfig.imageHeight),
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@didia_aristote',
  },
  icons: {
    icon: '/photo.jpg',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <GoogleAnalytics gaId={siteConfig.googleAnalyticsId} />
      </body>
    </html>
  );
}
