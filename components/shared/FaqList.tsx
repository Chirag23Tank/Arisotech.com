import { Plus } from 'lucide-react'
import type { FAQ } from '@/types'

export default function FaqList({ faqs, title = 'Questions people ask' }: { faqs: FAQ[]; title?: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_2fr] lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      <div className="border-t border-line">
        {faqs.map((f) => (
          <details key={f.question} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-semibold">
              {f.question}
              <Plus className="mt-1 h-5 w-5 shrink-0 text-brand transition-transform group-open:rotate-45" aria-hidden />
            </summary>
            <p className="max-w-2xl pb-6 text-ink-soft leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
