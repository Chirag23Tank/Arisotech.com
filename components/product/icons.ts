import {
  BadgeIndianRupee,
  CalendarDays,
  Clock,
  Goal,
  Receipt,
  Smartphone,
  UserPlus,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'

export const moduleIcons: Record<string, LucideIcon> = {
  'core-hr': UsersRound,
  payroll: BadgeIndianRupee,
  attendance: Clock,
  leave: CalendarDays,
  expenses: Receipt,
  recruitment: UserPlus,
  performance: Goal,
  'self-service': Smartphone,
}

export const groupIcons: Record<string, LucideIcon> = {
  people: UsersRound,
  pay: BadgeIndianRupee,
  time: Clock,
  talent: Goal,
}
