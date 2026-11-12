'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ButtonLink } from '@/components/ui/button'
import { WordReveal } from '@/components/motion/Reveal'
import { Clouds, Hills, Stars } from '@/components/art/Sky'
import DashboardMock from './DashboardMock'

export default function Hero() {
  const stage = useRef<HTMLDivElement>(null)
  // The dashboard starts tilted back and straightens as it scrolls up into view.
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start end', 'start 0.25'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const y = useTransform(scrollYProgress, [0, 1], [40, 0])

  return (
    <section className="sky-hero relative overflow-hidden text-white">
      <Stars />
      <Clouds />

      <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28 lg:pt-32">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <Link
            href="/#your-data"
            className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 py-1 pl-1 pr-3 text-sm font-medium backdrop-blur hover:bg-white/20"
          >
            <span className="rounded-full bg-dawn px-2 py-0.5 text-xs font-bold text-ink">New</span>
            <span>
              Your data, your control<span className="hidden sm:inline">: your database, your cloud or your office</span>
            </span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </motion.div>
        <h1 className="text-[2.75rem] font-extrabold leading-[1.02] sm:text-7xl lg:text-[5.5rem]">
          <WordReveal text="Payday, without the month-end scramble." />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl"
        >
          Arisotech HRMS brings attendance, leave, salaries and statutory compliance into one system built for Indian
          companies. By the time you run payroll, the inputs are already in.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <ButtonLink href="/contact/" size="lg" className="sm:min-w-44">
            Book a demo
          </ButtonLink>
          <ButtonLink href="/pricing/" variant="inverse" size="lg" className="sm:min-w-44">
            See pricing
          </ButtonLink>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-5 text-sm text-white/70"
        >
          Try it with sample data first. No card needed.
        </motion.p>
      </div>

      <div ref={stage} className="relative px-3 pb-24 sm:px-6 lg:pb-36" style={{ perspective: '1400px' }}>
        <Hills className="h-[55%]" />
        <motion.div
          style={{ rotateX, scale, y, transformOrigin: 'center top' }}
          className="relative mx-auto max-w-6xl"
        >
          <DashboardMock />
        </motion.div>
      </div>
    </section>
  )
}
