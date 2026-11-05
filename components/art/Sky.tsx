'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const clouds = [
  { top: '14%', left: '6%', w: 320, h: 70, dur: 70 },
  { top: '26%', left: '62%', w: 420, h: 90, dur: 90 },
  { top: '44%', left: '24%', w: 260, h: 60, dur: 60 },
  { top: '58%', left: '74%', w: 360, h: 80, dur: 80 },
  { top: '66%', left: '2%', w: 300, h: 70, dur: 75 },
]

export function Clouds() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {clouds.map((c, i) => (
        <span
          key={i}
          className="cloud"
          style={{
            top: c.top,
            left: c.left,
            width: c.w,
            height: c.h,
            animationDuration: `${c.dur}s`,
            animationDirection: i % 2 ? 'alternate-reverse' : 'alternate',
          }}
        />
      ))}
    </div>
  )
}

export function Stars() {
  return <div className="stars pointer-events-none absolute inset-0" aria-hidden />
}

/**
 * Three layers of rolling hills. Each layer moves at a different speed while the
 * section scrolls past, which gives the parallax depth.
 */
export function Hills({ className = '', tone = 'night' }: { className?: string; tone?: 'night' | 'dawn' }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const back = useTransform(scrollYProgress, [0, 1], [40, -20])
  const mid = useTransform(scrollYProgress, [0, 1], [70, -10])
  const front = useTransform(scrollYProgress, [0, 1], [100, 0])

  const colors =
    tone === 'night'
      ? ['#3a4cc4', '#25318f', '#151c5e']
      : ['#8ea4f4', '#5b74e8', '#2c3aa8']

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-x-0 bottom-0 ${className}`} aria-hidden>
      <motion.svg style={{ y: back }} className="absolute bottom-0 h-full w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill={colors[0]}
          fillOpacity="0.75"
          d="M0 210 C 160 150 300 120 470 160 C 640 200 760 110 930 120 C 1100 130 1240 190 1440 150 L1440 320 L0 320 Z"
        />
      </motion.svg>
      <motion.svg style={{ y: mid }} className="absolute bottom-0 h-full w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill={colors[1]}
          fillOpacity="0.9"
          d="M0 250 C 200 200 330 230 520 210 C 720 190 820 250 1010 230 C 1190 212 1300 180 1440 200 L1440 320 L0 320 Z"
        />
      </motion.svg>
      <motion.svg style={{ y: front }} className="absolute bottom-0 h-full w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill={colors[2]}
          d="M0 290 C 240 260 420 300 640 280 C 860 260 1000 300 1200 285 C 1320 276 1390 280 1440 284 L1440 320 L0 320 Z"
        />
      </motion.svg>
    </div>
  )
}
