/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack is default in Next 16; declare empty config to satisfy Next when no Turbopack rules are needed
  turbopack: {},

  // Force Turbopack (or Webpack) explicitly to silence build-time chooser error on CI/EC2.
  // Pick ONE of the following approaches:
  // 1) Prefer Turbopack (recommended):
  //   Set the env var NEXT_RUNTIME=turbopack or keep default and pass --turbopack at CLI.
  // 2) Or force Webpack temporarily while migrating custom configs:
  //   Uncomment the line below to force Webpack during build:
  // webpackVersion: '5',

  // Keep static export if required by deployment
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // Remove ALL custom webpack config to avoid Next 16 Turbopack error
  // If you previously handled fonts via file-loader, move fonts into /public/fonts and reference them by URL.
  // Turbopack and Next 16 handle static assets from /public out of the box.

  // Resolve multiple-lockfile warning by scoping tracing to this workspace
  // This prevents Next from inferring a parent directory as root in dev/build.
  outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;
