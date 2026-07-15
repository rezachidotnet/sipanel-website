import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [65, 75]
  },
  outputFileTracingExcludes: {
    '/api/lead': ['./assets/**', './public/**', './private/**', './specs/**', './content/**', './nginx/**', './scripts/**', './.next/cache/**'],
    '/api/rfq': ['./assets/**', './public/**', './private/**', './specs/**', './content/**', './nginx/**', './scripts/**', './.next/cache/**']
  }
};

export default withNextIntl(nextConfig);
