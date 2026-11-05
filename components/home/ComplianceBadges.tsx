import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'

const items = [
  { short: 'PF', name: 'Provident fund', note: 'ECR file each month' },
  { short: 'ESI', name: 'Employee state insurance', note: 'Contributions and returns' },
  { short: 'PT', name: 'Professional tax', note: 'State-wise slabs' },
  { short: 'LWF', name: 'Labour welfare fund', note: 'Where it applies' },
  { short: 'TDS', name: 'Income tax', note: 'Old and new regime, Form 16' },
  { short: '₹', name: 'Gratuity', note: 'In full-and-final settlement' },
]

export default function ComplianceBadges() {
  return (
    <section aria-labelledby="compliance-heading" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-center">
        <Reveal>
          <h2 id="compliance-heading" className="text-4xl font-bold sm:text-5xl sm:leading-[1.05]">
            Statutory rules are part of every payroll run
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            Deductions, employer contributions and filing data are calculated in the same run that produces payslips, so
            compliance is never a separate month-end job.
          </p>
        </Reveal>
        <Stagger className="grid grid-cols-2 overflow-hidden rounded-panel border border-line bg-line [gap:1px] sm:grid-cols-3" gap={0.07}>
          {items.map((i) => (
            <StaggerItem key={i.name} className="flex flex-col items-center bg-surface px-4 py-8 text-center">
              <span className="orb flex h-20 w-20 items-center justify-center rounded-full font-display text-xl font-extrabold text-white [animation:none]">
                {i.short}
              </span>
              <p className="mt-4 font-semibold">{i.name}</p>
              <p className="mt-1 text-sm text-muted">{i.note}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
