import type { Metadata } from 'next'
import { Check, Minus, UsersRound } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import FaqList from '@/components/shared/FaqList'
import CtaBand from '@/components/shared/CtaBand'
import PricingPlans from './PricingPlans'
import { ButtonLink } from '@/components/ui/button'
import pricing from '@/content/pricing.json'
import type { PricingPlan } from '@/types'
import { getBaseUrl } from '@/lib/content'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple per-employee pricing for Arisotech HRMS. Payroll, attendance, leave and the employee app are included in every plan.',
  alternates: { canonical: `${getBaseUrl()}/pricing/` },
}

export default function PricingPage() {
  const plans = pricing.plans as PricingPlan[]

  return (
    <>
      <PageHeader
        title="Pay per employee. Payroll is in every plan."
        intro="No separate charge for compliance, the employee app or payslips. Pick the plan that matches how your teams work."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="mb-6 flex items-start gap-3 rounded-panel border border-paid/30 bg-paid-wash px-5 py-4 text-ink sm:items-center">
          <UsersRound className="mt-0.5 h-5 w-5 shrink-0 text-paid sm:mt-0" aria-hidden />
          <span>
            <strong className="font-bold">No 50-employee minimum.</strong> Pay only for the people you have, from{' '}
            {pricing.minimumEmployees} employees.
          </span>
        </p>
        <PricingPlans
          plans={plans}
          currency={pricing.currency}
          annualDiscountPercent={pricing.annualDiscountPercent}
          minimumEmployees={pricing.minimumEmployees}
        />
      </section>

      <section aria-labelledby="data-callout" className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="sky-dawn flex flex-col gap-6 rounded-slip p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="rounded-chip bg-white px-2 py-0.5 text-xs font-bold text-brand-strong">New</span>
            <h2 id="data-callout" className="mt-3 text-2xl font-bold text-ink sm:text-3xl">
              Your data, your control
            </h2>
            <p className="mt-2 max-w-2xl text-ink">
              Nightly copies to your own S3 or Google Drive from Growth. On Enterprise, use a dedicated database in your
              region or run Arisotech on your own servers.
            </p>
          </div>
          <ButtonLink href="/#your-data" size="lg" className="shrink-0">
            See the options
          </ButtonLink>
        </div>
      </section>

      <section aria-labelledby="compare" className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <h2 id="compare" className="text-3xl font-bold sm:text-4xl">
          Compare plans
        </h2>
        <div className="mt-8 overflow-x-auto rounded-panel border border-line bg-surface">
          <table className="w-full min-w-[40rem] text-left">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="px-5 py-4 font-semibold text-muted">
                  Feature
                </th>
                {plans.map((p) => (
                  <th key={p.id} scope="col" className="px-5 py-4 text-center font-display text-lg font-bold">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricing.comparison.map((row) => (
                <tr key={row.feature} className="border-b border-line/70 last:border-0">
                  <th scope="row" className="px-5 py-3.5 font-medium">
                    {row.feature}
                  </th>
                  {row.plans.map((has, i) => (
                    <td key={i} className="px-5 py-3.5 text-center">
                      {has ? (
                        <Check className="mx-auto h-5 w-5 text-paid" aria-label="Included" />
                      ) : (
                        <Minus className="mx-auto h-5 w-5 text-line-strong" aria-label="Not included" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FaqList faqs={pricing.faqs} title="Pricing questions" />
      <CtaBand title="Not sure which plan fits?" text="Tell us your headcount and how you run payroll today. We will recommend a plan and show it working." />
    </>
  )
}
