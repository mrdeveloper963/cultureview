import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },

  // Compression
  compress: true,

  // Performance optimizations
  poweredByHeader: false,

  // Production optimizations
  productionBrowserSourceMaps: false,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@/components'],
  },
};

export default nextConfig;
