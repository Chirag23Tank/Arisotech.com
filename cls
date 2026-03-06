warning: in the working copy of 'app/(marketing)/services/page.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'app/layout.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'app/page.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'content/services.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'next.config.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'tsconfig.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'types/index.ts', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/app/(marketing)/about/page.tsx b/app/(marketing)/about/page.tsx[m
[1mindex bcfa5a8..be5fbcf 100644[m
[1m--- a/app/(marketing)/about/page.tsx[m
[1m+++ b/app/(marketing)/about/page.tsx[m
[36m@@ -6,9 +6,25 @@[m [mimport siteConfig from '@/content/site-config.json'[m
 import teamData from '@/content/team.json'[m
 import { TeamMember } from '@/types'[m
 [m
[32m+[m[32mexport const dynamic = 'force-static'[m
[32m+[m
 export const metadata: Metadata = {[m
   title: 'About Us',[m
[31m-  description: 'Learn more about Arisotech and our team of experts',[m
[32m+[m[32m  description: 'Learn more about Arisotech and our team of experts in web development, mobile apps, and networking solutions based in Jaipur, Rajasthan.',[m
[32m+[m[32m  keywords: ['about Arisotech', 'web development team', 'mobile app developers', 'Jaipur software company', 'Rajasthan tech company'],[m
[32m+[m[32m  openGraph: {[m
[32m+[m[32m    title: 'About Us | Arisotech',[m
[32m+[m[32m    description: 'Learn more about Arisotech and our team of experts in web development, mobile apps, and networking solutions.',[m
[32m+[m[32m    type: 'website',[m
[32m+[m[32m  },[m
[32m+[m[32m  twitter: {[m
[32m+[m[32m    card: 'summary_large_image',[m
[32m+[m[32m    title: 'About Us | Arisotech',[m
[32m+[m[32m    description: 'Learn more about Arisotech and our team of experts.',[m
[32m+[m[32m  },[m
[32m+[m[32m  alternates: {[m
[32m+[m[32m    canonical: 'https://arisotech.com/about/',[m
[32m+[m[32m  },[m
 }[m
 [m
 export default function AboutPage() {[m
[1mdiff --git a/app/(marketing)/blog/page.tsx b/app/(marketing)/blog/page.tsx[m
[1mindex 82063d4..c6dd21f 100644[m
[1m--- a/app/(marketing)/blog/page.tsx[m
[1m+++ b/app/(marketing)/blog/page.tsx[m
[36m@@ -3,9 +3,25 @@[m [mimport { Calendar, Clock } from 'lucide-react'[m
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'[m
 import { format } from 'date-fns'[m
 [m
[32m+[m[32mexport const dynamic = 'force-static'[m
[32m+[m
 export const metadata: Metadata = {[m
   title: 'Blog',[m
[31m-  description: 'Latest articles and insights from Arisotech',[m
[32m+[m[32m  description: 'Latest articles and insights from Arisotech on web development, mobile apps, networking, and technology trends.',[m
[32m+[m[32m  keywords: ['tech blog', 'web development blog', 'mobile app development blog', 'technology insights', 'software development articles'],[m
[32m+[m[32m  openGraph: {[m
[32m+[m[32m    title: 'Blog | Arisotech',[m
[32m+[m[32m    description: 'Latest articles and insights from Arisotech on web development, mobile apps, and technology.',[m
[32m+[m[32m    type: 'website',[m
[32m+[m[32m  },[m
[32m+[m[32m  twitter: {[m
[32m+[m[32m    card: 'summary_large_image',[m
[32m+[m[32m    title: 'Blog | Arisotech',[m
[32m+[m[32m    description: 'Latest articles and insights from Arisotech.',[m
[32m+[m[32m  },[m
[32m+[m[32m  alternates: {[m
[32m+[m[32m    canonical: 'https://arisotech.com/blog/',[m
[32m+[m[32m  },[m
 }[m
 [m
 // Mock blog posts - you can replace this with actual blog data later[m
[1mdiff --git a/app/(marketing)/contact/page.tsx b/app/(marketing)/contact/page.tsx[m
[1mindex 49feca6..068e183 100644[m
[1m--- a/app/(marketing)/contact/page.tsx[m
[1m+++ b/app/(marketing)/contact/page.tsx[m
[36m@@ -3,9 +3,25 @@[m [mimport { Mail, Phone, MapPin } from 'lucide-react'[m
 import ContactForm from '@/components/forms/ContactForm'[m
 import siteConfig from '@/content/site-config.json'[m
 [m
[32m+[m[32mexport const dynamic = 'force-static'[m
[32m+[m
 export const metadata: Metadata = {[m
   title: 'Contact Us',[m
[31m-  description: 'Get in touch with Arisotech for your next project',[m
[32m+[m[32m  description: 'Get in touch with Arisotech for your next project. Contact us for web development, mobile apps, and networking solutions in Jaipur, Rajasthan.',[m
[32m+[m[32m  keywords: ['contact Arisotech', 'web development contact', 'mobile app development contact', 'Jaipur software company contact'],[m
[32m+[m[32m  openGraph: {[m
[32m+[m[32m    title: 'Contact Us | Arisotech',[m
[32m+[m[32m    description: 'Get in touch with Arisotech for your next project. We\'d love to hear from you.',[m
[32m+[m[32m    type: 'website',[m
[32m+[m[32m  },[m
[32m+[m[32m  twitter: {[m
[32m+[m[32m    card: 'summary_large_image',[m
[32m+[m[32m    title: 'Contact Us | Arisotech',[m
[32m+[m[32m    description: 'Get in touch with Arisotech for your next project.',[m
[32m+[m[32m  },[m
[32m+[m[32m  alternates: {[m
[32m+[m[32m    canonical: 'https://arisotech.com/contact/',[m
[32m+[m[32m  },[m
 }[m
 [m
 export default function ContactPage() {[m
[1mdiff --git a/app/(marketing)/page.tsx b/app/(marketing)/page.tsx[m
[1mindex f53870c..053768a 100644[m
[1m--- a/app/(marketing)/page.tsx[m
[1m+++ b/app/(marketing)/page.tsx[m
[36m@@ -9,9 +9,24 @@[m [mimport FAQ from '@/components/sections/FAQ'[m
 import CTA from '@/components/sections/CTA'[m
 import siteConfig from '@/content/site-config.json'[m
 [m
[32m+[m[32mexport const dynamic = 'force-static'[m
[32m+[m
 export const metadata: Metadata = {[m
   title: 'Home',[m
   description: siteConfig.description,[m
[32m+[m[32m  openGraph: {[m
[32m+[m[32m    title: `${siteConfig.siteName} - ${siteConfig.tagline}`,[m
[32m+[m[32m    description: siteConfig.description,[m
[32m+[m[32m    type: 'website',[m
[32m+[m[32m  },[m
[32m+[m[32m  twitter: {[m
[32m+[m[32m    card: 'summary_large_image',[m
[32m+[m[32m    title: `${siteConfig.siteName} - ${siteConfig.tagline}`,[m
[32m+[m[32m    description: siteConfig.description,[m
[32m+[m[32m  },[m
[32m+[m[32m  alternates: {[m
[32m+[m[32m    canonical: 'https://arisotech.com',[m
[32m+[m[32m  },[m
 }[m
 [m
 export default function HomePage() {[m
[1mdiff --git a/app/(marketing)/portfolio/page.tsx b/app/(marketing)/portfolio/page.tsx[m
[1mindex 6b6080e..443adcf 100644[m
[1m--- a/app/(marketing)/portfolio/page.tsx[m
[1m+++ b/app/(marketing)/portfolio/page.tsx[m
[36m@@ -6,9 +6,25 @@[m [mimport Link from 'next/link'[m
 import portfolioData from '@/content/portfolio.json'[m
 import { PortfolioProject } from '@/types'[m
 [m
[32m+[m[32mexport const dynamic = 'force-static'[m
[32m+[m
 export const metadata: Metadata = {[m
   title: 'Portfolio',[m
[31m-  description: 'View our portfolio of successful projects in web development, mobile apps, and networking',[m
[32m+[m[32m  description: 'View our portfolio of successful projects in web development, mobile apps, and networking. See our work and client success stories.',[m
[32m+[m[32m  keywords: ['Arisotech portfolio', 'web development projects', 'mobile app projects', 'case studies', 'client work'],[m
[32m+[m[32m  openGraph: {[m
[32m+[m[32m    title: 'Portfolio | Arisotech',[m
[32m+[m[32m    description: 'View our portfolio of successful projects in web development, mobile apps, and networking.',[m
[32m+[m[32m    type: 'website',[m
[32m+[m[32m  },[m
[32m+[m[32m  twitter: {[m
[32m+[m[32m    card: 'summary_large_image',[m
[32m+[m[32m    title: 'Portfolio | Arisotech',[m
[32m+[