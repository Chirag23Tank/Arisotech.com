export interface FAQ {
  question: string
  answer: string
}

export interface ModuleCapability {
  title: string
  text: string
}

export interface ModuleStep {
  title: string
  text: string
}

export interface ModuleGroup {
  id: string
  name: string
}

export interface ProductModule {
  slug: string
  name: string
  group: string
  summary: string
  headline: string
  intro: string
  capabilities: ModuleCapability[]
  workflow: ModuleStep[]
  faqs: FAQ[]
}

export interface PricingPlan {
  id: string
  name: string
  pricePerEmployee: number | null
  for: string
  includes: string[]
  cta: string
  highlight: boolean
}
