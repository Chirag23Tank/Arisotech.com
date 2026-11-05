import type { Metadata } from 'next'
import PageHeader from '@/components/shared/PageHeader'
import CtaBand from '@/components/shared/CtaBand'
import { getBaseUrl } from '@/lib/content'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Practical guides on Indian payroll, statutory compliance, leave policies and running HR in a growing company.',
  alternates: { canonical: `${getBaseUrl()}/blog/` },
}

// Planned guides. Add a `href` once an article is published and it becomes a link.
const guides: { topic: string; title: string; text: string; href?: string }[] = [
  { topic: 'Payroll', title: 'Your first payroll run: a checklist', text: 'What to collect before you pay salaries for the first time, from bank details to PF registration.' },
  { topic: 'Compliance', title: 'Professional tax, state by state', text: 'Which states levy PT, how the slabs work and when it is due.' },
  { topic: 'Compliance', title: 'PF and ESI for small employers', text: 'When registration becomes mandatory and how monthly contributions are calculated.' },
  { topic: 'Policy', title: 'Writing a leave policy people can follow', text: 'Accrual, carry-forward and sandwich rules explained, with a template.' },
  { topic: 'Tax', title: 'Old or new tax regime: helping employees choose', text: 'How TDS changes with each regime and what HR needs to collect.' },
  { topic: 'Exits', title: 'Full-and-final settlement, step by step', text: 'Leave encashment, gratuity, notice recovery and the timelines to meet.' },
]

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        title="Guides for the people who run HR and payroll"
        intro="Plain explanations of Indian payroll and compliance, written for HR managers and founders rather than lawyers."
      />

      <section aria-labelledby="guides" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 id="guides" className="sr-only">
          Guides
        </h2>
        <ul className="divide-y divide-line border-y border-line">
          {guides.map((g) => (
            <li key={g.title} className="grid gap-2 py-7 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-8">
              <p className="text-sm font-semibold text-brand">{g.topic}</p>
              <div>
                <h3 className="text-xl font-bold">{g.href ? <a href={g.href} className="hover:text-brand">{g.title}</a> : g.title}</h3>
                <p className="mt-1.5 text-ink-soft">{g.text}</p>
              </div>
              {!g.href && <p className="text-sm text-muted">Publishing soon</p>}
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Rather see it than read about it?" />
    </>
  )
}
