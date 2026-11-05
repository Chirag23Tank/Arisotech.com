import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/shared/PageHeader'
import CtaBand from '@/components/shared/CtaBand'
import { getBaseUrl, moduleGroups, modulesInGroup } from '@/lib/content'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Core HR, payroll, attendance, leave, expenses, recruitment, performance and an employee app, all working from one employee record.',
  alternates: { canonical: `${getBaseUrl()}/features/` },
}

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        title="Everything HR runs on, in one system"
        intro="Start with payroll, attendance and leave. Add hiring and performance when you need them. Every module shares the same employee record."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {moduleGroups.map((group) => (
          <section
            key={group.id}
            aria-labelledby={`group-${group.id}`}
            className="grid gap-6 border-t border-line py-10 first:border-t-0 first:pt-0 lg:grid-cols-[14rem_1fr] lg:gap-12"
          >
            <h2 id={`group-${group.id}`} className="text-2xl font-bold">
              {group.name}
            </h2>
            <ul className="grid gap-x-12 gap-y-10 md:grid-cols-2">
              {modulesInGroup(group.id).map((m) => (
                <li key={m.slug}>
                  <h3 className="text-xl font-bold">
                    <Link href={`/features/${m.slug}/`} className="hover:text-brand">
                      {m.name}
                    </Link>
                  </h3>
                  <p className="mt-1.5 text-ink-soft">{m.summary}</p>
                  <ul className="mt-4 space-y-1.5 text-[0.95rem]">
                    {m.capabilities.slice(0, 4).map((c) => (
                      <li key={c.title} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                        {c.title}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/features/${m.slug}/`} className="mt-4 inline-block font-semibold text-brand hover:underline">
                    More about {m.name.toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <CtaBand />
    </>
  )
}
