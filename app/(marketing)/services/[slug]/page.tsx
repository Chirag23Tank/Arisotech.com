import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import servicesData from '@/content/services.json'
import portfolioData from '@/content/portfolio.json'
import { PortfolioProject, Service } from '@/types'
import ServiceDetailClient from './ServiceDetailClient'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return servicesData.services.map((service: Service) => ({
    slug: service.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = servicesData.services.find((s: Service) => s.id === slug)
  
  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  const baseUrl = 'https://arisotech.com'
  const description = service.detailedDescription || service.description

  return {
    title: `${service.title} | Arisotech`,
    description: description,
    keywords: [
      service.title.toLowerCase(),
      'web development',
      'mobile app development',
      'networking solutions',
      'Jaipur',
      'Rajasthan',
      ...(service.technologies || []),
    ],
    openGraph: {
      title: `${service.title} | Arisotech`,
      description: description,
      type: 'website',
      url: `${baseUrl}/services/${service.id}/`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | Arisotech`,
      description: description,
    },
    alternates: {
      canonical: `${baseUrl}/services/${service.id}/`,
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = servicesData.services.find((s: Service) => s.id === slug) as Service

  if (!service) {
    notFound()
  }

  const projects = portfolioData.projects as unknown as PortfolioProject[]
  const relatedProjects = projects.filter((p) => 
    service.relatedProjects?.includes(p.id)
  )

  return <ServiceDetailClient service={service} relatedProjects={relatedProjects} />
}


