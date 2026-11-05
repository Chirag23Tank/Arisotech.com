import type { Metadata } from 'next'
import Image from 'next/image'
import { Github, Linkedin } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import CtaBand from '@/components/shared/CtaBand'
import teamData from '@/content/team.json'
import type { TeamMember } from '@/types'
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

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
}

export default function AboutPage() {
  const team = [...(teamData.teamMembers as TeamMember[])].sort((a, b) => a.order - b.order)

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

      <section aria-labelledby="team" className="border-y border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 id="team" className="text-3xl font-bold sm:text-4xl">
            The team
          </h2>
          <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <li key={m.id} className="flex gap-4">
                {m.image ? (
                  <Image src={m.image} alt="" width={64} height={64} className="h-16 w-16 shrink-0 rounded-full object-cover" />
                ) : (
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-wash font-display text-xl font-bold text-brand-strong"
                    aria-hidden
                  >
                    {initials(m.name)}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold">{m.name}</h3>
                  <p className="text-brand">{m.role}</p>
                  {m.bio && <p className="mt-2 text-sm text-ink-soft leading-relaxed">{m.bio}</p>}
                  <div className="mt-2 flex gap-3">
                    {m.linkedin && (
                      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`} className="text-muted hover:text-brand">
                        <Linkedin className="h-5 w-5" aria-hidden />
                      </a>
                    )}
                    {m.github && (
                      <a href={m.github} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on GitHub`} className="text-muted hover:text-brand">
                        <Github className="h-5 w-5" aria-hidden />
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="pt-20">
        <CtaBand title="Talk to the people who build it" text="Book a demo and you will speak with someone from our team, not a script." />
      </div>
    </>
  )
}
