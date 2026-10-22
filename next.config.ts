import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // 82 for photos and 85 for the hero portrait keep detail crisp on large and high-DPI screens.
    qualities: [75, 82, 85],
  },
};

export default nextConfig;
