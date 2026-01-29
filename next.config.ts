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
      { protocol: 'https', hostname: 'logo.clearbit.com' }, 
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'www.google.com' },
      // REQUIRED FOR FIREBASE IMAGES:
      { 
        protocol: 'https', 
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/**', 
      },
    ],
  },
};

export default nextConfig;
