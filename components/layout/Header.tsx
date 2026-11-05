'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import Logo from './Logo'
import { ButtonLink } from '@/components/ui/button'
import { moduleGroups, modulesInGroup } from '@/lib/content'
import { groupIcons, moduleIcons } from '@/components/product/icons'
import { cn } from '@/lib/utils'

const links = [
  { name: 'Pricing', href: '/pricing/' },
  { name: 'Solutions', href: '/solutions/' },
  { name: 'Resources', href: '/blog/' },
  { name: 'About', href: '/about/' },
]

const groupBlurb: Record<string, string> = {
  people: 'Records, documents and the app your employees use',
  pay: 'Salaries, statutory deductions and reimbursements',
  time: 'Clock-ins, shifts, leave and holidays',
  talent: 'Hiring, goals and reviews',
}

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const [group, setGroup] = useState(moduleGroups[0].id)
  const current = moduleGroups.find((g) => g.id === group)!

  return (
    <div className="grid grid-cols-[15rem_1fr_19rem]">
      <div className="border-r border-line py-8 pr-6">
        <p className="mb-3 px-3 text-sm font-semibold text-muted">Product</p>
        <ul className="space-y-1">
          {moduleGroups.map((g) => {
            const Icon = groupIcons[g.id]
            const active = g.id === group
            return (
              <li key={g.id}>
                <button
                  type="button"
                  onMouseEnter={() => setGroup(g.id)}
                  onFocus={() => setGroup(g.id)}
                  onClick={() => setGroup(g.id)}
                  aria-pressed={active}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left font-semibold transition-colors',
                    active ? 'bg-brand-wash text-ink' : 'text-ink-soft hover:bg-paper'
                  )}
                >
                  <span className={cn('flex h-8 w-8 items-center justify-center rounded-md', active ? 'bg-brand text-white' : 'bg-paper text-brand')}>
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {g.name}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="px-8 py-8">
        <Link href="/features/" onClick={onNavigate} className="group block rounded-panel sky-dusk px-5 py-4 text-white">
          <span className="flex items-center gap-1 font-display text-lg font-bold">
            {current.name} <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
          <span className="text-white/80">{groupBlurb[current.id]}</span>
        </Link>
        <AnimatePresence mode="wait">
          <motion.ul
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2"
          >
            {modulesInGroup(current.id).map((m) => {
              const Icon = moduleIcons[m.slug]
              return (
                <li key={m.slug}>
                  <Link href={`/features/${m.slug}/`} onClick={onNavigate} className="flex gap-3 rounded-lg p-2.5 hover:bg-paper">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-wash text-brand">
                      <Icon className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{m.name}</span>
                      <span className="block text-sm leading-snug text-muted">{m.summary}</span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </motion.ul>
        </AnimatePresence>
      </div>

      <Link
        href="/contact/"
        onClick={onNavigate}
        className="group relative flex flex-col justify-end overflow-hidden sky-hero p-6 text-white"
      >
        <span className="stars absolute inset-0" aria-hidden />
        <span className="relative text-sm font-semibold text-white/80">Live demo</span>
        <span className="relative mt-1 font-display text-2xl font-bold leading-tight">See a full payroll month in 30 minutes</span>
        <span className="relative mt-3 inline-flex items-center gap-1 font-semibold">
          Book a demo <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </Link>
    </div>
  )
}

function MobileProducts({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="space-y-5 pt-3">
      {moduleGroups.map((g) => (
        <div key={g.id}>
          <p className="mb-2 text-sm font-semibold text-muted">{g.name}</p>
          <ul className="space-y-1">
            {modulesInGroup(g.id).map((m) => {
              const Icon = moduleIcons[m.slug]
              return (
                <li key={m.slug}>
                  <Link href={`/features/${m.slug}/`} onClick={onNavigate} className="flex items-center gap-3 rounded-lg py-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-wash text-brand">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="font-semibold">{m.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function Header() {
  const [productOpen, setProductOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setProductOpen(false)
        setMobileOpen(false)
      }
    }
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setProductOpen(false)
    }
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const close = () => {
    setProductOpen(false)
    setMobileOpen(false)
  }
  const hoverOpenedAt = useRef(0)
  const openSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setProductOpen((open) => {
      if (!open) hoverOpenedAt.current = Date.now()
      return true
    })
  }
  // A click right after hover-open should not immediately close the menu.
  const onProductClick = () => {
    if (Date.now() - hoverOpenedAt.current < 400) return
    setProductOpen((v) => !v)
  }
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setProductOpen(false), 150)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow',
        scrolled ? 'border-line shadow-[0_8px_24px_-16px_rgba(16,22,61,0.35)]' : 'border-transparent'
      )}
    >
      <div ref={menuRef} className="relative" onMouseLeave={closeSoon}>
        <nav className="mx-auto flex max-w-7xl items-center gap-8 px-4 py-4 sm:px-6 lg:px-8" aria-label="Main">
          <Logo />

          <div className="hidden items-center gap-1 lg:flex">
            <button
              type="button"
              aria-expanded={productOpen}
              aria-controls="product-menu"
              onMouseEnter={openSoon}
              onClick={onProductClick}
              className={cn(
                'inline-flex items-center gap-1 rounded-md px-3 py-2 text-[0.95rem] font-medium hover:bg-paper',
                productOpen ? 'text-brand' : 'text-ink'
              )}
            >
              Product
              <ChevronDown className={cn('h-4 w-4 transition-transform', productOpen && 'rotate-180')} aria-hidden />
            </button>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onMouseEnter={closeSoon}
                className="rounded-md px-3 py-2 text-[0.95rem] font-medium text-ink hover:bg-paper"
              >
                {l.name}
              </Link>
            ))}
          </div>

          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <ButtonLink href="/contact/?type=sales" variant="ghost" size="sm">
              Talk to sales
            </ButtonLink>
            <ButtonLink href="/contact/" size="sm">
              Book a demo
            </ButtonLink>
          </div>

          <button
            type="button"
            className="-m-2 ml-auto rounded-md p-2 text-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
            {mobileOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </nav>

        <AnimatePresence>
          {productOpen && (
            <motion.div
              id="product-menu"
              onMouseEnter={openSoon}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-[0_24px_48px_-24px_rgba(16,22,61,0.35)] lg:block"
            >
              <div className="mx-auto max-w-7xl pl-8">
                <MegaMenu onNavigate={close} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto px-4 pb-8 pt-4 sm:px-6" data-lenis-prevent>
              <details className="group border-b border-line pb-4">
                <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-lg font-semibold">
                  Product
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <MobileProducts onNavigate={close} />
              </details>
              <ul className="mt-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={close} className="block border-b border-line py-3 text-lg font-semibold">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid gap-3">
                <ButtonLink href="/contact/" size="lg">
                  Book a demo
                </ButtonLink>
                <ButtonLink href="/contact/?type=sales" variant="secondary" size="lg">
                  Talk to sales
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
