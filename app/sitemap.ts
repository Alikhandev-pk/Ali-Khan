import type { MetadataRoute } from 'next';
import { profile } from '@/content/site';
import { siteUrl } from '@/lib/site-url';

/** Served at /sitemap.xml. The portfolio is a single page, so only the homepage is listed (with Ali's photo). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: [`${siteUrl}${profile.portrait.src}`],
    },
  ];
}
