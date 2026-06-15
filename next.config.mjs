import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [65, 75]
  },
  // Permanent (308) apex -> www canonicalization, code source of truth.
  // NOTE: in the current production setup the apex redirect is served by Vercel
  // (platform level, before this app runs), so this rule is only reached if the
  // apex domain is pointed at the Next app directly. It cannot loop: it matches
  // only host === 'sipanelco.ir' and redirects to the www host.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{type: 'host', value: 'sipanelco.ir'}],
        destination: 'https://www.sipanelco.ir/:path*',
        permanent: true
      }
    ];
  },
  outputFileTracingExcludes: {
    '/api/lead': ['./assets/**', './public/**', './private/**', './specs/**', './content/**', './nginx/**', './scripts/**', './.next/cache/**'],
    '/api/rfq': ['./assets/**', './public/**', './private/**', './specs/**', './content/**', './nginx/**', './scripts/**', './.next/cache/**']
  }
};

export default withNextIntl(nextConfig);
