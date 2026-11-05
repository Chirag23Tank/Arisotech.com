import ModulePreview from '@/components/product/ModulePreview'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'

const asks = [
  { q: 'Can you send me my payslip for March?', a: 'Downloaded from the app, any month, any time.' },
  { q: 'How many leaves do I have left?', a: 'Shown before they apply, including what the request will use.' },
  { q: 'I forgot to punch in yesterday.', a: 'A regularisation request goes to their manager.' },
  { q: 'Where do I upload my rent receipts?', a: 'Tax declarations and proofs are submitted in the app.' },
]

export default function EmployeeApp() {
  return (
    <section aria-labelledby="app-heading" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div>
          <Reveal>
            <h2 id="app-heading" className="max-w-2xl text-4xl font-bold sm:text-5xl sm:leading-[1.05]">
              The questions HR answers every week, answered by the app
            </h2>
            <p className="mt-5 max-w-xl text-lg text-ink-soft">
              Employees get Arisotech on Android, iOS and the web. Routine requests stop landing in HR&apos;s inbox and
              WhatsApp.
            </p>
          </Reveal>
          <Stagger className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {asks.map((x) => (
              <StaggerItem key={x.q} className="border-l-2 border-brand pl-4">
                <p className="font-semibold">&ldquo;{x.q}&rdquo;</p>
                <p className="mt-1.5 text-ink-soft">{x.a}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <Reveal delay={0.15} className="sky-dawn relative flex justify-center overflow-hidden rounded-slip px-8 py-12 lg:w-96">
          <div className="w-full max-w-[17rem]">
            <ModulePreview slug="self-service" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
