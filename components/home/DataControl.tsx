import { Fragment } from 'react'
import { Check, CloudUpload, MapPin, Server, X } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { ButtonLink } from '@/components/ui/button'
import { Clouds } from '@/components/art/Sky'

function RegionCard() {
  return (
    <div className="rounded-panel bg-white p-4 text-sm text-ink">
      <p className="font-semibold">Where your data lives</p>
      <ul className="mt-3 space-y-2">
        {[
          ['Arisotech cloud, India', false],
          ['Your own database, region of your choice', true],
        ].map(([label, on]) => (
          <li
            key={String(label)}
            className={`flex items-center justify-between rounded-lg border px-3 py-2 ${on ? 'border-brand bg-brand-wash' : 'border-line'}`}
          >
            {label}
            {on && <Check className="h-4 w-4 text-brand" aria-label="Selected" />}
          </li>
        ))}
      </ul>
    </div>
  )
}

function BackupCard() {
  return (
    <div className="rounded-panel bg-white p-4 text-sm text-ink">
      <p className="font-semibold">Copies sent to your storage</p>
      <ul className="mt-3 space-y-2.5">
        {['Today, 02:00', 'Yesterday, 02:00', '2 days ago, 02:00'].map((t) => (
          <li key={t} className="flex items-center gap-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-paid-wash">
              <Check className="h-3.5 w-3.5 text-paid" aria-hidden />
            </span>
            <span className="flex-1">Full copy saved</span>
            <span className="text-xs text-muted">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SelfHostCard() {
  return (
    <div className="rounded-panel bg-white p-4 text-sm text-ink">
      <p className="font-semibold">Installed in your office</p>
      <div className="mt-3 rounded-lg border border-line p-3">
        <p className="flex items-center gap-2 font-medium">
          <Server className="h-4 w-4 text-brand" aria-hidden /> hr-server.yourcompany.local
        </p>
        <p className="mt-1 text-xs text-muted">App and database run on your hardware</p>
      </div>
      <p className="mt-3 flex items-center gap-2 text-paid">
        <Check className="h-4 w-4" aria-hidden /> Nothing leaves your network
      </p>
    </div>
  )
}

const options = [
  {
    Icon: MapPin,
    label: 'Your database',
    title: 'Keep the database where you want it',
    text: 'Use our secure cloud in India, or connect a dedicated database in the region your company needs.',
    Visual: RegionCard,
  },
  {
    Icon: CloudUpload,
    label: 'Your storage',
    title: 'A full copy in your own cloud, every night',
    text: 'Employee records, attendance, payroll and documents are copied to your S3 bucket or Google Drive automatically.',
    Visual: BackupCard,
  },
  {
    Icon: Server,
    label: 'Your servers',
    title: 'Run Arisotech inside your own office',
    text: 'For companies that keep salary data on their own premises. The same product, installed on your servers.',
    Visual: SelfHostCard,
  },
]

const comparison = [
  ['Where your data is stored', 'Only in the vendor’s shared cloud', 'Our cloud in India, your own database, or your own servers'],
  ['Your own copy of the data', 'Export on request, one file at a time', 'A full copy in your S3 or Google Drive every night'],
  ['Running it in your office', 'Rarely offered', 'Available on Enterprise'],
  ['Smallest team you pay for', 'Often a 50-employee base fee', 'From 10 employees'],
] as const

export default function DataControl() {
  return (
    <section id="your-data" aria-labelledby="data-heading" className="scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8">
      <div className="sky-dawn relative mx-auto max-w-7xl overflow-hidden rounded-slip px-6 py-16 sm:px-12 lg:py-20">
        <Clouds />
        <Reveal className="relative max-w-3xl">
          <span className="inline-block rounded-chip bg-white px-2.5 py-1 text-sm font-bold text-brand-strong">
            Why we are different
          </span>
          <h2 id="data-heading" className="mt-4 text-4xl font-bold text-ink sm:text-6xl sm:leading-[1.05]">
            Your data, your control
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-ink">
            With most HR software, your salary data sits in their cloud, on their terms. Arisotech is built the other way
            round: you decide where your data lives, you always hold a full copy, and you can run it on your own servers.
          </p>
        </Reveal>

        <Stagger className="relative mt-14 grid gap-8 lg:grid-cols-3" gap={0.12}>
          {options.map(({ Icon, label, title, text, Visual }) => (
            <StaggerItem key={label} className="flex flex-col rounded-slip bg-white/70 p-5 backdrop-blur-sm">
              <Visual />
              <p className="mt-6 flex items-center gap-2 font-semibold text-brand-strong">
                <Icon className="h-4 w-4" aria-hidden /> {label}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-ink">{title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="relative mt-14 overflow-hidden rounded-slip bg-white text-ink shadow-[0_24px_48px_-28px_rgba(16,22,61,0.45)]">
          <table className="w-full text-left">
            <caption className="px-5 pt-5 text-left font-display text-xl font-bold sm:px-8 sm:pt-7">
              How Arisotech compares
            </caption>
            <thead>
              <tr className="text-sm">
                <th scope="col" className="hidden w-1/3 px-8 py-4 font-medium text-muted sm:table-cell">
                  <span className="sr-only">Question</span>
                </th>
                <th scope="col" className="w-1/2 px-5 py-4 font-semibold text-muted sm:w-1/3 sm:px-6">
                  Typical HR software
                </th>
                <th scope="col" className="w-1/2 bg-brand-wash px-3 py-4 font-bold text-brand-strong sm:w-1/3 sm:px-6">
                  Arisotech
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(([q, them, us]) => (
                <Fragment key={q}>
                  {/* Phones: the question gets its own full-width row above the two answers. */}
                  <tr className="border-t border-line sm:hidden">
                    <th scope="colgroup" colSpan={2} className="px-5 pb-1 pt-4 font-semibold">
                      {q}
                    </th>
                  </tr>
                <tr className="align-top sm:border-t sm:border-line">
                  <th scope="row" className="hidden px-8 py-4 font-semibold sm:table-cell">
                    {q}
                  </th>
                  <td className="px-5 pb-4 pt-2 text-ink-soft sm:px-6 sm:pt-4">
                    <span className="flex gap-2">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden />
                      {them}
                    </span>
                  </td>
                  <td className="bg-brand-wash/60 px-3 pb-4 pt-2 font-medium sm:px-6 sm:pt-4">
                    <span className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-paid" aria-hidden />
                      {us}
                    </span>
                  </td>
                </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal className="relative mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/contact/?type=sales" size="lg">
            Talk to us about your setup
          </ButtonLink>
          <p className="text-ink-soft">Available on the Enterprise plan. Nightly copies are included from Growth.</p>
        </Reveal>
      </div>
    </section>
  )
}
