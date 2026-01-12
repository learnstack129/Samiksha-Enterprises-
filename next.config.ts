// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'logo.clearbit.com' }, // Keep as backup
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      // ADD GOOGLE HERE:
      { protocol: 'https', hostname: 'www.google.com' },
    ],
  },
};

export default nextConfig;
