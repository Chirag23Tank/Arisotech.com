import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const inrFormatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })

/** Formats a number in the Indian digit grouping, e.g. 5454310 -> "54,54,310". */
export function inr(value: number) {
  return inrFormatter.format(value)
}
