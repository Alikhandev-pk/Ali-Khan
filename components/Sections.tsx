import Image from 'next/image';
import {
  agency,
  contact,
  experience,
  extraServices,
  navLinks,
  process,
  profile,
  projects,
  services,
  skills,
  socials,
  testimonials,
  whatsappLink,
  type Img,
  type Project,
} from '@/content/site';
import ContactForm from './ContactForm';
import { ArrowIcon, WhatsAppIcon, socialIcons } from './Icons';

const activeSocials = socials.filter((s) => /^https?:\/\//.test(s.url));
const domainOf = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '');
const pad = (n: number) => String(n).padStart(2, '0');

/** Photo that fills its frame. `parallax` adds an oversized inner layer GSAP can move on desktop. */
function Photo({ image, sizes, parallax = false }: { image: Img; sizes: string; parallax?: boolean }) {
  const img = <Image src={image.src} alt={image.alt} fill sizes={sizes} quality={82} className="media__img" />;
  return parallax ? (
    <div className="media__parallax" data-parallax>
      {img}
    </div>
  ) : (
    img
  );
}

function SectionHead({ id, title, note, label }: { id: string; title: string; note: string; label?: string }) {
  return (
    <div className="section__head">
      <h2 className="h2" id={id} data-anim="heading">
        {title}
      </h2>
      <p className="small section__note" data-anim="heading">
        {label && <strong className="tag tag--yellow">{label}</strong>} {note}
      </p>
    </div>
  );
}

function External({ href, className, children, label }: { href: string; className: string; children: React.ReactNode; label?: string }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only">
        {label ? ` ${label}` : ''} (opens in a new tab)
      </span>
    </a>
  );
}

/* ---------------------------------- Hero ---------------------------------- */
export function Hero() {
  return (
    <section className="hero panel" id="home" aria-labelledby="hero-title">
      <div className="hero__grid">
        <h1 className="hero__title" id="hero-title">
          <span className="sr-only">{profile.name}, </span>
          {profile.heroTitle.map((line) => (
            <span className="line" key={line}>
              <span className="line__inner" data-anim="hero-line">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero__intro">
          <p className="eyebrow" data-anim="hero-fade">
            {profile.greeting}
          </p>
          <p className="hero__lead" data-anim="hero-fade">
            {profile.intro}
          </p>
          <div className="hero__actions" data-anim="hero-fade">
            <a className="btn btn--yellow" href="#work">
              View My Work <ArrowIcon />
            </a>
            <External className="btn btn--ghost" href={whatsappLink(`Hi Ali, I'd like to talk about a project.`)}>
              <WhatsAppIcon /> WhatsApp Me
            </External>
          </div>
        </div>

        <div className="hero__portrait" data-anim="hero-portrait">
          <div className="hero__frame">
            <Image
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              fill
              preload
              quality={85}
              sizes="(min-width: 1024px) 36vw, (min-width: 681px) 520px, 92vw"
            />
          </div>
        </div>

        <div className="hero__social" data-anim="hero-fade">
          <a className="hero__agency" href="#brandox">
            <span className="hero__agency-logo">
              <Image src={agency.logo.src} alt="" width={28} height={25} unoptimized />
            </span>
            <span>
              <strong>{agency.name}</strong>
              <span className="small">Founder &amp; CEO</span>
            </span>
          </a>
          {activeSocials.length > 0 && (
            <ul className="socials">
              {activeSocials.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <li key={s.label}>
                    <a className="social" href={s.url} target="_blank" rel="noopener noreferrer">
                      <Icon />
                      <span className="sr-only">{s.label} (opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
          <p className="small">{profile.heroNote}</p>
        </div>

        <p className="hero__statement" aria-label={profile.heroStatement.join(' ')}>
          {profile.heroStatement.map((line) => (
            <span className="line" key={line} aria-hidden="true">
              <span className="line__inner" data-anim="hero-line">
                {line}
              </span>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------- Work ---------------------------------- */
function CaseStudy({ project: p, index }: { project: Project; index: number }) {
  return (
    <article className="case" data-anim="project">
      <div className="case__media" data-anim="media">
        <div className="browser">
          <div className="browser__bar" aria-hidden="true">
            <span className="browser__dots">
              <i />
              <i />
              <i />
            </span>
            <span className="browser__url">{domainOf(p.url)}</span>
          </div>
          <div className={`browser__view${p.image.scroll ? ' is-scroll' : ''}`}>
            <Image
              src={p.image.src}
              alt={p.image.alt}
              fill
              quality={82}
              sizes="(min-width: 1360px) 760px, (min-width: 1024px) 56vw, 92vw"
              className="browser__img"
            />
          </div>
        </div>
        {p.image.scroll && (
          <span className="case__hint" aria-hidden="true">
            Hover to scroll
          </span>
        )}
      </div>

      <div className="case__text" data-anim="project-text">
        <span className="case__num" aria-hidden="true">
          {pad(index + 1)}
        </span>
        <p className="eyebrow case__cat">{p.category}</p>
        <h3 className="case__title">{p.title}</h3>
        <p className="case__desc">{p.description}</p>
        <ul className="case__list">
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <ul className="tags case__tags" aria-label="Services delivered">
          {p.tags.map((t) => (
            <li className="tag" key={t}>
              {t}
            </li>
          ))}
        </ul>
        <div className="case__links">
          <External className="btn btn--black btn--sm" href={p.url} label={`— ${p.title}`}>
            Visit live site <ArrowIcon />
          </External>
          {p.caseStudy && (
            <External className="work__link" href={p.caseStudy} label={`— ${p.title}`}>
              Read case study <ArrowIcon />
            </External>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section className="section wrap works" id="work" aria-labelledby="work-title">
      <SectionHead
        id="work-title"
        title="Selected Work"
        note={`Real projects for real businesses, designed and built through my agency, ${agency.name}.`}
      />
      <div className="cases">
        {projects.map((p, i) => (
          <CaseStudy project={p} index={i} key={p.title} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Agency --------------------------------- */
export function Agency() {
  const { product } = agency;
  return (
    <section className="section panel agency" id="brandox" aria-labelledby="brandox-title">
      <div className="agency__grid">
        <div className="agency__main" data-anim="heading">
          <p className="agency__brand">
            <span className="agency__logo">
              <Image src={agency.logo.src} alt="" width={40} height={36} unoptimized />
            </span>
            <span className="eyebrow">My agency · Founder &amp; CEO</span>
          </p>
          <h2 className="h2" id="brandox-title">
            {agency.name}
          </h2>
          <p className="agency__tagline">“{agency.tagline}”</p>
          <p className="agency__desc">{agency.description}</p>

          <h3 className="eyebrow agency__label">Who we work with</h3>
          <ul className="tags">
            {agency.industries.map((i) => (
              <li className="tag" key={i}>
                {i}
              </li>
            ))}
          </ul>

          <div className="agency__actions">
            <External className="btn btn--yellow" href={agency.url}>
              Visit {domainOf(agency.url)} <ArrowIcon />
            </External>
            <External className="btn btn--ghost" href={whatsappLink(`Hi, I found Brandox Digital through Ali's portfolio.`)}>
              <WhatsAppIcon /> Chat on WhatsApp
            </External>
          </div>
        </div>

        <aside className="pos" aria-labelledby="pos-title" data-anim="heading">
          <span className="pos__status">{product.status}</span>
          <h3 className="pos__title" id="pos-title">
            {product.name}
          </h3>
          <p className="small pos__desc">{product.description}</p>
          <ul className="pos__features">
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <External
            className="btn btn--black btn--sm"
            href={whatsappLink(`Hi, I'd like to join the ${product.name} free-trial waitlist.`)}
          >
            Join the free-trial waitlist <ArrowIcon />
          </External>
        </aside>
      </div>
    </section>
  );
}

/* -------------------------------- Services -------------------------------- */
export function Services() {
  return (
    <section className="section wrap" id="services" aria-labelledby="services-title">
      <SectionHead
        id="services-title"
        title="What I Build"
        note="From a first website to custom software — everything a local business needs to be found online and win more customers."
      />
      <div className="services" data-anim="cards">
        {services.map((s, i) => (
          <article className="service" key={s.title} data-anim-item>
            <div className={`media ${i === 1 ? 'media--tall' : 'media--land'}`}>
              <Photo image={s.image} sizes="(min-width: 1440px) 440px, (min-width: 681px) 31vw, 92vw" />
              <span className="service__num" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <a className="media__cta" href="#contact">
                Ask about this <span className="sr-only">: {s.title}</span>
                <ArrowIcon />
              </a>
            </div>
            <h3 className="h3">{s.title}</h3>
            <p className="small">{s.description}</p>
            <ul className="service__list">
              {s.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      {extraServices.length > 0 && (
        <div className="extras" data-anim="heading">
          <h3 className="eyebrow">Also available</h3>
          <ul className="tags tags--dark">
            {extraServices.map((s) => (
              <li className="tag" key={s}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

/* ---------------------------------- About --------------------------------- */
const values = [
  { word: 'Mobile', note: 'Built for how customers browse' },
  { word: 'Fast', note: 'Pages that load in a blink' },
  { word: 'Clear', note: 'Fixed prices, mockups first' },
  { word: 'Supported', note: 'Help on WhatsApp after launch' },
];

export function About() {
  return (
    <section className="section wrap" id="about" aria-labelledby="about-title">
      <div className="about">
        <h2 className="h2 about__title" id="about-title" data-anim="heading">
          About Me
        </h2>
        <div className="about__body" data-anim="heading">
          <p className="about__lead">{profile.about}</p>
          {experience.length > 0 && (
            <>
              <h3 className="eyebrow about__label">Experience</h3>
              <ul className="experience">
                {experience.map((e) => (
                  <li key={`${e.role}-${e.organisation}`}>
                    <strong>{e.role}</strong> ·{' '}
                    {e.url ? (
                      <External className="experience__org" href={e.url}>
                        {e.organisation}
                      </External>
                    ) : (
                      e.organisation
                    )}{' '}
                    <span className="small experience__period">{e.period}</span>
                    {e.summary && <p className="small">{e.summary}</p>}
                  </li>
                ))}
              </ul>
            </>
          )}
          {skills.length > 0 && (
            <>
              <h3 className="eyebrow about__label">Skills &amp; focus</h3>
              <ul className="tags tags--dark">
                {skills.map((s) => (
                  <li className="tag" key={s}>
                    {s}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <ul className="values" data-anim="cards" aria-label="How I work">
        {values.map((v) => (
          <li key={v.word} data-anim-item>
            <span className="values__word">{v.word}</span>
            <span className="small">{v.note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* --------------------------------- Process -------------------------------- */
export function Process() {
  return (
    <section className="section panel process-panel" aria-labelledby="process-title">
      <SectionHead
        id="process-title"
        title="How We Work"
        note="Four simple steps — you always know the price, see the design first, and get support after launch."
      />
      <ol className="process" data-anim="cards">
        {process.map((step, i) => (
          <li className="step" key={step.title} data-anim-item>
            <div className="media media--land">
              <Photo image={step.image} sizes="(min-width: 1024px) 23vw, (min-width: 681px) 46vw, 92vw" />
            </div>
            <h3 className="h3">
              {i + 1}. {step.title}
            </h3>
            <p className="small">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------ Testimonials ------------------------------ */
/** Renders nothing until real testimonials are added in content/site.ts. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="section wrap" aria-labelledby="testimonials-title">
      <SectionHead id="testimonials-title" title="Testimonials" note="Kind words from people I’ve worked with." />
      <ul className="quotes" data-anim="cards">
        {testimonials.map((t) => (
          <li className="quote" key={t.name} data-anim-item>
            <p>“{t.quote}”</p>
            <div className="quote__who">
              <span className="avatar" aria-hidden="true">
                {t.name.charAt(0)}
              </span>
              <span>
                <strong>{t.name}</strong>
                <span className="small">{t.role}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* --------------------------------- Contact -------------------------------- */
export function Contact({ formEnabled }: { formEnabled: boolean }) {
  const channels = [
    { label: 'WhatsApp', value: contact.whatsappLabel, href: whatsappLink(), external: true },
    { label: 'Call', value: contact.phoneLabel, href: `tel:${contact.phone}`, external: false },
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, external: false },
  ].filter((c) => c.value);

  return (
    <section className="section wrap contact" id="contact" aria-labelledby="contact-title">
      <h2 className="contact__title" id="contact-title">
        <span className="line">
          <span className="line__inner" data-anim="contact-line">
            Have a Project?
          </span>
        </span>{' '}
        <span className="line line--right">
          <span className="line__inner" data-anim="contact-line">
            Let’s Talk
          </span>
        </span>
      </h2>
      <div className="contact__middle">
        <a
          className="round round--xl"
          href={whatsappLink(`Hi Ali, I'd like to talk about a project.`)}
          target="_blank"
          rel="noopener noreferrer"
          data-anim="contact-button"
        >
          Hire Me <ArrowIcon />
          <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
        </a>
        <p className="small" data-anim="contact-fade">
          Need a new website, an online store or custom software for your business? Tell me a little about your idea —
          the consultation is free and you get a fixed price.
        </p>
      </div>
      <div className="contact__body">
        <ul className="channels" aria-label="Contact details">
          {channels.map((c) => (
            <li key={c.label}>
              <span className="eyebrow">{c.label}</span>
              {c.external ? (
                <External className="channels__value" href={c.href} label={`— ${c.label}`}>
                  {c.value}
                </External>
              ) : (
                <a className="channels__value" href={c.href}>
                  {c.value}
                </a>
              )}
            </li>
          ))}
          {contact.location && (
            <li>
              <span className="eyebrow">Based in</span>
              <span className="channels__value channels__value--plain">{contact.location}</span>
              {contact.hours && <span className="small">{contact.hours}</span>}
            </li>
          )}
        </ul>
        <ContactForm enabled={formEnabled} whatsapp={contact.whatsapp} />
      </div>
    </section>
  );
}

/* --------------------------------- Footer --------------------------------- */
export function Footer() {
  return (
    <footer className="footer panel">
      <div className="footer__grid">
        <div>
          <p className="eyebrow">Start a project</p>
          <p className="footer__big">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              {contact.whatsappLabel}
              <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
            </a>
          </p>
          {contact.email && (
            <p className="footer__mail">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          )}
        </div>
        <nav aria-label="Footer">
          <h2 className="eyebrow">Quick links</h2>
          <ul className="footer__list">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        {activeSocials.length > 0 && (
          <div>
            <h2 className="eyebrow">Follow</h2>
            <ul className="footer__list">
              {activeSocials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={agency.url} target="_blank" rel="noopener noreferrer">
                  {domainOf(agency.url)}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        )}
        {contact.location && (
          <div>
            <h2 className="eyebrow">Based in</h2>
            <p className="footer__list">
              {contact.location}
              {contact.hours && <span className="small">{contact.hours}</span>}
            </p>
          </div>
        )}
      </div>
      <div className="footer__bottom">
        <a className="logo logo--xl" href="#home" aria-label={`${profile.name}, back to top`}>
          {profile.name.toUpperCase()}
          <span className="dot">.</span>
        </a>
        <p className="small">
          © {new Date().getFullYear()} {profile.name} · Founder of{' '}
          <a href={agency.url} target="_blank" rel="noopener noreferrer">
            {agency.name}
          </a>
        </p>
      </div>
    </footer>
  );
}
