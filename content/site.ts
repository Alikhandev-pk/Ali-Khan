/**
 * All of the site's text, images and links live in this one file.
 * Edit the values below and the page updates everywhere.
 *
 * Images live in /public/images. Give every image accurate `width`/`height`
 * (its real pixel size) and descriptive `alt` text.
 */

export type Img = { src: string; alt: string; width: number; height: number };

export type Project = {
  title: string;
  /** Short line under the title, e.g. the kind of business. */
  category: string;
  description: string;
  /** What was built — 3 short points. */
  highlights: string[];
  /**
   * Screenshot. A tall full-page capture (`scroll: true`) slowly scrolls on hover;
   * a normal screenshot just shows its top.
   */
  image: Img & { scroll?: boolean };
  /** Live website. */
  url: string;
  /** Optional case study page. */
  caseStudy?: string;
};

export type Testimonial = { quote: string; name: string; role: string };

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const profile = {
  name: 'Ali Khan',
  role: 'Full-Stack Developer & Founder of Brandox Digital',
  /** Used as `jobTitle` in the structured data. */
  jobTitle: 'Full-Stack Developer',
  /**
   * Hero headline lines. `hidden` text is read by screen readers and search engines but not shown,
   * so the H1 reads “Ali Khan, Founder & Full-Stack Developer” while the design stays the same.
   */
  heroTitle: [{ text: 'Founder &' }, { hidden: 'Full-Stack ', text: 'Developer' }] as { text: string; hidden?: string }[],
  heroStatement: ['Websites', 'That Grow', 'Business'],
  greeting: 'Hi, I’m Ali Khan',
  intro: 'I build e-commerce stores, ERP systems and POS software that help businesses sell more.',
  about:
    'I’m Ali Khan, a full-stack developer in Peshawar, Pakistan, and the founder and CEO of Brandox Digital, a web and software agency. I build e-commerce websites, ERP systems and POS software, and help clinics, schools, shops, consultancies and showrooms with fast, mobile-first websites that turn visitors into calls, WhatsApp chats and walk-ins.',
  /** Public GitHub profile — linked in About, the hero/footer social links and the structured data. */
  github: 'https://github.com/Alikhandev-pk',
  /** Founder page on the Brandox Digital website. */
  founderPage: 'https://brandox.digital/founder/ali-khan',
  /** Official photo: hero arch, About Me and the Contact section. */
  portrait: {
    src: '/images/ali-khan-web-developer-peshawar.jpg',
    alt: 'Ali Khan, full-stack developer in Peshawar and founder of Brandox Digital, in a dark blazer and white shirt',
    width: 1122,
    height: 1402,
  } satisfies Img,
};

/* ------------------------------------------------------------------ */
/* SEO — homepage title, description and social-share image            */
/* ------------------------------------------------------------------ */

export const seo = {
  title: 'Ali Khan | Full-Stack Developer in Peshawar',
  description:
    'Ali Khan is a full-stack developer in Peshawar and founder of Brandox Digital. Explore his e-commerce, ERP and POS projects and find him on GitHub.',
  shareImage: { url: '/og-image.png', width: 1200, height: 630, alt: 'Ali Khan, full-stack developer in Peshawar' },
};

/* ------------------------------------------------------------------ */
/* Agency                                                              */
/* ------------------------------------------------------------------ */

export const agency = {
  name: 'Brandox Digital',
  url: 'https://brandox.digital',
  tagline: 'We build websites & software that grow your business.',
  description:
    'The agency I founded to take local businesses online — from a first website to full web apps and POS software. Fixed prices, mockups before code and real support after launch.',
  logo: { src: '/images/work/brandox-logo.svg', alt: 'Brandox Digital logo', width: 435, height: 390 } satisfies Img,
  industries: [
    'Clinics',
    'Schools & academies',
    'Restaurants',
    'Pharmacies',
    'Real estate',
    'Visa & education consultants',
    'Shops & showrooms',
  ],
  product: {
    name: 'Brandox POS',
    status: 'In development',
    description: 'Billing and stock software for shops, pharmacies and stores.',
    features: [
      'Works offline',
      'Urdu & English',
      'Bills on WhatsApp',
      'Udhaar (credit) tracking',
      'Low-stock & expiry alerts',
      'Daily profit report',
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const services: { title: string; description: string; includes: string[]; image: Img }[] = [
  {
    title: 'Business Websites',
    description: 'Fast, mobile-first sites that build trust and turn visitors into enquiries.',
    includes: ['Up to 5 pages + enquiry form', 'WhatsApp button & Google Maps', 'Basic SEO setup'],
    image: { src: '/images/photos/service-websites.webp', alt: 'Two developers working at computers in a bright office', width: 2400, height: 1600 },
  },
  {
    title: 'Online Stores & Catalogues',
    description: 'Stores and catalogues with brands, prices, checkout and WhatsApp ordering.',
    includes: ['Categories & brand filters', '“Ask on WhatsApp” on every item', 'Swipeable mobile layout'],
    image: { src: '/images/photos/service-frontend.webp', alt: 'A website design shown on a desktop monitor, a tablet and a phone', width: 2400, height: 3000 },
  },
  {
    title: 'Web Apps & Software',
    description: 'Custom software for how your business runs — portals, dashboards, ERP and POS.',
    includes: ['Booking systems & portals', 'Admin panels & dashboards', 'POS & ERP software'],
    image: { src: '/images/photos/service-optimization.webp', alt: 'Laptop showing an analytics dashboard with charts', width: 2400, height: 1589 },
  },
];

/** Smaller services shown as tags under the main three. */
export const extraServices: string[] = [
  'Google Business Profile',
  'WhatsApp Business setup',
  'Facebook & Instagram setup',
  'SEO',
  'Hosting & monthly care',
];

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  /** Empty = no email shown anywhere. */
  email: 'info.brandoxdigital.pk@gmail.com',
  /** Digits only, with country code — used for wa.me links. */
  whatsapp: '923340998222',
  whatsappLabel: '+92 334 0998222',
  phone: '+923499212544',
  phoneLabel: '+92 349 9212544',
  location: 'Peshawar, Pakistan',
  hours: 'Mon–Sat, 10 AM – 7 PM',
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export type SocialLabel = 'WhatsApp' | 'Instagram' | 'Facebook' | 'GitHub' | 'LinkedIn';

/** Only links with a URL are shown. Empty ones are hidden automatically. */
export const socials: { label: SocialLabel; url: string }[] = [
  { label: 'WhatsApp', url: whatsappLink() },
  { label: 'Instagram', url: 'https://www.instagram.com/brandoxdigital/' },
  { label: 'Facebook', url: 'https://www.facebook.com/brandoxdigital' },
  { label: 'GitHub', url: profile.github },
  { label: 'LinkedIn', url: '' }, // e.g. 'https://www.linkedin.com/in/your-profile'
];

/** Scrolling ticker under the hero. */
export const marquee: string[] = ['E-commerce', 'ERP Systems', 'POS Software', 'Web Apps', 'Business Websites', 'SEO'];

/** Shown as tags in About Me. */
export const skills: string[] = [
  'HTML',
  'CSS',
  'JavaScript',
  'Responsive Design',
  'E-commerce',
  'SEO',
  'Web Apps',
  'ERP Systems',
  'POS Software',
];

/* ------------------------------------------------------------------ */
/* Work — real client projects delivered through Brandox Digital      */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    title: 'Visa Consultancy Experts',
    category: 'Study visa & immigration consultancy · Peshawar & Mardan',
    description: 'A trust-first website that turns study-abroad searches into booked consultations.',
    highlights: [
      'Destination pages for 7 countries — UK, Australia, Germany & more',
      'Booking, WhatsApp advisor and enquiry form',
      'Mobile-first build with SEO setup',
    ],
    image: {
      src: '/images/work/visa-consultancy-full-page.webp',
      alt: 'Full home page of the Visa Consultancy Experts website, headed “Pioneering Your Route To World-Class Universities”',
      width: 1440,
      height: 6241,
      scroll: true,
    },
    url: 'https://visa-consultancy.com',
    caseStudy: 'https://brandox.digital/work/visa-consultancy-experts',
  },
  {
    title: 'Zindabad Electronics',
    category: 'Electric bikes, batteries & solar store · Peshawar',
    description:
      'E-commerce store for electric bikes, batteries and solar products. I built the storefront, product catalogue, checkout and admin order workflows.',
    highlights: [
      'Storefront & catalogue with brand filters — EVEE, KNOX, PureVolt & more',
      'Checkout plus “Ask price on WhatsApp” on every product',
      'Admin order workflows for the store team',
    ],
    image: {
      src: '/images/work/zindabad-electronics-full-page.webp',
      alt: 'Full home page of the Zindabad Electronics website, headed “Move smarter. Ride electric.”',
      width: 1440,
      height: 5203,
      scroll: true,
    },
    url: 'https://zindabadelectronics.com/',
    caseStudy: 'https://brandox.digital/work/zindabad-electronics',
  },
  {
    title: 'Brandox Digital',
    category: 'My own agency website',
    description: 'My agency’s home: clear packages, real case studies and WhatsApp-first contact.',
    highlights: [
      'Service packages with clear starting prices',
      'Case studies for every client project',
      'Waitlist for the upcoming Brandox POS',
    ],
    image: {
      src: '/images/work/brandox-digital.png',
      alt: 'Brandox Digital home page, headed “We build websites & software that grow your business.”',
      width: 1600,
      height: 900,
    },
    url: 'https://brandox.digital',
  },
];

/** Hidden until real, permission-given testimonials are added here. */
export const testimonials: Testimonial[] = [];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export const process: { title: string; description: string; image: Img }[] = [
  {
    title: 'Free Consultation',
    description: 'We talk through your needs and you get a fixed price.',
    image: { src: '/images/photos/process-discover.webp', alt: 'Hand pinning a user-flow diagram to a wall', width: 2400, height: 1600 },
  },
  {
    title: 'Design',
    description: 'You see and approve mockups before any code.',
    image: { src: '/images/photos/process-plan.webp', alt: 'Hand-drawn website wireframes', width: 2400, height: 1600 },
  },
  {
    title: 'Build',
    description: 'Built, connected and tested on real phones.',
    image: { src: '/images/photos/process-develop.webp', alt: 'Laptop showing code beside a small plant', width: 2400, height: 1350 },
  },
  {
    title: 'Launch & Support',
    description: 'Go-live, Google setup and ongoing support.',
    image: { src: '/images/photos/process-launch.webp', alt: 'Phone home screen full of app icons', width: 2400, height: 1600 },
  },
];

export const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#work', label: 'Work' },
  { href: '#brandox', label: 'Brandox' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];
