import { Download, FileText, MapPin, Paperclip } from 'lucide-react'
import Status, { type StatusKind } from './Status'
import { inr } from '@/lib/utils'

/*
  Illustrative product screens, built in HTML so they stay crisp and are easy to edit.
  All names and figures are sample data.
*/

function Frame({ title, children, aside }: { title: string; children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-panel border border-line bg-surface text-left text-ink shadow-[0_1px_0_rgba(19,32,59,0.04),0_20px_40px_-28px_rgba(19,32,59,0.35)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <p className="text-sm font-semibold text-ink">{title}</p>
        {aside}
      </div>
      <div className="p-4 text-sm">{children}</div>
    </div>
  )
}

function Payroll() {
  const lines = [
    { label: 'Provident fund', value: 374400 },
    { label: 'ESI', value: 18290 },
    { label: 'Professional tax', value: 28400 },
    { label: 'TDS', value: 364600 },
  ]
  return (
    <Frame title="March payroll" aside={<Status kind="pending">Ready to lock</Status>}>
      <dl className="figures grid grid-cols-[auto_1fr_1fr] gap-3 border-b border-line pb-4">
        <div>
          <dt className="text-muted">Employees</dt>
          <dd className="mt-1 text-base font-semibold sm:text-lg">142</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-muted">Gross</dt>
          <dd className="mt-1 text-base font-semibold sm:text-lg">₹{inr(6240000)}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-muted">Net pay</dt>
          <dd className="mt-1 text-base font-semibold text-paid sm:text-lg">₹{inr(5454310)}</dd>
        </div>
      </dl>
      <table className="figures mt-3 w-full">
        <caption className="sr-only">Statutory deductions this month</caption>
        <tbody>
          {lines.map((l) => (
            <tr key={l.label} className="border-b border-line/70 last:border-0">
              <th scope="row" className="py-2 text-left font-normal text-ink-soft">{l.label}</th>
              <td className="py-2 text-right">₹{inr(l.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 rounded-md bg-paper px-3 py-2 text-ink-soft">
        6 changes from February: 4 joiners, 1 exit, 1 salary revision.
      </p>
    </Frame>
  )
}

function Attendance() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const rows: { name: string; cells: [StatusKind, string][] }[] = [
    { name: 'Ananya R.', cells: [['present', '9:02'], ['present', '8:57'], ['late', '9:41'], ['present', '9:05'], ['present', '9:00'], ['off', 'Off']] },
    { name: 'Vikram S.', cells: [['present', '8:48'], ['leave', 'CL'], ['present', '8:51'], ['present', '8:55'], ['late', '9:38'], ['off', 'Off']] },
    { name: 'Farah K.', cells: [['present', '9:10'], ['present', '9:04'], ['present', '9:06'], ['present', '9:00'], ['present', '9:12'], ['present', '10:01']] },
    { name: 'Jatin M.', cells: [['late', '9:44'], ['present', '9:01'], ['present', '8:59'], ['leave', 'SL'], ['leave', 'SL'], ['off', 'Off']] },
  ]
  return (
    <Frame title="Design team, this week" aside={<span className="text-xs text-muted">Shift 9:00 to 18:00</span>}>
      <div className="overflow-x-auto">
        <table className="figures w-full min-w-[30rem]">
          <thead>
            <tr className="text-left text-muted">
              <th scope="col" className="pb-2 font-medium">Employee</th>
              {days.map((d) => (
                <th key={d} scope="col" className="pb-2 font-medium">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-line/70">
                <th scope="row" className="py-2 pr-2 text-left font-medium">{r.name}</th>
                {r.cells.map(([kind, label], i) => (
                  <td key={i} className="py-2 pr-1">
                    <Status kind={kind}>{label}</Status>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 flex items-center gap-2 text-ink-soft">
        <MapPin className="h-4 w-4 text-brand" aria-hidden /> Farah clocked in from the Malviya Nagar office.
      </p>
    </Frame>
  )
}

function Leave() {
  const balances = [
    { type: 'Casual', left: 6, total: 12 },
    { type: 'Sick', left: 4, total: 8 },
    { type: 'Earned', left: 8.5, total: 15 },
  ]
  return (
    <Frame title="Leave request">
      <div className="rounded-md border border-line p-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold">Priya Nair</p>
            <p className="text-muted">Earned leave, 14 to 16 April (3 days)</p>
          </div>
          <Status kind="pending">Awaiting you</Status>
        </div>
        <p className="mt-2 text-ink-soft">Also away on these dates: Karan (15 April).</p>
        <div className="mt-3 flex gap-2">
          <span className="rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white">Approve</span>
          <span className="rounded-md border border-line-strong px-3 py-1.5 text-xs font-semibold">Decline</span>
        </div>
      </div>
      <p className="mt-4 mb-2 font-medium text-ink-soft">Priya&apos;s balance after this request</p>
      <ul className="figures space-y-2.5">
        {balances.map((b) => (
          <li key={b.type}>
            <div className="flex justify-between">
              <span>{b.type}</span>
              <span className="text-muted">
                {b.left} of {b.total} left
              </span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-paper">
              <div className="h-1.5 rounded-full bg-brand" style={{ width: `${(b.left / b.total) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </Frame>
  )
}

function Expenses() {
  const claims: { what: string; who: string; amount: number; kind: StatusKind; label: string }[] = [
    { what: 'Cab to client site', who: 'Rahul D.', amount: 640, kind: 'pending', label: 'Manager review' },
    { what: 'Team lunch', who: 'Meera J.', amount: 3820, kind: 'pending', label: 'Finance review' },
    { what: 'Hotel, Pune', who: 'Arjun P.', amount: 5400, kind: 'approved', label: 'In April payroll' },
    { what: 'Fuel', who: 'Sana Q.', amount: 1250, kind: 'approved', label: 'In April payroll' },
  ]
  return (
    <Frame title="Expense claims" aside={<span className="figures text-xs text-muted">4 this week</span>}>
      <ul className="divide-y divide-line/70">
        {claims.map((c) => (
          <li key={c.what} className="flex items-center gap-3 py-2.5">
            <Paperclip className="h-4 w-4 shrink-0 text-muted" aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{c.what}</p>
              <p className="text-muted">{c.who}</p>
            </div>
            <div className="text-right">
              <p className="figures font-semibold">₹{inr(c.amount)}</p>
              <Status kind={c.kind}>{c.label}</Status>
            </div>
          </li>
        ))}
      </ul>
    </Frame>
  )
}

function Recruitment() {
  const stages = [
    { name: 'Applied', count: 48, people: ['Neha', 'Imran', 'Tara'] },
    { name: 'Screening', count: 16, people: ['Dev', 'Kavya'] },
    { name: 'Interview', count: 7, people: ['Ritu', 'Omar'] },
    { name: 'Offer', count: 2, people: ['Aditya'] },
  ]
  return (
    <Frame title="Backend engineer, Jaipur" aside={<span className="text-xs text-muted">Opened 12 days ago</span>}>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stages.map((s) => (
          <div key={s.name} className="rounded-md bg-paper p-2.5">
            <p className="figures flex justify-between font-semibold">
              {s.name} <span className="text-muted">{s.count}</span>
            </p>
            <ul className="mt-2 space-y-1.5">
              {s.people.map((p) => (
                <li key={p} className="rounded border border-line bg-surface px-2 py-1.5">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Frame>
  )
}

function Performance() {
  const goals = [
    { title: 'Cut month-end close to 3 days', progress: 72, kind: 'pending' as StatusKind, label: 'On track' },
    { title: 'Move vendor payments to UPI', progress: 100, kind: 'approved' as StatusKind, label: 'Done' },
    { title: 'Train two new analysts', progress: 40, kind: 'pending' as StatusKind, label: 'On track' },
  ]
  return (
    <Frame title="Goals, April to September" aside={<span className="text-xs text-muted">Finance team</span>}>
      <ul className="space-y-4">
        {goals.map((g) => (
          <li key={g.title}>
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium">{g.title}</p>
              <Status kind={g.kind}>{g.label}</Status>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-1.5 flex-1 rounded-full bg-paper">
                <div className={`h-1.5 rounded-full ${g.progress === 100 ? 'bg-paid' : 'bg-brand'}`} style={{ width: `${g.progress}%` }} />
              </div>
              <span className="figures w-10 text-right text-muted">{g.progress}%</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-md bg-paper px-3 py-2 text-ink-soft">Next check-in with your manager on 18 April.</p>
    </Frame>
  )
}

function CoreHr() {
  const facts = [
    ['Department', 'Finance'],
    ['Location', 'Jaipur'],
    ['Reports to', 'Sunita Agarwal'],
    ['Joined', '12 Aug 2022'],
    ['UAN', '1012 4471 9834'],
    ['PAN', 'Verified'],
  ]
  return (
    <Frame title="Employee profile">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-wash font-display text-lg font-bold text-brand-strong">
          RM
        </div>
        <div>
          <p className="font-semibold">Rohan Mehta</p>
          <p className="text-muted">Senior accounts associate</p>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4">
        {facts.map(([k, v]) => (
          <div key={k}>
            <dt className="text-muted">{k}</dt>
            <dd className="figures mt-0.5 font-medium">{v}</dd>
          </div>
        ))}
      </dl>
      <ul className="mt-4 space-y-1.5 border-t border-line pt-3">
        {['Appointment letter.pdf', 'Increment letter, April 2025.pdf'].map((d) => (
          <li key={d} className="flex items-center gap-2 text-ink-soft">
            <FileText className="h-4 w-4 text-muted" aria-hidden /> {d}
          </li>
        ))}
      </ul>
    </Frame>
  )
}

function SelfService() {
  return (
    <div className="mx-auto w-full max-w-[17rem] rounded-[2rem] border-[6px] border-ink bg-surface p-4 text-left text-sm text-ink shadow-[0_30px_60px_-30px_rgba(19,32,59,0.5)]">
      <p className="text-muted">Good morning,</p>
      <p className="font-display text-lg font-bold">Sneha</p>
      <div className="mt-4 rounded-xl bg-brand p-3 text-white">
        <p className="text-white/80">You clocked in at</p>
        <p className="figures font-display text-2xl font-bold">9:04 am</p>
        <p className="mt-1 text-white/80">Office, C-Scheme</p>
      </div>
      <ul className="mt-3 divide-y divide-line rounded-xl border border-line">
        <li className="flex items-center justify-between px-3 py-2.5">
          <span>March payslip</span>
          <Download className="h-4 w-4 text-brand" aria-label="Download" />
        </li>
        <li className="flex items-center justify-between px-3 py-2.5">
          <span>Leave balance</span>
          <span className="figures font-semibold">9 days</span>
        </li>
        <li className="flex items-center justify-between px-3 py-2.5">
          <span>Tax declaration</span>
          <Status kind="pending">Proofs due</Status>
        </li>
      </ul>
    </div>
  )
}

const previews: Record<string, () => React.ReactElement> = {
  'core-hr': CoreHr,
  payroll: Payroll,
  attendance: Attendance,
  leave: Leave,
  expenses: Expenses,
  recruitment: Recruitment,
  performance: Performance,
  'self-service': SelfService,
}

export default function ModulePreview({ slug }: { slug: string }) {
  const Preview = previews[slug] ?? Payroll
  return <Preview />
}
