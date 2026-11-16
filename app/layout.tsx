import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { agency, profile } from '@/content/site';
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

const title = `${profile.name} — Web Developer in Peshawar | Founder of ${agency.name}`;
const description = `${profile.name} is a web developer in Peshawar, Pakistan and founder of ${agency.name}. Fast, mobile-first websites, online stores, web apps and POS software for clinics, schools, shops and local businesses.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: agency.name,
  category: 'technology',
  keywords: [
    'Ali Khan',
    'Ali Khan web developer',
    'Ali Khan Brandox Digital',
    'web developer in Peshawar',
    'website developer Peshawar',
    'web design Peshawar',
    'freelance web developer Pakistan',
    'ecommerce website Pakistan',
    'POS software Pakistan',
    'Brandox Digital',
  ],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'profile',
    url: '/',
    title,
    description,
    siteName: profile.name,
    locale: 'en_US',
    firstName: 'Ali',
    lastName: 'Khan',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${profile.name}, web developer in Peshawar` }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
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
