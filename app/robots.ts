import type {MetadataRoute} from 'next';
import {withBaseUrl} from '@/lib/seo/metadata';

// Explicitly allow every Next.js build asset so Googlebot can render pages and
// crawl optimized images. Blocking /_next/ (or CSS/JS/fonts/images/the image
// optimizer) breaks rendering and was causing "blocked by robots.txt" errors
// in Search Console for /_next/image, chunks, media, and /clients/*.webp.
const ALLOW = [
  '/',
  '/_next/',
  '/_next/static/',
  '/_next/image',
  '/clients/',
  '/og/',
  '/assets/'
];

// Internal-only paths that no crawler needs to index. Applied uniformly to
// every user-agent group so the named search/AI bots get the same scope as '*'.
const DISALLOW = ['/api/', '/admin/', '/private/'];

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
        allow: ALLOW,
        disallow: DISALLOW
      },
      {
        userAgent: ALLOWED_BOTS,
        allow: ALLOW,
        disallow: DISALLOW
      }
    ],
    sitemap: withBaseUrl('/sitemap.xml')
  };
}

export const dynamic = 'force-static';

