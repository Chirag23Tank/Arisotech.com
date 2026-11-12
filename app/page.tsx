import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import WhyArisotech from '@/components/home/WhyArisotech'
import ModuleScroller from '@/components/home/ModuleScroller'
import ComplianceBadges from '@/components/home/ComplianceBadges'
import PayrollMonth from '@/components/home/PayrollMonth'
import SecurityNight from '@/components/home/SecurityNight'
import DataControl from '@/components/home/DataControl'
import StageCarousel from '@/components/home/StageCarousel'
import EmployeeApp from '@/components/home/EmployeeApp'
import FaqList from '@/components/shared/FaqList'
import CtaBand from '@/components/shared/CtaBand'
import { getBaseUrl, getModule } from '@/lib/content'
import type { ProductModule } from '@/types'
import pricing from '@/content/pricing.json'
import siteConfig from '@/content/site-config.json'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.productName}: ${siteConfig.tagline}` },
  description: siteConfig.description,
  alternates: { canonical: `${getBaseUrl()}/` },
}

const tour = ['payroll', 'core-hr', 'attendance', 'leave', 'recruitment', 'performance']
  .map(getModule)
  .filter(Boolean) as ProductModule[]

const lowest = pricing.plans.find((p) => p.pricePerEmployee)?.pricePerEmployee

const faqs = [
  {
    question: 'How long does it take to get started?',
    answer:
      'Most companies run their first payroll on Arisotech within a few weeks. Our team imports your employee data, sets up salary structures and leave policies, and runs a parallel payroll with you before you switch.',
  },
  {
    question: 'We use spreadsheets and Tally today. Can we move?',
    answer:
      'Yes. Send us your current employee master and last month’s salary register and we will map them into Arisotech. Accounting entries can be exported for Tally after each payroll run.',
  },
  {
    question: 'What does it cost?',
    answer: `Plans start at ${pricing.currency}${lowest} per employee per month. The pricing page has a calculator for your headcount.`,
  },
  {
    question: 'Is my data safe?',
    answer:
      'Access is controlled by role, every change is logged, and data is encrypted in transit and at rest. You can export your data whenever you want.',
  },
  {
    question: 'Can we keep our data on our own servers or cloud?',
    answer:
      'Yes. You can use a dedicated database in the region you choose, get a full copy in your own S3 bucket or Google Drive every night, or run Arisotech on your own servers. Talk to us and we will help you pick the right setup.',
  },
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyArisotech />
      <DataControl />
      <ModuleScroller modules={tour} />
      <ComplianceBadges />
      <PayrollMonth />
      <SecurityNight />
      <StageCarousel />
      <EmployeeApp />
      <FaqList faqs={faqs} />
      <CtaBand />
    </>
  )
}
