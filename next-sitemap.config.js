/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://www.isoladellestorie.it",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    "/en",
    "/laboratori",
    "/chi-siamo",
    "/programma",
    "/info-visitatori",
  ],
};

module.exports = config;
