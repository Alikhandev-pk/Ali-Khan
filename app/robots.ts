import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-url';

/** Served at /robots.txt. Lets every crawler index the site and points them to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
