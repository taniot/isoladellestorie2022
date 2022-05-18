/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["it", "en"],
    defaultLocale: "it",
    localeDetection: false,
  },
  trailingSlash: true,
  images: {
    domains: ["cloudflare-ipfs.com", "loremflickr.com"],
  },
  async rewrites() {
    return [
      {
        source: "/en/guests/:slug/",
        destination: "/en/ospiti/:slug/",
        locale: false,
      },
    ];
  },
};

module.exports = nextConfig;
