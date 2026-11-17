import type { Metadata } from 'next';
import Motion from '@/components/Motion';
import SiteHeader from '@/components/SiteHeader';
import StructuredData from '@/components/StructuredData';
import { About, Agency, Contact, Footer, Hero, Marquee, Process, Projects, Services, Testimonials } from '@/components/Sections';
import { profile, seo } from '@/content/site';
import { isContactConfigured } from '@/lib/contact';

/** Homepage SEO. `absolute` skips the layout's title template so the name isn't repeated. */
export const metadata: Metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'profile',
    url: '/',
    title: seo.title,
    description: seo.description,
    siteName: profile.name,
    locale: 'en_US',
    firstName: 'Ali',
    lastName: 'Khan',
    images: [seo.shareImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: [seo.shareImage.url],
  },
};

export default function Home() {
  return (
    <Motion>
      <StructuredData />
      <div className="progress" aria-hidden="true">
        <span data-anim="progress" />
      </div>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Marquee />
        <Projects />
        <Agency />
        <Services />
        <About />
        <Process />
        <Testimonials />
        <Contact formEnabled={isContactConfigured()} />
      </main>
      <Footer />
    </Motion>
  );
}
