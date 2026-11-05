import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'
import { Clouds, Stars } from '@/components/art/Sky'

export default function CtaBand({
  title = 'See your own payroll run in Arisotech',
  text = 'In a 30-minute demo we set up a sample company that looks like yours and run a month of payroll together.',
}: {
  title?: string
  text?: string
}) {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <Reveal className="sky-dusk relative mx-auto max-w-7xl overflow-hidden rounded-slip px-6 py-14 text-white sm:px-14 sm:py-20">
        <Stars />
        <Clouds />
        <div className="relative flex flex-col items-center text-center">
          <h2 className="max-w-3xl text-4xl font-bold sm:text-5xl sm:leading-[1.05]">{title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{text}</p>
          <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href="/contact/" size="lg" className="sm:min-w-44">
              Book a demo
            </ButtonLink>
            <ButtonLink href="/pricing/" variant="inverse" size="lg" className="sm:min-w-44">
              See pricing
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
