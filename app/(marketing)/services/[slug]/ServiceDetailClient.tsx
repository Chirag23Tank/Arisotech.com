'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, easeOut } from 'framer-motion'
import { Code, Smartphone, Network, Check, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PortfolioProject, ProcessStep, PricingTier, Service } from '@/types'
import ServiceFAQs from './ServiceFAQs'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  smartphone: Smartphone,
  network: Network,
}

const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function ServiceDetailClient({
  service,
  relatedProjects,
}: {
  service: Service
  relatedProjects: PortfolioProject[]
}) {
  const Icon = iconMap[service.icon] || Code

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div>
          {/* Service Header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="mb-16"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
              <Icon className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-6 text-xl text-gray-600">{service.detailedDescription}</p>
          </motion.div>

          {/* Features */}
          <AnimatedSection className="mb-20">
            <motion.h2 variants={sectionHeaderVariants} className="text-2xl font-bold text-gray-900 mb-8">
              What&apos;s Included
            </motion.h2>
            <motion.div variants={containerVariants} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {service.features.map((feature: string, index: number) => (
                <motion.div key={index} variants={itemVariants} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-blue-600 shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>

          {/* Process */}
          {service.process && service.process.length > 0 && (
            <AnimatedSection className="mb-20">
              <motion.h2 variants={sectionHeaderVariants} className="text-2xl font-bold text-gray-900 mb-12">
                Our Process
              </motion.h2>
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {service.process.map((step: ProcessStep) => (
                  <motion.div key={step.step} variants={itemVariants}>
                    <Card className="text-center">
                      <CardHeader>
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                          {step.step}
                        </div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{step.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>
          )}

          {/* Pricing */}
          {service.pricingTiers && service.pricingTiers.length > 0 && (
            <AnimatedSection className="mb-20">
              <motion.h2
                variants={sectionHeaderVariants}
                className="text-2xl font-bold text-gray-900 mb-12 text-center"
              >
                Pricing Plans
              </motion.h2>
              <motion.div variants={containerVariants} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {service.pricingTiers.map((tier: PricingTier) => (
                  <motion.div key={tier.name} variants={itemVariants}>
                    <Card className={tier.popular ? 'ring-2 ring-blue-500' : ''}>
                      <CardHeader className={tier.popular ? 'bg-blue-50' : ''}>
                        <CardTitle className="text-xl">{tier.name}</CardTitle>
                        <CardDescription>{tier.description}</CardDescription>
                        <div className="mt-4">
                          <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 mb-6">
                          {tier.features.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Link href="/contact" className="block">
                          <Button className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                            Get Started
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>
          )}

          {/* Technology Stack */}
          {service.technologies && service.technologies.length > 0 && (
            <AnimatedSection className="mb-20">
              <motion.h2 variants={sectionHeaderVariants} className="text-2xl font-bold text-gray-900 mb-8">
                Technologies We Use
              </motion.h2>
              <motion.div variants={containerVariants} className="flex flex-wrap gap-3">
                {service.technologies.map((tech: string, index: number) => (
                  <motion.span
                    key={index}
                    variants={itemVariants}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatedSection>
          )}

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <AnimatedSection>
              <motion.div variants={itemVariants}>
                <ServiceFAQs faqs={service.faqs} />
              </motion.div>
            </AnimatedSection>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <AnimatedSection className="mb-20">
              <motion.h2
                variants={sectionHeaderVariants}
                className="text-3xl font-bold text-gray-900 mb-12 text-center"
              >
                Related Projects
              </motion.h2>
              <motion.div variants={containerVariants} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {relatedProjects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link href={`/portfolio/${project.id}`} className="block">
                          <Button variant="outline" className="w-full">
                            View Project
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>
          )}

          {/* CTA */}
          <AnimatedSection>
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Let&apos;s discuss how we can help bring your project to life.
              </p>
              <Link href="/contact">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}


