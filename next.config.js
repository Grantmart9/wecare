/** @type {import('next').NextConfig} */
const nextConfig = {
  // appDir is now the default in Next.js 13+, no need for experimental flag
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    unoptimized: true, // Add this for static export
  },
  // Conditionally set output based on environment
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export',
    trailingSlash: true, // Add trailing slashes for better CPanel compatibility
  } : {}),
  // API rewrites removed - using Supabase directly instead of custom backend
  // Set turbopack root to silence lockfile warning
  turbopack: {
    root: process.cwd(),
  },
};

module.exports = nextConfig;