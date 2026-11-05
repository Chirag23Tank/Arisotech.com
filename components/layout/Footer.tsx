import Link from 'next/link'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
import Logo from './Logo'
import WordmarkBand from './WordmarkBand'
import siteConfig from '@/content/site-config.json'
import { modules } from '@/lib/content'

const company = [
  { name: 'About', href: '/about/' },
  { name: 'Pricing', href: '/pricing/' },
  { name: 'Solutions', href: '/solutions/' },
  { name: 'Resources', href: '/blog/' },
  { name: 'Book a demo', href: '/contact/' },
]

const social = [
  { name: 'LinkedIn', href: siteConfig.socialMedia.linkedin, Icon: Linkedin },
  { name: 'X (Twitter)', href: siteConfig.socialMedia.twitter, Icon: Twitter },
  { name: 'Facebook', href: siteConfig.socialMedia.facebook, Icon: Facebook },
].filter((s) => s.href)

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#151c5e] text-white/80">
      <WordmarkBand />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo inverse />
            <p className="mt-4 max-w-sm text-white/70">{siteConfig.description}</p>
            <ul className="mt-6 flex gap-4">
              {social.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="text-white/60 hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-base font-semibold text-white">Product</h2>
            <ul className="mt-4 space-y-2.5">
              {modules.map((m) => (
                <li key={m.slug}>
                  <Link href={`/features/${m.slug}/`} className="hover:text-white">
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-base font-semibold text-white">Company</h2>
            <ul className="mt-4 space-y-2.5">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-base font-semibold text-white">Contact</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
              {siteConfig.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="figures hover:text-white">
                    {p.display}
                  </a>
                </li>
              ))}
              <li className="text-white/60">{siteConfig.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-6 text-sm text-white/55">
          <p>
            © {year} {siteConfig.siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
