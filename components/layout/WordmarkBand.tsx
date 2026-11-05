'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Clouds, Hills } from '@/components/art/Sky'

/** A giant Arisotech wordmark that rises out of the hills as the footer comes into view. */
export default function WordmarkBand() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['45%', '0%'])
  // Function form keeps this in JS. The array form is offloaded to a native ViewTimeline,
  // which drops back to opacity 0 once the timeline finishes at the bottom of the page.
  const opacity = useTransform(scrollYProgress, (v) => Math.min(1, v / 0.6))

  return (
    <div ref={ref} className="sky-dawn relative h-[16rem] overflow-hidden sm:h-[24rem] lg:h-[30rem]" aria-hidden>
      <Clouds />
      <motion.p
        style={{ y, opacity }}
        className="absolute inset-x-0 bottom-[12%] text-center font-sans text-[22vw] font-bold leading-none tracking-tight text-white/85 sm:text-[18vw] lg:text-[16rem]"
      >
        Arisotech
      </motion.p>
      <Hills className="h-[45%]" tone="night" />
    </div>
  )
}
