'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, Users, Award, Rocket } from 'lucide-react'

interface TimelineEvent {
  year: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '2023',
    title: 'Company Founded',
    description: 'Arisotech was established with a vision to deliver cutting-edge technology solutions.',
    icon: Rocket,
  },
  {
    year: '2023',
    title: 'First Major Project',
    description: 'Successfully delivered our first enterprise web application, establishing our reputation.',
    icon: Award,
  },
  {
    year: '2024',
    title: 'Team Expansion',
    description: 'Expanded our team to include expert developers and designers.',
    icon: Users,
  },
  {
    year: '2024',
    title: '25+ Projects Completed',
    description: 'Reached a milestone of 25+ successful projects across various industries.',
    icon: Calendar,
  },
]

export default function CompanyTimeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Journey
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Milestones that shaped our company
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block" aria-hidden="true" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative flex gap-8"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
                      <Icon className="h-8 w-8" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-bold text-blue-600">{event.year}</span>
                      <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                    </div>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}






