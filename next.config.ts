import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static HTML export: `npm run build` writes the deployable site to ./out
  // (build internals stay in ./.next, so dev files never end up in the upload).
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  reactStrictMode: true,
  poweredByHeader: false,
  // NEXT_PUBLIC_* values are baked into the static build.
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  experimental: {
    optimizeCss: true,
  },
  // No fixed generateBuildId: each deploy needs a unique ID, otherwise browsers and
  // CDNs mix cached files from an older deploy with the new one and navigation crashes.
}

export default nextConfig
