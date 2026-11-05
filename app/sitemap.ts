import type { MetadataRoute } from 'next'
import { getBaseUrl, modules } from '@/lib/content'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl()
  const now = new Date()

  const pages: { path: string; priority: number }[] = [
    { path: '/', priority: 1 },
    { path: '/features/', priority: 0.9 },
    { path: '/pricing/', priority: 0.9 },
    { path: '/solutions/', priority: 0.8 },
    { path: '/contact/', priority: 0.8 },
    { path: '/about/', priority: 0.6 },
    { path: '/blog/', priority: 0.6 },
    ...modules.map((m) => ({ path: `/features/${m.slug}/`, priority: 0.8 })),
  ]

  return pages.map((p) => ({ url: `${base}${p.path}`, lastModified: now, priority: p.priority }))
}
