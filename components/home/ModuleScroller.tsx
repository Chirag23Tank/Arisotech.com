'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ModulePreview from '@/components/product/ModulePreview'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'
import type { ProductModule } from '@/types'
import { cn } from '@/lib/utils'

const skies = ['sky-dusk', 'sky-hero', 'sky-dawn', 'sky-dusk', 'sky-hero', 'sky-dawn']

/**
 * A sticky list of modules on the left; panels scroll past on the right and the
 * list highlights whichever panel is in the middle of the screen.
 */
export default function ModuleScroller({ modules }: { modules: ProductModule[] }) {
  const [active, setActive] = useState(0)
  const panels = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    panels.current.forEach((p) => p && observer.observe(p))
    return () => observer.disconnect()
  }, [])

  return (
    <section aria-labelledby="platform-heading" className="border-t border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <Reveal className="max-w-3xl">
          <h2 id="platform-heading" className="text-4xl font-bold sm:text-6xl sm:leading-[1.05]">
            One platform for people, pay and time
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[17rem_1fr] lg:gap-12">
          <nav aria-label="Modules" className="hidden lg:block">
            <ol className="sticky top-32 border-t border-line">
              {modules.map((m, i) => (
                <li key={m.slug} className="relative border-b border-line">
                  <a
                    href={`#panel-${m.slug}`}
                    aria-current={i === active ? 'true' : undefined}
                    className={cn(
                      'flex items-center justify-between py-4 pr-2 transition-colors',
                      i === active ? 'font-semibold text-ink' : 'text-muted hover:text-ink'
                    )}
                  >
                    {m.name}
                    <span className={cn('h-1.5 w-1.5 rounded-full', i === active ? 'bg-brand' : 'bg-line-strong')} aria-hidden />
                  </a>
                  {i === active && (
                    <motion.span
                      layoutId="module-underline"
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-brand"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0 space-y-8">
            {modules.map((m, i) => (
              <article
                key={m.slug}
                id={`panel-${m.slug}`}
                data-index={i}
                ref={(el) => {
                  panels.current[i] = el
                }}
                className={cn('relative scroll-mt-32 overflow-hidden rounded-slip p-6 text-white sm:p-10', skies[i % skies.length])}
              >
                <Reveal>
                  <p className="font-display font-bold text-blue-100">{m.name}</p>
                  <h3 className="mt-2 max-w-2xl text-3xl font-bold sm:text-4xl">{m.headline}</h3>
                  <p className="mt-4 max-w-2xl text-lg text-white/85">{m.intro}</p>
                </Reveal>
                <Reveal delay={0.1} className="mt-8 max-w-xl">
                  <ModulePreview slug={m.slug} />
                </Reveal>
                <div className="mt-8">
                  <ButtonLink href={`/features/${m.slug}/`} variant="inverse">
                    Learn more about {m.name.toLowerCase()}
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
