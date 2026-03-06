import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import siteConfig from "@/content/site-config.json";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// Get production URL - never use localhost for SEO
const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  if (envUrl.includes('localhost') || envUrl.includes('127.0.0.1') || !envUrl) {
    return 'https://arisotech.com'
  }
  return envUrl
}

const baseUrl = getBaseUrl()

// CRITICAL: Force static generation for root layout to prevent RSC payload requests
export const dynamic = 'force-static'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteConfig.siteName,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  keywords: [
    "web development",
    "React Native",
    "mobile apps",
    "networking",
    "software development",
    "Jaipur",
    "Rajasthan",
    "India",
    "custom software",
    "app development",
    "cloud solutions",
  ],
  authors: [{ name: siteConfig.siteName, url: baseUrl }],
  creator: siteConfig.siteName,
  publisher: siteConfig.siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: siteConfig.siteName,
    title: siteConfig.siteName,
    description: siteConfig.description,
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description: siteConfig.description,
    creator: "@arisotech",
    site: "@arisotech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "V4r7979PqjFJNbT6hqAodZ56QapDAEm7yD9CTrReC5U",
  },
  alternates: {
    canonical: baseUrl,
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (JSON-LD) for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.siteName,
    description: siteConfig.description,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone.split(',')[0].trim(),
      contactType: "Customer Service",
      email: siteConfig.email,
      areaServed: "IN",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302012",
      addressCountry: "IN",
    },
    sameAs: [
      siteConfig.socialMedia.linkedin,
      siteConfig.socialMedia.twitter,
      siteConfig.socialMedia.github,
      siteConfig.socialMedia.facebook,
    ],
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
