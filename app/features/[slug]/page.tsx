import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ModulePreview from '@/components/product/ModulePreview'
import FaqList from '@/components/shared/FaqList'
import CtaBand from '@/components/shared/CtaBand'
import { ButtonLink } from '@/components/ui/button'
import { Reveal, Stagger, StaggerItem, WordReveal } from '@/components/motion/Reveal'
import { Clouds, Stars } from '@/components/art/Sky'
import { getBaseUrl, getModule, moduleGroups, modules } from '@/lib/content'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const m = getModule(slug)
  if (!m) return { title: 'Feature not found' }
  return {
    title: `${m.name} software`,
    description: m.intro,
    alternates: { canonical: `${getBaseUrl()}/features/${m.slug}/` },
    openGraph: { title: m.headline, description: m.intro },
  }
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const m = getModule(slug)
  if (!m) notFound()

  const groupName = moduleGroups.find((g) => g.id === m.group)?.name
  const others = modules.filter((x) => x.slug !== m.slug)

  return (
    <>
      <section className="sky-hero relative overflow-hidden text-white">
        <Stars />
        <Clouds />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-28 lg:pt-16">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-white/70">
              <Link href="/features/" className="hover:text-white">
                Features
              </Link>
              <span aria-hidden> / </span>
              <span>{groupName}</span>
            </nav>
            <p className="mt-6 font-display text-lg font-bold text-blue-200">{m.name}</p>
            <h1 className="mt-2 text-4xl font-extrabold leading-[1.05] sm:text-[3.4rem]">
              <WordReveal text={m.headline} />
            </h1>
            <Reveal delay={0.4}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{m.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact/" size="lg">
                  Book a demo
                </ButtonLink>
                <ButtonLink href="/pricing/" variant="inverse" size="lg">
                  See pricing
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.3} className={m.slug === 'self-service' ? 'lg:justify-self-center' : ''}>
            <ModulePreview slug={m.slug} />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="capabilities" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 id="capabilities" className="text-3xl font-bold sm:text-4xl">
          What you get
        </h2>
        <Stagger className="mt-10 grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
          {m.capabilities.map((c) => (
            <StaggerItem key={c.title} className="bg-surface p-6">
              <h3 className="text-lg font-bold">{c.title}</h3>
              <p className="mt-2 text-ink-soft leading-relaxed">{c.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section aria-labelledby="how" className="border-y border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 id="how" className="text-3xl font-bold sm:text-4xl">
            How it works
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {m.workflow.map((s, i) => (
              <li key={s.title} className="border-t-2 border-ink pt-5">
                <p className="figures font-display text-4xl font-extrabold text-brand">{i + 1}</p>
                <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {m.faqs.length > 0 && <FaqList faqs={m.faqs} title={`${m.name} questions`} />}

      <section aria-labelledby="more" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 id="more" className="text-2xl font-bold">
          Works with the rest of Arisotech
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/features/${o.slug}/`}
                className="inline-block rounded-full border border-line-strong bg-surface px-4 py-2 font-medium hover:border-ink"
              >
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  )
}
