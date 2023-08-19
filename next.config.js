/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: []
  },
  webpack: (config, options) => {
    config.externals.push('chrome-aws-lambda', 'puppeteer-core', 'playwright-core');

    return config;
  }
};
