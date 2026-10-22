import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { profile } from '@/content/site';
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

// No production domain is hard-coded: set NEXT_PUBLIC_SITE_URL, or let Vercel provide its project URL.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

const title = `${profile.name} — ${profile.role}`;
const description = `${profile.name} is a developer who builds responsive websites and thoughtful digital experiences.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    type: 'website',
    title,
    description,
    siteName: profile.name,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${profile.name}, ${profile.role}` }],
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
