import type { Metadata } from 'next'
import { Inter, Schibsted_Grotesk } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import SmoothScroll from '@/components/motion/SmoothScroll'
import siteConfig from '@/content/site-config.json'
import { getBaseUrl } from '@/lib/content'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-schibsted',
  weight: ['500', '600', '700', '800'],
})

const baseUrl = getBaseUrl()

export const dynamic = 'force-static'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteConfig.productName}: ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.productName}`,
  },
  description: siteConfig.description,
  keywords: [
    'HRMS',
    'HRMS software India',
    'payroll software',
    'attendance management',
    'leave management',
    'PF ESI PT TDS',
    'HR software for small business',
    'employee self service',
  ],
  authors: [{ name: siteConfig.siteName, url: baseUrl }],
  creator: siteConfig.siteName,
  publisher: siteConfig.siteName,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: baseUrl,
    siteName: siteConfig.productName,
    title: siteConfig.productName,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.productName,
    description: siteConfig.description,
    site: '@arisotech',
  },
  robots: { index: true, follow: true },
  verification: { google: 'V4r7979PqjFJNbT6hqAodZ56QapDAEm7yD9CTrReC5U' },
  alternates: { canonical: baseUrl },
  category: 'Business software',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: baseUrl,
      email: siteConfig.email,
      telephone: siteConfig.phones[0].tel,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jaipur',
        addressRegion: 'Rajasthan',
        postalCode: '302012',
        addressCountry: 'IN',
      },
      sameAs: Object.values(siteConfig.socialMedia).filter(Boolean),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: siteConfig.productName,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, Android, iOS',
      description: siteConfig.description,
      offers: { '@type': 'Offer', priceCurrency: 'INR', url: `${baseUrl}/pricing/` },
    },
  ]

  return (
    <html lang="en-IN" className={`${inter.variable} ${schibsted.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <AnnouncementBar />
          <Header />
          <main id="main" className="flex-grow">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  )
}
