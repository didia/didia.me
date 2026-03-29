const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  trailingSlash: true,
  outputFileTracingRoot: path.join(__dirname),
};

module.exports = nextConfig;
