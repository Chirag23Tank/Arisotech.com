import { cn } from '@/lib/utils'

const styles = {
  paid: 'bg-paid-wash text-paid',
  approved: 'bg-paid-wash text-paid',
  present: 'bg-paid-wash text-paid',
  pending: 'bg-pending-wash text-pending',
  late: 'bg-pending-wash text-pending',
  leave: 'bg-brand-wash text-brand-strong',
  off: 'bg-paper text-muted',
} as const

export type StatusKind = keyof typeof styles

export default function Status({ kind, children, className }: { kind: StatusKind; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-chip px-2 py-0.5 text-xs font-semibold', styles[kind], className)}>
      {children}
    </span>
  )
}
