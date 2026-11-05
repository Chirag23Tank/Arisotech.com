import Link from 'next/link'

export default function AnnouncementBar() {
  return (
    <div className="bg-night text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-2.5 text-sm sm:justify-between sm:px-6 lg:px-8">
        <p className="text-white/85">
          <span className="font-display font-bold text-white">Switching from spreadsheets?</span> Data migration and
          payroll setup are included with yearly plans.
        </p>
        <Link
          href="/contact/"
          className="rounded-md bg-brand px-3 py-1.5 font-semibold text-white transition-colors hover:bg-brand-strong"
        >
          Book a free setup call
        </Link>
      </div>
    </div>
  )
}
