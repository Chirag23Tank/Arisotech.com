'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  BadgeIndianRupee,
  Bell,
  CalendarDays,
  ChevronRight,
  Clock,
  FileBarChart,
  Home,
  Receipt,
  Search,
  UserPlus,
  UsersRound,
} from 'lucide-react'
import PayrollRun from './PayrollRun'

const nav = [
  { Icon: Home, label: 'Home', active: true },
  { Icon: UsersRound, label: 'People' },
  { Icon: BadgeIndianRupee, label: 'Payroll' },
  { Icon: Clock, label: 'Time' },
  { Icon: CalendarDays, label: 'Leave' },
  { Icon: UserPlus, label: 'Hire' },
  { Icon: FileBarChart, label: 'Reports' },
]

const kpis = [
  { Icon: BadgeIndianRupee, label: 'March net pay', value: '₹54.5 L', note: 'for 142 employees' },
  { Icon: Clock, label: 'Present today', value: '94%', note: '133 of 142 clocked in' },
  { Icon: CalendarDays, label: 'Leave requests', value: '6', note: 'waiting for approval' },
  { Icon: UserPlus, label: 'Open roles', value: '4', note: '29 candidates in pipeline' },
]

// Payroll cost in lakh rupees: gross, reimbursements, employer contributions
const months = [
  { m: 'Oct', g: 55, r: 2.1, e: 5.2 },
  { m: 'Nov', g: 56, r: 2.6, e: 5.3 },
  { m: 'Dec', g: 58, r: 3.4, e: 5.5 },
  { m: 'Jan', g: 59.5, r: 2.2, e: 5.8 },
  { m: 'Feb', g: 61, r: 2.8, e: 5.9 },
  { m: 'Mar', g: 62.4, r: 3.1, e: 6.2 },
]

const actions = [
  { Icon: BadgeIndianRupee, label: 'Run March payroll' },
  { Icon: CalendarDays, label: 'Approve leave', count: 6 },
  { Icon: Receipt, label: 'Approve expenses', count: 4 },
  { Icon: UserPlus, label: 'Add employee' },
  { Icon: FileBarChart, label: 'Download PF ECR' },
]

function CostChart() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const max = 80
  const h = 140
  const bw = 26
  const gap = 22

  return (
    <svg ref={ref} viewBox={`0 0 ${months.length * (bw + gap)} ${h + 22}`} className="h-auto w-full" role="img" aria-label="Total payroll cost has grown from 62 lakh rupees in October to 72 lakh in March">
      {[0, 0.5, 1].map((t) => (
        <line key={t} x1="0" x2="100%" y1={h - t * h * 0.9} y2={h - t * h * 0.9} stroke="var(--color-line)" strokeDasharray="3 4" />
      ))}
      {months.map((d, i) => {
        const x = i * (bw + gap) + gap / 2
        const parts = [
          { v: d.g, c: 'var(--color-indigo)' },
          { v: d.e, c: 'var(--color-dusk)' },
          { v: d.r, c: '#b9c6fa' },
        ]
        let y = h
        return (
          <g key={d.m}>
            {parts.map((p, j) => {
              const ph = (p.v / max) * h
              y -= ph
              return (
                <motion.rect
                  key={j}
                  x={x}
                  width={bw}
                  rx={j === parts.length - 1 ? 4 : 0}
                  fill={p.c}
                  initial={{ y: h, height: 0 }}
                  animate={inView ? { y, height: ph } : { y: h, height: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
              )
            })}
            <text x={x + bw / 2} y={h + 16} textAnchor="middle" fontSize="11" fill="var(--color-muted)">
              {d.m}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/** The product dashboard shown under the hero. Sample data. */
export default function DashboardMock() {
  return (
    <div className="overflow-hidden rounded-[18px] border border-white/40 bg-white text-left text-sm text-ink shadow-[0_50px_100px_-30px_rgba(8,12,46,0.6)]">
      <div className="flex items-center gap-3 bg-midnight px-4 py-2.5 text-white">
        <span className="font-sans text-base font-bold text-blue-300">A</span>
        <span className="hidden font-semibold sm:inline">Mehta Textiles Pvt Ltd</span>
        <span className="mx-auto flex w-full max-w-xs items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-muted">
          <Search className="h-3.5 w-3.5" aria-hidden /> Search people, payslips, policies
        </span>
        <Bell className="h-4 w-4 text-white/80" aria-hidden />
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-dawn text-xs font-bold text-ink">SA</span>
      </div>

      <div className="flex">
        <nav className="hidden w-[4.5rem] shrink-0 flex-col items-center gap-1 bg-midnight py-3 md:flex" aria-hidden>
          {nav.map(({ Icon, label, active }) => (
            <span key={label} className={`flex w-14 flex-col items-center gap-1 rounded-lg py-2 text-[10px] ${active ? 'bg-white/15 text-white' : 'text-white/60'}`}>
              <Icon className="h-4 w-4" />
              {label}
            </span>
          ))}
        </nav>

        <div className="min-w-0 flex-1 bg-paper p-3 sm:p-4">
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {kpis.map(({ Icon, label, value, note }) => (
              <li key={label} className="flex items-center gap-3 rounded-panel border border-line bg-white p-3">
                <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-wash text-brand sm:flex">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xs text-muted">{label}</span>
                  <span className="figures block font-display text-lg font-bold">{value}</span>
                  <span className="block truncate text-xs text-muted">{note}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1.4fr_1fr_0.9fr]">
            <section className="rounded-panel border border-line bg-white p-4">
              <PayrollRun />
            </section>

            <section className="hidden rounded-panel border border-line bg-white p-4 sm:block">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold">Payroll cost</p>
                <p className="text-xs text-muted">Lakh ₹, last 6 months</p>
              </div>
              <div className="mt-3">
                <CostChart />
              </div>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-indigo" />Gross pay</li>
                <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-dusk" />Employer PF and ESI</li>
                <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#b9c6fa]" />Reimbursements</li>
              </ul>
            </section>

            <section className="hidden rounded-panel border border-line bg-white p-4 lg:block">
              <p className="font-semibold">Quick actions</p>
              <ul className="mt-2 divide-y divide-line/70">
                {actions.map(({ Icon, label, count }) => (
                  <li key={label} className="flex items-center gap-2.5 py-2.5">
                    <Icon className="h-4 w-4 text-brand" aria-hidden />
                    <span className="flex-1">{label}</span>
                    {count && <span className="rounded-full bg-pending-wash px-2 text-xs font-semibold text-pending">{count}</span>}
                    <ChevronRight className="h-4 w-4 text-muted" aria-hidden />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
