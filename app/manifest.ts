import type {MetadataRoute} from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SIPANEL',
    short_name: 'SIPANEL',
    description: 'Industrial building envelope engineering by SIPANEL.',
    start_url: '/fa',
    scope: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#FF6A00',
    icons: [
      {
        src: '/icons/icon-48.png',
        sizes: '48x48',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ]
  };
}
