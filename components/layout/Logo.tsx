'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/** The Arisotech wordmark, unchanged from the original site: Inter bold in blue-600. */
export default function Logo({ inverse = false }: { inverse?: boolean }) {
  const pathname = usePathname()

  // Next.js ignores a link to the page you are already on, so on the home page scroll up ourselves.
  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== '/' || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    history.replaceState(null, '', '/')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <Link href="/" onClick={onClick} className="-m-1.5 p-1.5 font-sans" aria-label="Arisotech home">
      <span className={`text-2xl font-bold ${inverse ? 'text-blue-400' : 'text-blue-600'}`}>Arisotech</span>
    </Link>
  )
}
