'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { inr } from '@/lib/utils'

const rows = [
  { name: 'Ananya Rathore', role: 'Product designer', net: 68420 },
  { name: 'Vikram Shekhawat', role: 'Sales lead', net: 91150 },
  { name: 'Farah Khan', role: 'Support executive', net: 27880 },
  { name: 'Jatin Meena', role: 'Accountant', net: 42300 },
]

const STEP = 0.32
const START = 0.3

/** A month's payroll settling one stamp at a time. Plays when scrolled into view. */
export default function PayrollRun() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const totalDelay = START + rows.length * STEP + 0.3

  return (
    <div ref={ref} data-play={inView ? 'true' : 'false'} aria-label="Sample payroll run for March: 142 employees paid, total net pay 54,54,310 rupees">
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
        <p className="font-semibold">March payroll run</p>
        <p className="figures text-sm text-muted">Pay date 31 Mar</p>
      </div>

      <ul className="divide-y divide-line/70" aria-hidden>
        {rows.map((r, i) => (
          <li
            key={r.name}
            className="run-row grid grid-cols-[1fr_auto_4rem] items-center gap-3 py-2.5"
            style={{ animationDelay: `${START + i * STEP - 0.2}s` }}
          >
            <div className="min-w-0">
              <p className="truncate font-semibold">{r.name}</p>
              <p className="truncate text-sm text-muted">{r.role}</p>
            </div>
            <p className="figures text-right font-semibold">₹{inr(r.net)}</p>
            <span
              className="run-stamp justify-self-end rounded-chip border-2 border-paid px-1.5 py-0.5 text-xs font-bold text-paid"
              style={{ animationDelay: `${START + i * STEP}s` }}
            >
              Paid
            </span>
          </li>
        ))}
      </ul>

      <div className="run-total mt-2 rounded-panel bg-paid-wash p-3.5" style={{ animationDelay: `${totalDelay}s` }} aria-hidden>
        <div className="figures flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-semibold text-paid">142 employees paid</p>
          <p className="font-display text-2xl font-bold text-ink">₹{inr(5454310)}</p>
        </div>
        <p className="mt-0.5 text-sm text-ink-soft">PF, ESI, PT and TDS calculated. Bank file ready.</p>
      </div>
    </div>
  )
}
