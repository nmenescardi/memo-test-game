/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['via.placeholder.com', 'plus.unsplash.com', 'images.unsplash.com'],
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;
