import type { Metadata } from 'next'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import DemoForm from '@/components/forms/DemoForm'
import siteConfig from '@/content/site-config.json'
import { getBaseUrl } from '@/lib/content'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Book a demo',
  description: 'See Arisotech HRMS with a sample company set up like yours. Book a 30-minute demo or start a free trial.',
  alternates: { canonical: `${getBaseUrl()}/contact/` },
}

const agenda = [
  'We set up a sample company with your headcount, locations and salary structure.',
  'You watch a month of attendance and leave flow into payroll.',
  'We lock the run and walk through payslips, bank file and statutory reports.',
  'You get a plan recommendation and a migration estimate.',
]

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-14 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.25fr] lg:gap-20 lg:px-8 lg:py-20">
      <div>
        <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl">See it with your own numbers</h1>
        <p className="mt-5 text-lg text-ink-soft">
          A demo takes about 30 minutes, over video call or at your office in Jaipur.
        </p>

        <h2 className="mt-10 text-lg font-bold">What happens in the demo</h2>
        <ol className="mt-4 space-y-4">
          {agenda.map((a, i) => (
            <li key={a} className="flex gap-4">
              <span className="figures flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-wash font-display font-bold text-brand-strong">
                {i + 1}
              </span>
              <p className="pt-1 text-ink-soft">{a}</p>
            </li>
          ))}
        </ol>

        <h2 className="mt-12 text-lg font-bold">Prefer to talk now?</h2>
        <ul className="mt-4 space-y-3">
          {siteConfig.phones.map((p) => (
            <li key={p.tel}>
              <a href={`tel:${p.tel}`} className="figures inline-flex items-center gap-3 hover:text-brand">
                <Phone className="h-5 w-5 text-brand" aria-hidden /> {p.display}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hi, I would like to know more about Arisotech HRMS.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 hover:text-brand"
            >
              <MessageCircle className="h-5 w-5 text-brand" aria-hidden /> Message us on WhatsApp
            </a>
          </li>
          <li>
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-3 hover:text-brand">
              <Mail className="h-5 w-5 text-brand" aria-hidden /> {siteConfig.email}
            </a>
          </li>
          <li className="inline-flex items-center gap-3 text-ink-soft">
            <MapPin className="h-5 w-5 text-brand" aria-hidden /> {siteConfig.address}
          </li>
        </ul>
      </div>

      <div className="rounded-slip border border-line bg-surface p-6 sm:p-8">
        <DemoForm />
      </div>
    </section>
  )
}
