'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { easeInOut } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FAQ } from '@/types'

export default function ServiceFAQs({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
      <div className="mx-auto max-w-3xl space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 text-gray-500 shrink-0 transition-transform ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: easeInOut }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
