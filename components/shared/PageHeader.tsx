import { Reveal, WordReveal } from '@/components/motion/Reveal'
import { Clouds, Stars } from '@/components/art/Sky'

export default function PageHeader({ title, intro, children }: { title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="sky-hero relative overflow-hidden text-white">
      <Stars />
      <Clouds />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.04] sm:text-6xl lg:text-7xl">
          <WordReveal text={title} />
        </h1>
        {intro && (
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">{intro}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
