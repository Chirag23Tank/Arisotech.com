import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  // Fix static export issues
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  // Ensure React strict mode for better production builds
  reactStrictMode: true,
  // Disable any server-side features that might cause RSC issues
  poweredByHeader: false,
  // CRITICAL: Include environment variables in static export
  // This ensures NEXT_PUBLIC_* variables are embedded in the build
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  experimental: {
    // Optimize static generation
    optimizeCss: true,
    // Disable server actions for static export
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Ensure consistent build IDs for static export to prevent RSC payload requests
  generateBuildId: async () => {
    // Use a static build ID to prevent RSC payload requests
    return 'production-build'
  },
};

export default nextConfig;
