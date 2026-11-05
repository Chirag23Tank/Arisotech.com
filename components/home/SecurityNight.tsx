import { Check, History, KeyRound, Lock, ShieldCheck } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { Stars } from '@/components/art/Sky'

function AccessCard() {
  const rows = [
    ['Payroll admin', true, true, true],
    ['Manager', true, true, false],
    ['Employee', true, false, false],
  ] as const
  return (
    <div className="rounded-panel bg-white p-4 text-sm text-ink">
      <p className="font-semibold">Who can see what</p>
      <table className="mt-3 w-full">
        <thead>
          <tr className="text-left text-xs text-muted">
            <th className="pb-2 font-medium">Role</th>
            <th className="pb-2 text-center font-medium">Profile</th>
            <th className="pb-2 text-center font-medium">Team leave</th>
            <th className="pb-2 text-center font-medium">Salaries</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([role, ...cells]) => (
            <tr key={role} className="border-t border-line/70">
              <th scope="row" className="py-2 text-left font-medium">{role}</th>
              {cells.map((c, i) => (
                <td key={i} className="py-2 text-center">
                  {c ? <Check className="mx-auto h-4 w-4 text-paid" aria-label="Allowed" /> : <span className="text-line-strong" aria-label="Hidden">-</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function AuditCard() {
  const log = [
    { who: 'Sunita A.', what: 'Revised CTC for Rohan Mehta', when: '10:42' },
    { who: 'Karan P.', what: 'Changed bank account for Farah Khan', when: '09:15' },
    { who: 'Sunita A.', what: 'Locked February payroll', when: 'Yesterday' },
  ]
  return (
    <div className="rounded-panel bg-white p-4 text-sm text-ink">
      <p className="font-semibold">Change history</p>
      <ul className="mt-3 space-y-3">
        {log.map((l) => (
          <li key={l.what} className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
            <span className="flex-1">
              <span className="block font-medium">{l.what}</span>
              <span className="text-xs text-muted">{l.who}, {l.when}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function BackupCard() {
  return (
    <div className="rounded-panel bg-white p-4 text-sm text-ink">
      <p className="font-semibold">Data protection</p>
      <ul className="mt-3 space-y-2.5">
        {['Encrypted in transit', 'Encrypted at rest', 'Regular backups', 'Export your data any time'].map((t) => (
          <li key={t} className="flex items-center gap-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-paid-wash">
              <Check className="h-3.5 w-3.5 text-paid" aria-hidden />
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}

const cards = [
  { Icon: KeyRound, label: 'Access by role', title: 'People see only what their role needs', text: 'Managers see their team. Payroll admins see salaries. Everyone else sees their own record.', Visual: AccessCard },
  { Icon: History, label: 'Every change logged', title: 'Know who changed what, and when', text: 'Salary revisions, bank detail edits and payroll locks are recorded with the person and time.', Visual: AuditCard },
  { Icon: Lock, label: 'Encrypted and backed up', title: 'Your records stay safe and yours', text: 'Data is encrypted in transit and at rest, backed up regularly, and exportable whenever you want.', Visual: BackupCard },
]

export default function SecurityNight() {
  return (
    <section aria-labelledby="security-heading" className="sky-night relative overflow-hidden text-white">
      <Stars />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <Reveal className="flex flex-col items-center text-center">
          <span className="orb flex h-36 w-36 items-center justify-center rounded-full sm:h-44 sm:w-44">
            <ShieldCheck className="h-14 w-14 text-white sm:h-16 sm:w-16" aria-hidden />
          </span>
          <h2 id="security-heading" className="mt-12 max-w-3xl text-4xl font-bold sm:text-6xl sm:leading-[1.05]">
            Salary data is the most sensitive data you hold
          </h2>
          <p className="mt-5 max-w-xl text-lg text-white/75">We treat it that way, starting with who can see it.</p>
        </Reveal>

        <Stagger className="mt-16 grid gap-8 lg:grid-cols-3" gap={0.12}>
          {cards.map(({ Icon, label, title, text, Visual }) => (
            <StaggerItem key={label}>
              <div className="sky-dusk rounded-slip p-6">
                <Visual />
              </div>
              <p className="mt-6 flex items-center gap-2 font-semibold text-blue-200">
                <Icon className="h-4 w-4" aria-hidden /> {label}
              </p>
              <h3 className="mt-2 text-2xl font-bold">{title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-white/75">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
