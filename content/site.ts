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
  description: string;
  tags: string[];
  image: Img;
  /** Live project URL. Leave '' to show "Link coming soon". */
  url: string;
  /** true = shows a "Sample" badge. Set to false once this is a real project. */
  sample: boolean;
};

export type Testimonial = { quote: string; name: string; role: string };

export type Experience = { role: string; organisation: string; period: string; summary?: string };

/* ------------------------------------------------------------------ */
/* Confirmed details                                                   */
/* ------------------------------------------------------------------ */

export const profile = {
  name: 'Ali Khan',
  role: 'Developer',
  heroTitle: ['Creative', 'Developer'],
  heroStatement: ['Building', 'Digital', 'Experiences'],
  greeting: 'Hi, I’m Ali Khan',
  intro: 'I build responsive websites and thoughtful digital experiences.',
  about:
    'I’m a developer focused on creating clean, responsive, and easy-to-use websites. I enjoy turning ideas into practical digital experiences with careful attention to layout, performance, and detail.',
  portrait: {
    src: '/images/ali-khan-hero.png',
    alt: 'Ali Khan in a white T-shirt with his arms crossed',
    width: 1086,
    height: 1448,
  } satisfies Img,
};

export const services: { title: string; description: string; includes: string[]; image: Img }[] = [
  {
    title: 'Website Development',
    description:
      'Complete, responsive websites built from the ground up — clearly structured, easy to update and ready to grow.',
    includes: ['Custom responsive layouts', 'Clear structure and navigation', 'Easy to update and extend'],
    image: { src: '/images/photos/service-websites.webp', alt: 'Two developers working at computers in a bright office', width: 2400, height: 1600 },
  },
  {
    title: 'Frontend Development',
    description:
      'Turning designs into fast, accessible interfaces with semantic HTML, modern CSS and clean JavaScript.',
    includes: ['Designs turned into working UI', 'Accessible, semantic markup', 'Consistent on every device'],
    image: { src: '/images/photos/service-frontend.webp', alt: 'A website design shown on a desktop monitor, a tablet and a phone', width: 2400, height: 3000 },
  },
  {
    title: 'Website Optimization',
    description:
      'Improving the speed, accessibility and structure of existing sites so they feel quicker and work for more people.',
    includes: ['Faster page loads', 'Accessibility improvements', 'Cleaner, maintainable code'],
    image: { src: '/images/photos/service-optimization.webp', alt: 'Laptop showing an analytics dashboard with charts', width: 2400, height: 1589 },
  },
];

/* ------------------------------------------------------------------ */
/* To confirm or replace — contact details, skills, experience, work  */
/* ------------------------------------------------------------------ */

export const contact = {
  /** e.g. 'hello@yourdomain.com'. Empty = no email shown anywhere. */
  email: '',
  /** e.g. 'City, Country'. Empty = hidden. */
  location: '',
};

/** Only links with a URL are shown. Empty ones are hidden automatically. */
export const socials: { label: 'GitHub' | 'LinkedIn'; url: string }[] = [
  { label: 'GitHub', url: '' }, // e.g. 'https://github.com/your-username'
  { label: 'LinkedIn', url: '' }, // e.g. 'https://www.linkedin.com/in/your-profile'
];

/** Shown as tags in About Me. Please confirm or edit this list. */
export const skills: string[] = ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Accessibility', 'Performance'];

/** Optional. Add real roles here and they appear in About Me. Nothing is shown while empty. */
export const experience: Experience[] = [];

/** Sample projects until real work is added. Keep `sample: true` until a project is real. */
export const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description: 'A personal site for a creative professional, with a project gallery and contact page.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: { src: '/images/photos/project-portfolio.webp', alt: 'Monitor showing a web design layout', width: 2400, height: 1893 },
    url: '',
    sample: true,
  },
  {
    title: 'Web Application',
    description: 'A mobile-first interface for tracking daily tasks and progress.',
    tags: ['React', 'API'],
    image: { src: '/images/photos/project-webapp.webp', alt: 'Hand holding a phone showing a finance app', width: 2400, height: 1800 },
    url: '',
    sample: true,
  },
  {
    title: 'Business Website',
    description: 'A clear, fast site for a local business with services and a contact form.',
    tags: ['HTML', 'CSS', 'SEO'],
    image: { src: '/images/photos/project-business.webp', alt: 'Laptop with code on a white desk', width: 2400, height: 1598 },
    url: '',
    sample: true,
  },
  {
    title: 'Online Store',
    description: 'A product catalogue with filters, a cart and a simple checkout flow.',
    tags: ['JavaScript', 'Responsive'],
    image: { src: '/images/photos/project-store.webp', alt: 'An “Open” sign hanging in a shop window', width: 2400, height: 1600 },
    url: '',
    sample: true,
  },
  {
    title: 'Analytics Dashboard',
    description: 'A data dashboard with charts, filters and a layout that adapts to any screen.',
    tags: ['JavaScript', 'Charts', 'CSS Grid'],
    image: { src: '/images/photos/project-dashboard.webp', alt: 'Laptop displaying a dashboard with charts', width: 2400, height: 1709 },
    url: '',
    sample: true,
  },
];

/** Hidden until real, permission-given testimonials are added here. */
export const testimonials: Testimonial[] = [];

/* ------------------------------------------------------------------ */
/* Process & workspace                                                 */
/* ------------------------------------------------------------------ */

export const process: { title: string; description: string; image: Img }[] = [
  {
    title: 'Discover',
    description: 'Understanding your goals, your audience and what the website needs to achieve.',
    image: { src: '/images/photos/process-discover.webp', alt: 'Hand pinning a user-flow diagram to a wall', width: 2400, height: 1600 },
  },
  {
    title: 'Plan',
    description: 'Mapping the structure, content and layout before any code is written.',
    image: { src: '/images/photos/process-plan.webp', alt: 'Hand-drawn website wireframes', width: 2400, height: 1600 },
  },
  {
    title: 'Develop',
    description: 'Building a responsive, accessible site with clean code and regular check-ins.',
    image: { src: '/images/photos/process-develop.webp', alt: 'Laptop showing code beside a small plant', width: 2400, height: 1350 },
  },
  {
    title: 'Launch',
    description: 'Testing across devices, going live and making sure everything runs smoothly.',
    image: { src: '/images/photos/process-launch.webp', alt: 'Phone home screen full of app icons', width: 2400, height: 1600 },
  },
];

/** Illustrative mood images — not photos of Ali's own equipment. Swap in your own when ready. */
export const workspace: { title: string; caption: string; image: Img }[] = [
  {
    title: 'Daylight & Focus',
    caption: 'Calm, bright and free of distractions.',
    image: { src: '/images/photos/workspace-bright.webp', alt: 'Bright office desk by a large window', width: 2400, height: 1600 },
  },
  {
    title: 'Less Clutter',
    caption: 'Fewer things on the desk, clearer thinking.',
    image: { src: '/images/photos/workspace-minimal.webp', alt: 'Minimal laptop on a light wooden desk', width: 2400, height: 1600 },
  },
  {
    title: 'Where Code Happens',
    caption: 'Long, focused building sessions.',
    image: { src: '/images/photos/workspace-code.webp', alt: 'Laptop showing code in a dim room', width: 2400, height: 1600 },
  },
  {
    title: 'Room to See It All',
    caption: 'Space to test layouts side by side.',
    image: { src: '/images/photos/workspace-monitor.webp', alt: 'Laptop and external monitor beside a window', width: 2400, height: 1602 },
  },
  {
    title: 'Evening Polish',
    caption: 'Final details, one more check.',
    image: { src: '/images/photos/workspace-evening.webp', alt: 'Warm desk lamp lighting a laptop in the evening', width: 2400, height: 1600 },
  },
];

export const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];
