import Link from 'next/link'

/** The Arisotech wordmark, unchanged from the original site: Inter bold in blue-600. */
export default function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="-m-1.5 p-1.5 font-sans" aria-label="Arisotech home">
      <span className={`text-2xl font-bold ${inverse ? 'text-blue-400' : 'text-blue-600'}`}>Arisotech</span>
    </Link>
  )
}
