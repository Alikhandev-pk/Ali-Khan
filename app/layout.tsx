import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { agency, profile, seo } from '@/content/site';
import { siteUrl } from '@/lib/site-url';
import './globals.css';

const anton = localFont({
  src: './fonts/anton-latin.woff2',
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
});

const dmSans = localFont({
  src: './fonts/dm-sans-latin.woff2',
  weight: '400 700',
  variable: '--font-dm-sans',
  display: 'swap',
});

/**
 * Site-wide defaults. The homepage sets its own title, canonical URL and social-share
 * metadata in app/page.tsx; `title.absolute` there keeps the template below from
 * appending the name a second time.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: `%s | ${profile.name}` },
  description: seo.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: agency.name,
  category: 'technology',
  openGraph: {
    type: 'website',
    siteName: profile.name,
    locale: 'en_US',
    images: [seo.shareImage],
  },
  twitter: {
    card: 'summary_large_image',
    images: [seo.shareImage.url],
  },
};

export const viewport: Viewport = {
  themeColor: '#4F72C8',
};

/**
 * Hides only the hero for a moment so GSAP can play its entrance without a flash.
 * Skipped for reduced motion, and removed after 3s regardless, so content is
 * never stuck hidden if JavaScript or GSAP fails to start.
 */
const motionGuard = `(function(d){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.documentElement.classList.add('motion-pending');setTimeout(function(){d.documentElement.classList.remove('motion-pending')},3000)}catch(e){}})(document)`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGuard }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
