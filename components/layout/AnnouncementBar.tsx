import Link from 'next/link'

export default function AnnouncementBar() {
  return (
    <div className="bg-night text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-2.5 text-sm sm:justify-between sm:px-6 lg:px-8">
        <p className="text-white/85">
          <span className="mr-2 rounded-chip bg-dawn px-1.5 py-0.5 text-xs font-bold text-ink">New</span>
          <span className="font-display font-bold text-white">Your data, your control.</span> Keep HR data in your own
          database, your own cloud or your own office.
        </p>
        <Link
          href="/#your-data"
          className="rounded-md bg-brand px-3 py-1.5 font-semibold text-white transition-colors hover:bg-brand-strong"
        >
          See how it works
        </Link>
      </div>
    </div>
  )
}
