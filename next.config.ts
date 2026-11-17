import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // HD: 90 for photos, 92 for project screenshots (small UI text stays sharp), 95 for Ali's portrait.
    qualities: [75, 90, 92, 95],
  },
};

export default nextConfig;
