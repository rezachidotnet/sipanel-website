import type {MetadataRoute} from 'next';
import {getSiteBaseUrl, withBaseUrl} from '@/lib/seo/metadata';

// Internal-only paths that no crawler needs to index. Applied uniformly to
// every user-agent group so the named search/AI bots get the same scope as '*'.
const DISALLOW = ['/_next/', '/api/', '/catalogs/'];

// Search + AI/LLM crawlers we explicitly welcome. Listing them by name (in
// addition to the '*' rule) makes intent unambiguous and future-proof: if the
// wildcard policy is ever tightened, these discovery agents stay allowed.
const ALLOWED_BOTS = [
  'Googlebot',
  'Bingbot',
  'GPTBot',
  'ClaudeBot',
  'PerplexityBot',
  'Google-Extended'
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW
      },
      {
        userAgent: ALLOWED_BOTS,
        allow: '/',
        disallow: DISALLOW
      }
    ],
    sitemap: withBaseUrl('/sitemap.xml'),
    host: getSiteBaseUrl()
  };
}

export const dynamic = 'force-static';

