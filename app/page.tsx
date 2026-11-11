import Motion from '@/components/Motion';
import SiteHeader from '@/components/SiteHeader';
import { About, Agency, Contact, Footer, Hero, Process, Projects, Services, Testimonials } from '@/components/Sections';
import { isContactConfigured } from '@/lib/contact';

export default function Home() {
  return (
    <Motion>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
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
