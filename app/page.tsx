import Motion from '@/components/Motion';
import SiteHeader from '@/components/SiteHeader';
import { About, Contact, Footer, Hero, Process, Projects, Services, Testimonials, Workspace } from '@/components/Sections';
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
        <Services />
        <Projects />
        <About />
        <Process />
        <Testimonials />
        <Workspace />
        <Contact formEnabled={isContactConfigured()} />
      </main>
      <Footer />
    </Motion>
  );
}
