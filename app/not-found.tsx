import { ButtonLink } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <h1 className="text-4xl font-extrabold sm:text-5xl">This page is not on the payroll</h1>
      <p className="mt-4 text-lg text-ink-soft">
        The link may be out of date, since we recently rebuilt the site around Arisotech HRMS.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Go to the home page</ButtonLink>
        <ButtonLink href="/features/" variant="secondary">
          Browse features
        </ButtonLink>
      </div>
    </section>
  )
}
