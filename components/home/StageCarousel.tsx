'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'
import { Clouds } from '@/components/art/Sky'

const slides = [
  {
    stage: 'Startups, 10 to 50 people',
    title: 'From one salary spreadsheet to a payroll you can hand over',
    text: 'PF, ESI and PT set up correctly from the first run, offer letters from templates, and no full-time HR person needed.',
    sky: 'sky-dawn',
    href: '/solutions/#startups',
  },
  {
    stage: 'Growing companies, 50 to 500',
    title: 'Approvals that reach the right manager without WhatsApp',
    text: 'Biometric, mobile and web clock-ins in one place, and a payroll review that shows what changed and why.',
    sky: 'sky-dusk',
    href: '/solutions/#growing',
  },
  {
    stage: 'Multi-location and multi-entity',
    title: 'Every office on its own rules, one HR team in control',
    text: 'State-wise professional tax, separate legal entities and location-based holiday calendars from a single account.',
    sky: 'sky-hero',
    href: '/solutions/#multi-entity',
  },
]

const DURATION = 7 // seconds per slide

export default function StageCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const auto = !paused && !reduce

  useEffect(() => {
    if (!auto) return
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), DURATION * 1000)
    return () => clearTimeout(t)
  }, [index, auto])

  const s = slides[index]

  return (
    <section aria-labelledby="stages-heading" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <h2 id="stages-heading" className="max-w-3xl text-4xl font-bold sm:text-5xl sm:leading-[1.05]">
          Set up for the stage your company is at
        </h2>
      </Reveal>

      <Reveal
        delay={0.1}
        className={`relative mt-12 min-h-[26rem] overflow-hidden rounded-slip p-6 text-white transition-[background] duration-700 sm:p-12 ${s.sky}`}
      >
        <Clouds />
        <div className="relative flex flex-wrap items-center gap-3" role="tablist" aria-label="Company stages">
          {slides.map((sl, i) => (
            <button
              key={sl.stage}
              role="tab"
              aria-selected={i === index}
              aria-label={sl.stage}
              onClick={() => setIndex(i)}
              className="relative h-1 w-16 overflow-hidden rounded-full bg-white/30 sm:w-24"
            >
              {i < index && <span className="absolute inset-0 bg-white" />}
              {i === index && (
                <span
                  key={`${index}-${auto}`}
                  className="progress-fill absolute inset-0 bg-white"
                  style={{ animationDuration: `${DURATION}s`, animationPlayState: auto ? 'running' : 'paused' }}
                />
              )}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="ml-1 rounded-full p-1.5 text-white/80 hover:bg-white/15 hover:text-white"
            aria-label={paused ? 'Play slides' : 'Pause slides'}
          >
            {paused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            role="tabpanel"
            aria-live="polite"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-16 max-w-2xl sm:mt-24"
          >
            <p className="font-display text-lg font-bold text-white/85">{s.stage}</p>
            <h3 className="mt-3 text-3xl font-bold sm:text-5xl sm:leading-[1.08]">{s.title}</h3>
            <p className="mt-5 text-lg text-white/85">{s.text}</p>
            <div className="mt-8">
              <ButtonLink href={s.href} variant="inverse">
                See how it fits
              </ButtonLink>
            </div>
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </section>
  )
}
