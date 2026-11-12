'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import type { PricingPlan } from '@/types'
import { cn, inr } from '@/lib/utils'

export default function PricingPlans({
  plans,
  currency,
  annualDiscountPercent,
  minimumEmployees,
}: {
  plans: PricingPlan[]
  currency: string
  annualDiscountPercent: number
  minimumEmployees: number
}) {
  const [annual, setAnnual] = useState(true)
  const [headcount, setHeadcount] = useState(50)

  const billable = Math.max(headcount || 0, minimumEmployees)
  const rate = (base: number) => (annual ? Math.round(base * (1 - annualDiscountPercent / 100)) : base)

  return (
    <div>
      <div className="flex flex-col gap-6 rounded-panel border border-line bg-surface p-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <label htmlFor="headcount" className="block font-semibold">
            How many employees do you have?
          </label>
          <div className="mt-2 flex items-center gap-4">
            <input
              id="headcount"
              type="range"
              min={minimumEmployees}
              max={1000}
              step={5}
              value={Math.min(Math.max(headcount, minimumEmployees), 1000)}
              onChange={(e) => setHeadcount(Number(e.target.value))}
              className="w-48 accent-brand sm:w-64"
              aria-describedby="headcount-note"
            />
            <input
              type="number"
              inputMode="numeric"
              min={1}
              aria-label="Employees"
              step={1}
              value={headcount}
              onChange={(e) => setHeadcount(Math.round(Number(e.target.value)))}
              className="figures h-10 w-24 rounded-lg border border-line-strong px-3 font-semibold"
            />
          </div>
          <p id="headcount-note" className="mt-2 text-sm text-muted">
            Billing starts at {minimumEmployees} employees.
          </p>
        </div>

        <fieldset>
          <legend className="sr-only">Billing period</legend>
          <div className="inline-flex rounded-lg border border-line-strong p-1">
            {[
              { v: false, label: 'Monthly' },
              { v: true, label: `Yearly, save ${annualDiscountPercent}%` },
            ].map((o) => (
              <label
                key={o.label}
                className={cn(
                  'cursor-pointer rounded-md px-4 py-2 text-sm font-semibold has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand',
                  annual === o.v ? 'bg-ink text-white' : 'text-ink-soft hover:text-ink'
                )}
              >
                <input type="radio" name="billing" className="sr-only" checked={annual === o.v} onChange={() => setAnnual(o.v)} />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <ul className="mt-8 grid gap-6 lg:grid-cols-3">
        {plans.map((p) => {
          const perHead = p.pricePerEmployee ? rate(p.pricePerEmployee) : null
          return (
            <li
              key={p.id}
              className={cn(
                'flex flex-col rounded-slip border bg-surface p-7',
                p.highlight ? 'border-brand ring-1 ring-brand' : 'border-line'
              )}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{p.name}</h2>
                {p.highlight && <span className="rounded-chip bg-brand-wash px-2 py-1 text-xs font-semibold text-brand-strong">Recommended</span>}
              </div>
              <p className="mt-1 text-ink-soft">{p.for}</p>

              <div className="mt-6 min-h-[6.5rem] border-y border-line py-5">
                {perHead ? (
                  <>
                    <p className="figures">
                      <span className="font-display text-4xl font-extrabold">
                        {currency}
                        {inr(perHead)}
                      </span>
                      <span className="text-muted"> per employee a month</span>
                    </p>
                    <p className="figures mt-1.5 text-sm text-ink-soft" aria-live="polite">
                      About {currency}
                      {inr(perHead * billable)} a month for {billable} employees{annual ? ', billed yearly' : ''}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-display text-4xl font-extrabold">Custom</p>
                    <p className="mt-1.5 text-sm text-ink-soft">Priced for your entities and workflows</p>
                  </>
                )}
              </div>

              <ul className="mt-6 flex-1 space-y-2.5">
                {p.includes.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-paid" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>

              <ButtonLink
                href={p.pricePerEmployee ? `/contact/?type=trial&plan=${p.id}` : '/contact/?type=sales'}
                variant={p.highlight ? 'primary' : 'secondary'}
                size="lg"
                className="mt-8 w-full"
              >
                {p.cta}
              </ButtonLink>
            </li>
          )
        })}
      </ul>
      <p className="mt-4 text-sm text-muted">Prices exclude GST.</p>
    </div>
  )
}
