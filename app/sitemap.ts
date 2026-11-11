import type { MetadataRoute } from 'next';

/** Served at /sitemap.xml. The portfolio is a single page, so only the homepage is listed. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://alikhan-dev.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
