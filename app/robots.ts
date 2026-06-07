import type {MetadataRoute} from 'next';
import {getSiteBaseUrl, withBaseUrl} from '@/lib/seo/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_next/', '/api/', '/catalogs/']
    },
    sitemap: withBaseUrl('/sitemap.xml'),
    host: getSiteBaseUrl()
  };
}

export const dynamic = 'force-static';

