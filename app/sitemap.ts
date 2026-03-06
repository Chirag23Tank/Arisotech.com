import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  // Always use production URL for sitemap - never localhost
  // Filter out localhost URLs to ensure production URLs only
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  const baseUrl = envUrl.includes('localhost') || envUrl.includes('127.0.0.1') || !envUrl
    ? 'https://arisotech.com'
    : envUrl
  
  // Calculate realistic last modified dates based on content update frequency
  const now = new Date()
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio/`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: lastWeek,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: lastMonth,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}

