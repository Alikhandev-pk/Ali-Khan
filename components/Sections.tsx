import Image from 'next/image';
import {
  contact,
  experience,
  navLinks,
  process,
  profile,
  projects,
  services,
  skills,
  socials,
  testimonials,
  workspace,
  type Img,
} from '@/content/site';
import ContactForm from './ContactForm';
import { ArrowIcon, socialIcons } from './Icons';

const activeSocials = socials.filter((s) => /^https?:\/\//.test(s.url));

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
            <a className="btn btn--ghost" href="#contact">
              Let’s Talk <ArrowIcon />
            </a>
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
          {activeSocials.length > 0 && (
            <>
              <p className="eyebrow">Find me online</p>
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
            </>
          )}
          <p className="small">Clean code, responsive layouts and interfaces that work for everyone.</p>
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

/* -------------------------------- Services -------------------------------- */
export function Services() {
  return (
    <section className="section wrap" id="services" aria-labelledby="services-title">
      <SectionHead
        id="services-title"
        title="My Services"
        note="Websites that look sharp, load fast and work well on every screen — from the first layout to the final launch."
      />
      <div className="services" data-anim="cards">
        {services.map((s, i) => (
          <article className="service" key={s.title} data-anim-item>
            <div className={`media ${i === 1 ? 'media--tall' : 'media--land'}`}>
              <Photo image={s.image} sizes="(min-width: 1440px) 440px, (min-width: 681px) 31vw, 92vw" />
              <span className="service__num" aria-hidden="true">
                0{i + 1}
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
    </section>
  );
}

/* -------------------------------- Projects -------------------------------- */
export function Projects() {
  const hasSamples = projects.some((p) => p.sample);
  return (
    <section className="section panel works" id="work" aria-labelledby="work-title">
      <SectionHead
        id="work-title"
        title="Selected Projects"
        label={hasSamples ? 'Sample projects' : undefined}
        note={
          hasSamples
            ? 'Examples of the kinds of websites I build. They will be replaced with real case studies.'
            : 'A selection of recent work.'
        }
      />
      <div className="works__grid">
        {projects.map((p, i) => (
          <article className={`work work--${(i % 5) + 1}`} key={p.title} data-anim="project">
            <div className={`media ${i === 1 ? 'media--tall' : 'media--land'}`} data-anim="media">
              <Photo image={p.image} sizes="(min-width: 1024px) 40vw, (min-width: 681px) 46vw, 92vw" parallax />
              {p.sample && <span className="badge">Sample</span>}
            </div>
            <div data-anim="project-text">
              <h3 className="h3">{p.title}</h3>
              <p className="small">{p.description}</p>
              <ul className="tags" aria-label="Technologies">
                {p.tags.map((t) => (
                  <li className="tag" key={t}>
                    {t}
                  </li>
                ))}
              </ul>
              {p.url ? (
                <a className="work__link" href={p.url} target="_blank" rel="noopener noreferrer">
                  View project <span className="sr-only">{p.title} (opens in a new tab)</span>
                  <ArrowIcon />
                </a>
              ) : (
                <span className="work__link is-pending">Link coming soon</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------- About --------------------------------- */
const values = [
  { word: 'Clean', note: 'Readable, maintainable code' },
  { word: 'Responsive', note: 'Layouts for every screen' },
  { word: 'Easy to Use', note: 'Clear and accessible' },
  { word: 'Fast', note: 'Performance in the details' },
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
          {skills.length > 0 && (
            <>
              <h3 className="eyebrow about__label">Skills &amp; tools</h3>
              <ul className="tags tags--dark">
                {skills.map((s) => (
                  <li className="tag" key={s}>
                    {s}
                  </li>
                ))}
              </ul>
            </>
          )}
          {experience.length > 0 && (
            <>
              <h3 className="eyebrow about__label">Experience</h3>
              <ul className="experience">
                {experience.map((e) => (
                  <li key={`${e.role}-${e.organisation}`}>
                    <strong>{e.role}</strong> · {e.organisation} <span className="small">{e.period}</span>
                    {e.summary && <p className="small">{e.summary}</p>}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <ul className="values" data-anim="cards" aria-label="What I care about">
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
    <section className="section wrap" aria-labelledby="process-title">
      <SectionHead
        id="process-title"
        title="My Work Process"
        note="Four steps that keep every project clear, on track and focused on the people who will use it."
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

/* -------------------------------- Workspace ------------------------------- */
export function Workspace() {
  return (
    <section className="section panel" aria-labelledby="workspace-title">
      <SectionHead
        id="workspace-title"
        title="My Workspace"
        label="Illustrative"
        note="Mood images of the kind of space I like to work in — not photos of my own setup."
      />
      <div className="gallery" data-anim="cards">
        {workspace.map((w, i) => (
          <figure className={`shot shot--${(i % 5) + 1}`} key={w.title} data-anim-item>
            <div className={`media ${i === 1 ? 'media--square' : 'media--land'}`}>
              <Photo image={w.image} sizes="(min-width: 1024px) 30vw, (min-width: 681px) 46vw, 92vw" />
            </div>
            <figcaption>
              <strong className="h3">{w.title}</strong>
              <span className="small">{w.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Contact -------------------------------- */
export function Contact({ formEnabled }: { formEnabled: boolean }) {
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
          href={contact.email ? `mailto:${contact.email}` : '#contact-form'}
          data-anim="contact-button"
        >
          Hire Me <ArrowIcon />
        </a>
        <p className="small" data-anim="contact-fade">
          Whether you need a new website, a cleaner frontend or a faster existing site, I’m happy to help. Tell me a
          little about your idea.
        </p>
      </div>
      <ContactForm enabled={formEnabled} email={contact.email} />
    </section>
  );
}

/* --------------------------------- Footer --------------------------------- */
export function Footer() {
  return (
    <footer className="footer panel">
      <div className="footer__grid">
        <div>
          {contact.email ? (
            <>
              <p className="eyebrow">Email me for any queries</p>
              <p className="footer__big">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
            </>
          ) : (
            <>
              <p className="eyebrow">Have a project in mind?</p>
              <p className="footer__big">
                <a href="#contact">Let’s talk</a>
              </p>
            </>
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
            </ul>
          </div>
        )}
        {contact.location && (
          <div>
            <h2 className="eyebrow">Based in</h2>
            <p className="footer__list">{contact.location}</p>
          </div>
        )}
      </div>
      <div className="footer__bottom">
        <a className="logo logo--xl" href="#home" aria-label={`${profile.name}, back to top`}>
          {profile.name.toUpperCase()}
          <span className="dot">.</span>
        </a>
        <p className="small">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
