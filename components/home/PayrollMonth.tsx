'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'

const days = [
  { day: '1', when: 'This month', title: 'Attendance opens', text: 'Clock-ins, leave and shift changes start counting toward this month.' },
  { day: '25', when: 'This month', title: 'Inputs close', text: 'Payable days, overtime and approved expense claims are pulled into payroll.' },
  { day: '27', when: 'This month', title: 'You review', text: 'Every difference from last month is listed with the reason next to it.' },
  { day: '28', when: 'This month', title: 'Lock and publish', text: 'Payslips go to the employee app and the bank transfer file is generated.' },
  { day: '7', when: 'Next month', title: 'TDS deposit', text: 'The TDS amount and challan details are ready from the locked run.' },
  { day: '15', when: 'Next month', title: 'PF and ESI due', text: 'The PF ECR and ESI contribution files are ready to upload.' },
]

export default function PayrollMonth() {
  const track = useRef<HTMLOListElement>(null)
  // The line along the top of the timeline fills in as you scroll through it.
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 0.85', 'end 0.55'] })
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section aria-labelledby="month-heading" className="border-y border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-end">
          <h2 id="month-heading" className="text-4xl font-bold sm:text-5xl sm:leading-[1.05]">
            A payroll month, with the busywork taken out
          </h2>
          <p className="text-lg text-ink-soft lg:pb-1">
            The dates below are a typical cycle. You set your own cut-off and pay dates, and the system keeps track of the
            statutory deadlines that follow.
          </p>
        </Reveal>

        <ol ref={track} className="relative mt-16 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-0">
          <span className="absolute inset-x-0 top-0 hidden h-0.5 bg-line lg:block" aria-hidden />
          <motion.span
            style={{ scaleX: fill }}
            className="absolute inset-x-0 top-0 hidden h-0.5 origin-left bg-brand lg:block"
            aria-hidden
          />
          {days.map((d, i) => (
            <li
              key={d.title}
              className="group relative border-t-2 border-line py-6 pr-4 lg:border-t-0 lg:border-r lg:border-r-line lg:px-5 lg:first:pl-0 lg:last:border-r-0"
            >
              <motion.span
                initial={{ scale: 0.4, opacity: 0.4 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-35% 0px' }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className={`absolute -top-[7px] left-0 h-3 w-3 rounded-full ring-4 ring-white ${i >= 4 ? 'bg-pending' : 'bg-brand'} lg:left-5 lg:group-first:left-0`}
                aria-hidden
              />
              <Reveal delay={i * 0.06}>
                <p className="text-sm font-medium text-muted">{d.when}</p>
                <p className="figures mt-1 font-display text-5xl font-extrabold leading-none text-ink">{d.day}</p>
                <h3 className="mt-4 text-lg font-bold">{d.title}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-soft">{d.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
