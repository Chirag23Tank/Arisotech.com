import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/shared/PageHeader'
import CtaBand from '@/components/shared/CtaBand'
import { getBaseUrl } from '@/lib/content'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Solutions',
  description: 'How Arisotech HRMS fits startups, growing companies and multi-location businesses in IT services, manufacturing, retail and healthcare.',
  alternates: { canonical: `${getBaseUrl()}/solutions/` },
}

const sizes = [
  {
    id: 'startups',
    name: 'Startups, 10 to 50 people',
    problem: 'Payroll lives in a spreadsheet that one person understands, and compliance is something you check before an audit.',
    fit: ['Move the salary sheet into structured payroll in a week', 'PF, ESI and PT set up correctly from the first run', 'Offer letters and onboarding without a full-time HR person'],
    modules: ['payroll', 'leave', 'core-hr'],
  },
  {
    id: 'growing',
    name: 'Growing companies, 50 to 500',
    problem: 'Managers approve leave on WhatsApp, attendance comes from three sources, and month-end takes a week.',
    fit: ['Approvals routed to the right manager automatically', 'Biometric, mobile and web clock-ins in one place', 'Payroll review that shows what changed and why'],
    modules: ['attendance', 'expenses', 'self-service'],
  },
  {
    id: 'multi-entity',
    name: 'Multi-location and multi-entity',
    problem: 'Each office follows different holiday lists, PT slabs and shift patterns, and consolidation is manual.',
    fit: ['State-wise professional tax and labour welfare fund', 'Separate legal entities with one HR team', 'Location-based policies and holiday calendars'],
    modules: ['payroll', 'attendance', 'performance'],
  },
]

const industries = [
  { name: 'IT and services', text: 'Hybrid attendance, project-based teams, frequent hiring and structured performance reviews.' },
  { name: 'Manufacturing', text: 'Rotating shifts, contract labour, overtime and biometric attendance on the shop floor.' },
  { name: 'Retail and distribution', text: 'Many small locations, field staff with geo-fenced clock-in, and high joiner and exit volume.' },
  { name: 'Healthcare', text: 'Round-the-clock rosters, night shift allowances and licence and document expiry tracking.' },
]

const names: Record<string, string> = {
  payroll: 'Payroll',
  leave: 'Leave',
  'core-hr': 'Core HR',
  attendance: 'Attendance',
  expenses: 'Expenses',
  'self-service': 'Employee app',
  performance: 'Performance',
}

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        title="The same product, set up for how your company works"
        intro="A 20-person startup and a 600-person manufacturer need different things from HR software. Here is where Arisotech helps each of them first."
      />

      <section aria-labelledby="by-size" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 id="by-size" className="text-3xl font-bold sm:text-4xl">
          By company stage
        </h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {sizes.map((s) => (
            <article key={s.id} id={s.id} className="grid gap-6 py-10 lg:grid-cols-[1fr_1fr_14rem] lg:gap-12">
              <div>
                <h3 className="text-2xl font-bold">{s.name}</h3>
                <p className="mt-3 text-ink-soft leading-relaxed">{s.problem}</p>
              </div>
              <ul className="space-y-2.5">
                {s.fit.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-paid" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <div>
                <p className="text-sm font-semibold text-muted">Start with</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {s.modules.map((m) => (
                    <li key={m}>
                      <Link
                        href={`/features/${m}/`}
                        className="inline-block rounded-full border border-line-strong bg-surface px-3 py-1.5 text-sm font-medium hover:border-ink"
                      >
                        {names[m]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="by-industry" className="border-t border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 id="by-industry" className="text-3xl font-bold sm:text-4xl">
            By industry
          </h2>
          <ul className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {industries.map((i) => (
              <li key={i.name} className="border-l-2 border-brand pl-5">
                <h3 className="text-xl font-bold">{i.name}</h3>
                <p className="mt-2 text-ink-soft leading-relaxed">{i.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
