import { agency, contact, profile, skills, socials } from '@/content/site';
import { siteUrl } from '@/lib/site-url';

/**
 * Schema.org data that tells Google who Ali is, his agency and this website.
 * Helps the site show for searches like "Ali Khan web developer" and "web developer in Peshawar".
 */
export default function StructuredData() {
  const sameAs = socials.map((s) => s.url).filter((u) => /^https?:\/\//.test(u) && !u.includes('wa.me'));
  const address = {
    '@type': 'PostalAddress',
    addressLocality: 'Peshawar',
    addressRegion: 'Khyber Pakhtunkhwa',
    addressCountry: 'PK',
  };

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: profile.name,
        url: `${siteUrl}/`,
        image: `${siteUrl}${profile.portrait.src}`,
        jobTitle: 'Web Developer & Founder',
        description: profile.about,
        worksFor: { '@id': `${siteUrl}/#agency` },
        address,
        email: contact.email ? `mailto:${contact.email}` : undefined,
        telephone: contact.phone || undefined,
        knowsAbout: skills,
        sameAs: [...sameAs, agency.url],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#agency`,
        name: agency.name,
        url: agency.url,
        logo: `${siteUrl}${agency.logo.src}`,
        image: `${siteUrl}/og-image.png`,
        description: agency.description,
        founder: { '@id': `${siteUrl}/#person` },
        address,
        areaServed: ['Peshawar', 'Pakistan'],
        telephone: contact.phone || undefined,
        email: contact.email || undefined,
        sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: profile.name,
        inLanguage: 'en',
        publisher: { '@id': `${siteUrl}/#person` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#profile`,
        url: `${siteUrl}/`,
        name: `${profile.name} — Web Developer in Peshawar`,
        isPartOf: { '@id': `${siteUrl}/#website` },
        mainEntity: { '@id': `${siteUrl}/#person` },
        primaryImageOfPage: `${siteUrl}${profile.portrait.src}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\u003c') }}
    />
  );
}
