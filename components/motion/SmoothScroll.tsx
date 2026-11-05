'use client'

import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import Lenis from 'lenis'

/** Lenis smooth scrolling plus a site-wide reduced-motion policy for framer-motion. */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Offset anchor jumps so targets clear the sticky header.
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -110 } })
    return () => lenis.destroy()
  }, [])

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
