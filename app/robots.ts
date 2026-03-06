import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  // Always use production URL for robots.txt - never localhost
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  const baseUrl = envUrl.includes('localhost') || envUrl.includes('127.0.0.1') || !envUrl
    ? 'https://arisotech.com'
    : envUrl
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

