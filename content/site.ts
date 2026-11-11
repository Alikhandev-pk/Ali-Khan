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
  /** What was built — 3 to 4 short points. */
  highlights: string[];
  tags: string[];
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

export type Experience = { role: string; organisation: string; period: string; summary?: string; url?: string };

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const profile = {
  name: 'Ali Khan',
  role: 'Founder of Brandox Digital & Web Developer',
  heroTitle: ['Founder &', 'Developer'],
  heroStatement: ['Websites', 'That Grow', 'Business'],
  greeting: 'Hi, I’m Ali Khan',
  intro: 'I build websites, online stores and custom software that help businesses get found and get customers.',
  heroNote: 'Founder & CEO of Brandox Digital — a web and software agency in Peshawar, Pakistan.',
  about:
    'I’m the founder and CEO of Brandox Digital, a web and software agency in Peshawar. I help clinics, schools, shops, consultancies and showrooms build a strong online presence — fast, mobile-first websites, product catalogues and custom web apps that turn visitors into calls, WhatsApp chats and walk-ins.',
  portrait: {
    src: '/images/ali-khan-hero.png',
    alt: 'Ali Khan in a white T-shirt with his arms crossed',
    width: 1086,
    height: 1448,
  } satisfies Img,
  /** Formal photo shown in About Me. */
  photo: {
    src: '/images/ali-khan-founder.jpg',
    alt: 'Ali Khan, founder of Brandox Digital, in a dark blazer and white shirt',
    width: 1122,
    height: 1402,
  } satisfies Img,
};

/* ------------------------------------------------------------------ */
/* Agency                                                              */
/* ------------------------------------------------------------------ */

export const agency = {
  name: 'Brandox Digital',
  url: 'https://brandox.digital',
  tagline: 'We build websites & software that grow your business.',
  description:
    'Brandox Digital is the agency I founded to help local businesses go digital — from a Google Business Profile and a one-page site to full web apps and POS software. Fixed prices, mockups before code, and real support on WhatsApp after launch.',
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
    status: 'Coming soon',
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
    description:
      'Fast, mobile-first websites that build trust quickly, explain what you do and turn visitors into enquiries.',
    includes: ['Up to 5 pages + enquiry form', 'WhatsApp button & Google Maps', 'Basic SEO setup'],
    image: { src: '/images/photos/service-websites.webp', alt: 'Two developers working at computers in a bright office', width: 2400, height: 1600 },
  },
  {
    title: 'Online Stores & Catalogues',
    description:
      'Product catalogues with categories, brands and prices, where every product can be enquired about on WhatsApp.',
    includes: ['Categories & brand filters', '“Ask on WhatsApp” on every item', 'Swipeable mobile layout'],
    image: { src: '/images/photos/service-frontend.webp', alt: 'A website design shown on a desktop monitor, a tablet and a phone', width: 2400, height: 3000 },
  },
  {
    title: 'Web Apps & Software',
    description:
      'Custom software for the way your business runs — booking systems, admin panels, customer portals, dashboards and POS.',
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
  { label: 'GitHub', url: '' }, // e.g. 'https://github.com/your-username'
  { label: 'LinkedIn', url: '' }, // e.g. 'https://www.linkedin.com/in/your-profile'
];

/** Shown as tags in About Me. */
export const skills: string[] = [
  'HTML',
  'CSS',
  'JavaScript',
  'Responsive Design',
  'E-commerce',
  'SEO',
  'Web Apps',
  'POS Software',
];

export const experience: Experience[] = [
  {
    role: 'Founder & CEO',
    organisation: 'Brandox Digital',
    period: 'Present',
    summary: 'Running a web & software agency in Peshawar — websites, online stores, web apps and POS for local businesses.',
    url: 'https://brandox.digital',
  },
];

/* ------------------------------------------------------------------ */
/* Work — real client projects delivered through Brandox Digital      */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    title: 'Visa Consultancy Experts',
    category: 'Study visa & immigration consultancy · Peshawar & Mardan',
    description:
      'Students search on their phones and ask questions on WhatsApp. The consultancy needed a site that builds trust fast, shows the countries it works with and turns visitors into enquiries.',
    highlights: [
      'Destination pages for 7 countries — UK, Australia, Germany & more',
      'Booking button, WhatsApp advisor and enquiry form',
      'Study-abroad FAQ written for Pakistani students',
      'Mobile-first layout with SEO setup',
    ],
    tags: ['Website Design', 'Development', 'SEO', 'Mobile-friendly'],
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
      'Customers wanted to see bikes, batteries and inverters before visiting the showroom. We built an online catalogue that shows the full range by category and brand and turns visitors into calls, chats and visits.',
    highlights: [
      'Product catalogue — e-bikes, batteries, energy storage, inverters',
      'Brand filters for EVEE, EVEON, KNOX, PureVolt & more',
      '“Ask price on WhatsApp” on every product',
      'Showroom section with directions and a call button',
    ],
    tags: ['E-commerce', 'Website Design', 'Development', 'Mobile-friendly'],
    image: {
      src: '/images/work/zindabad-electronics-full-page.webp',
      alt: 'Full home page of the Zindabad Electronics website, headed “Move smarter. Ride electric.”',
      width: 1440,
      height: 5203,
      scroll: true,
    },
    url: 'https://zindabadelectronics.com',
    caseStudy: 'https://brandox.digital/work/zindabad-electronics',
  },
  {
    title: 'Brandox Digital',
    category: 'My own agency website',
    description:
      'The home of my agency: clear packages, real case studies and a WhatsApp-first contact flow, built for business owners who decide on their phones.',
    highlights: [
      'Service packages with clear starting prices',
      'Case studies for every client project',
      'WhatsApp chat on every page',
      'Waitlist for the upcoming Brandox POS',
    ],
    tags: ['Brand', 'Website Design', 'Development', 'SEO'],
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
    description: 'We talk about your business and what you need, and you get a fixed price — no surprises.',
    image: { src: '/images/photos/process-discover.webp', alt: 'Hand pinning a user-flow diagram to a wall', width: 2400, height: 1600 },
  },
  {
    title: 'Design',
    description: 'You see mockups and give feedback before a single line of code is written.',
    image: { src: '/images/photos/process-plan.webp', alt: 'Hand-drawn website wireframes', width: 2400, height: 1600 },
  },
  {
    title: 'Build',
    description: 'Development with WhatsApp, Maps and forms connected — and everything tested on real phones.',
    image: { src: '/images/photos/process-develop.webp', alt: 'Laptop showing code beside a small plant', width: 2400, height: 1350 },
  },
  {
    title: 'Launch & Support',
    description: 'Go-live, Google setup and ongoing support on WhatsApp after launch.',
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
