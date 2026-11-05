import modulesData from '@/content/modules.json'
import type { ModuleGroup, ProductModule } from '@/types'

export const modules = modulesData.modules as ProductModule[]
export const moduleGroups = modulesData.groups as ModuleGroup[]

export function getModule(slug: string) {
  return modules.find((m) => m.slug === slug)
}

export function modulesInGroup(groupId: string) {
  return modules.filter((m) => m.group === groupId)
}

export function getBaseUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  if (!envUrl || envUrl.includes('localhost') || envUrl.includes('127.0.0.1')) {
    return 'https://arisotech.com'
  }
  return envUrl.replace(/\/$/, '')
}
