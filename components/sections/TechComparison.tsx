'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface ComparisonFeature {
  feature: string
  reactNative: boolean | string
  flutter: boolean | string
  native: boolean | string
}

const mobileComparisonData: ComparisonFeature[] = [
  { feature: 'Cross-platform Development', reactNative: true, flutter: true, native: false },
  { feature: 'Performance', reactNative: 'High', flutter: 'High', native: 'Highest' },
  { feature: 'Development Speed', reactNative: 'Fast', flutter: 'Fast', native: 'Slow' },
  { feature: 'Code Reusability', reactNative: '90%', flutter: '95%', native: '0%' },
  { feature: 'Native Look & Feel', reactNative: true, flutter: true, native: true },
  { feature: 'Hot Reload', reactNative: true, flutter: true, native: false },
  { feature: 'Community Support', reactNative: 'Large', flutter: 'Growing', native: 'Large' },
  { feature: 'Learning Curve', reactNative: 'Moderate', flutter: 'Steep', native: 'Steep' },
]

const webComparisonData: ComparisonFeature[] = [
  { feature: 'Server-Side Rendering', reactNative: true, flutter: false, native: true },
  { feature: 'SEO Optimization', reactNative: 'Excellent', flutter: 'Limited', native: 'Excellent' },
  { feature: 'Performance', reactNative: 'High', flutter: 'High', native: 'Highest' },
  { feature: 'Development Speed', reactNative: 'Fast', flutter: 'Moderate', native: 'Moderate' },
  { feature: 'Type Safety', reactNative: 'TypeScript', flutter: 'Dart', native: 'TypeScript' },
  { feature: 'Ecosystem', reactNative: 'Large', flutter: 'Growing', native: 'Large' },
]

const backendComparisonData: ComparisonFeature[] = [
  { feature: 'Performance', reactNative: 'High', flutter: 'High', native: 'Highest' },
  { feature: 'Scalability', reactNative: 'Excellent', flutter: 'Good', native: 'Excellent' },
  { feature: 'Ecosystem', reactNative: 'Large', flutter: 'Limited', native: 'Large' },
  { feature: 'Learning Curve', reactNative: 'Moderate', flutter: 'Steep', native: 'Moderate' },
]

const comparisonDataMap = {
  mobile: mobileComparisonData,
  web: webComparisonData,
  backend: backendComparisonData,
}

export default function TechComparison() {
  const [selectedCategory, setSelectedCategory] = useState<'mobile' | 'web' | 'backend'>('mobile')

  const comparisonData = comparisonDataMap[selectedCategory]

  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-600" aria-label="Yes" />
      ) : (
        <X className="h-5 w-5 text-red-600" aria-label="No" />
      )
    }
    return <span className="text-gray-700">{value}</span>
  }

  const getColumnHeaders = () => {
    if (selectedCategory === 'mobile') {
      return ['React Native', 'Flutter', 'Native']
    } else if (selectedCategory === 'web') {
      return ['Next.js', 'Flutter Web', 'Vanilla React']
    } else {
      return ['Node.js', 'Python', 'Go']
    }
  }

  const headers = getColumnHeaders()

  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Technology Comparison
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Compare different technologies to make informed decisions
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {(['mobile', 'web', 'backend'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-pressed={selectedCategory === cat}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                    {headers.map((header, index) => (
                      <th key={index} className="text-center p-4 font-semibold text-gray-900">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">{row.feature}</td>
                      <td className="p-4 text-center">{renderValue(row.reactNative)}</td>
                      <td className="p-4 text-center">{renderValue(row.flutter)}</td>
                      <td className="p-4 text-center">{renderValue(row.native)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-gray-600">
          <p>
            Need help choosing the right technology?{' '}
            <Link href="/contact" className="text-blue-600 hover:underline">
              Contact us
            </Link>{' '}
            for expert advice.
          </p>
        </div>
      </div>
    </section>
  )
}

