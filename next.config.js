/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['it', 'en'],
    defaultLocale: 'it',
    localeDetection: true,
  },
  trailingSlash: true,
  images: {
    domains: [
      'cloudflare-ipfs.com',
      'loremflickr.com',
      'cms2022.isoladellestorie.it',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/en/guests/:slug/',
        destination: '/en/ospiti/:slug/',
        locale: false,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*).(jpg|jpeg|png|svg|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=360, s-maxage=360',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
