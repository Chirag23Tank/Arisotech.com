import { Database, Landmark, Rocket, SlidersHorizontal } from 'lucide-react'
import ModulePreview from '@/components/product/ModulePreview'
import { Reveal } from '@/components/motion/Reveal'
import { Clouds } from '@/components/art/Sky'

const left = [
  {
    Icon: Landmark,
    title: 'Built for Indian payroll',
    text: 'PF, ESI, professional tax, labour welfare fund and TDS are worked out by state and regime as you run payroll, not patched on afterwards.',
  },
  {
    Icon: Database,
    title: 'One record behind every module',
    text: 'Attendance, leave, expenses and payroll all read from the same employee record, so nothing has to be keyed in twice.',
  },
]

const right = [
  {
    Icon: Rocket,
    title: 'Live in weeks, with our team',
    text: 'We import your employee master and last salary register, then run a parallel payroll with you before you switch.',
  },
  {
    Icon: SlidersHorizontal,
    title: 'Made for HR, not IT',
    text: 'Leave rules, salary structures and approval chains are settings an HR manager can change without raising a ticket.',
  },
]

function Feature({ Icon, title, text, delay }: { Icon: typeof Landmark; title: string; text: string; delay: number }) {
  return (
    <Reveal delay={delay}>
      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-wash text-brand">
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <h3 className="mt-5 text-2xl font-bold">{title}</h3>
      <p className="mt-3 text-lg leading-relaxed text-ink-soft">{text}</p>
    </Reveal>
  )
}

export default function WhyArisotech() {
  return (
    <section aria-labelledby="why-heading" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <Reveal className="max-w-3xl">
        <h2 id="why-heading" className="text-4xl font-bold sm:text-6xl sm:leading-[1.05]">
          HR software built the way Indian payroll works
        </h2>
        <p className="mt-5 text-xl text-ink-soft">One system, set up with you, that your HR team can run on its own.</p>
      </Reveal>

      <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,26rem)_1fr] lg:gap-14">
        <div className="space-y-14">
          {left.map((f, i) => (
            <Feature key={f.title} {...f} delay={i * 0.1} />
          ))}
        </div>

        <Reveal className="sky-dawn relative order-first flex justify-center overflow-hidden rounded-slip px-6 py-12 lg:order-none lg:py-16">
          <Clouds />
          <div className="relative w-full max-w-sm">
            <ModulePreview slug="core-hr" />
          </div>
        </Reveal>

        <div className="space-y-14">
          {right.map((f, i) => (
            <Feature key={f.title} {...f} delay={0.15 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
