import { agency, contact, profile, seo, skills, socials } from '@/content/site';
import { siteUrl } from '@/lib/site-url';

/**
 * Schema.org data that tells Google who Ali is, his agency and this website.
 * Helps the site show for searches like "Ali Khan web developer" and "web developer in Peshawar".
 */
export default function StructuredData() {
  // The Instagram and Facebook accounts belong to the agency; GitHub and the founder page are Ali's own.
  const agencySameAs = socials
    .map((s) => s.url)
    .filter((u) => /^https?:\/\//.test(u) && !u.includes('wa.me') && u !== profile.github);
  const personSameAs = [profile.github, profile.founderPage];
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
        jobTitle: profile.jobTitle,
        description: profile.about,
        worksFor: { '@id': `${siteUrl}/#agency` },
        address,
        email: contact.email ? `mailto:${contact.email}` : undefined,
        telephone: contact.phone || undefined,
        knowsAbout: skills,
        sameAs: personSameAs,
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
        sameAs: agencySameAs,
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
        name: seo.title,
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
