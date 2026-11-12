import type { Metadata } from 'next'
import PageHeader from '@/components/shared/PageHeader'
import CtaBand from '@/components/shared/CtaBand'
import { getBaseUrl } from '@/lib/content'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'About',
  description: 'Arisotech builds HR and payroll software for growing Indian companies, from Jaipur.',
  alternates: { canonical: `${getBaseUrl()}/about/` },
}

const beliefs = [
  { title: 'Payroll has to be right', text: 'A wrong payslip costs trust that no feature can earn back. Accuracy comes before everything else we ship.' },
  { title: 'HR should not need IT', text: 'Policies, salary structures and approval chains are settings an HR manager can change, not tickets.' },
  { title: 'Built for Indian rules', text: 'State-wise professional tax, PF and ESI, the old and new tax regimes. We build for how companies here actually pay people.' },
  { title: 'Support from people who know payroll', text: 'When something looks off on the 28th, you talk to someone who understands the problem.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="We build the HR system we wished our clients had"
        intro="Arisotech started in Jaipur building software for businesses. Again and again we saw HR teams lose the last week of every month to spreadsheets, attendance exports and statutory deadlines. Arisotech HRMS is our answer."
      />

      <section aria-labelledby="beliefs" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 id="beliefs" className="text-3xl font-bold sm:text-4xl">
          What we believe
        </h2>
        <ul className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {beliefs.map((b) => (
            <li key={b.title} className="border-t-2 border-ink pt-5">
              <h3 className="text-xl font-bold">{b.title}</h3>
              <p className="mt-2 text-ink-soft leading-relaxed">{b.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Talk to the people who build it" text="Book a demo and you will speak with someone from our team, not a script." />
    </>
  )
}
