import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp']
  },
  outputFileTracingExcludes: {
    '/api/lead': ['./assets/**', './public/**', './private/**', './specs/**', './content/**', './nginx/**', './scripts/**', './.next/cache/**'],
    '/api/rfq': ['./assets/**', './public/**', './private/**', './specs/**', './content/**', './nginx/**', './scripts/**', './.next/cache/**']
  }
};

export default withNextIntl(nextConfig);
