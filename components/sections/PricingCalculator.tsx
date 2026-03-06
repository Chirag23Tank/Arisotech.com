'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CalculatorOption {
  id: string
  label: string
  options: {
    value: string
    label: string
    price: number
  }[]
}

const calculatorOptions: CalculatorOption[] = [
  {
    id: 'service',
    label: 'Service Type',
    options: [
      { value: 'web', label: 'Web Development', price: 0 },
      { value: 'mobile', label: 'Mobile App', price: 50000 },
      { value: 'networking', label: 'Networking', price: 0 },
    ],
  },
  {
    id: 'pages',
    label: 'Number of Pages/Screens',
    options: [
      { value: '5', label: 'Up to 5', price: 0 },
      { value: '10', label: '6-10', price: 50000 },
      { value: '20', label: '11-20', price: 100000 },
      { value: 'unlimited', label: 'Unlimited', price: 200000 },
    ],
  },
  {
    id: 'features',
    label: 'Key Features',
    options: [
      { value: 'basic', label: 'Basic Features', price: 0 },
      { value: 'ecommerce', label: 'E-commerce', price: 100000 },
      { value: 'auth', label: 'User Authentication', price: 50000 },
      { value: 'api', label: 'API Integration', price: 75000 },
      { value: 'cms', label: 'CMS Integration', price: 50000 },
    ],
  },
  {
    id: 'design',
    label: 'Design Requirements',
    options: [
      { value: 'template', label: 'Template Based', price: 0 },
      { value: 'custom', label: 'Custom Design', price: 75000 },
      { value: 'premium', label: 'Premium Design', price: 150000 },
    ],
  },
]

export default function PricingCalculator() {
  const [selections, setSelections] = useState<Record<string, string>>({
    service: 'web',
    pages: '5',
    features: 'basic',
    design: 'template',
  })

  const basePrice = 50000
  const selectedPrices = Object.values(selections).reduce((sum, value) => {
    const option = calculatorOptions
      .flatMap((opt) => opt.options)
      .find((o) => o.value === value)
    return sum + (option?.price || 0)
  }, 0)

  const totalPrice = basePrice + selectedPrices

  const handleSelection = (categoryId: string, value: string) => {
    setSelections((prev) => ({ ...prev, [categoryId]: value }))
  }

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-blue-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="mb-6 flex justify-center">
            <Calculator className="h-12 w-12 text-blue-600" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Project Cost Estimator
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Get an estimated cost for your project. This is a rough estimate - contact us for a detailed quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Options */}
          <div className="lg:col-span-2 space-y-6">
            {calculatorOptions.map((option) => (
              <Card key={option.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{option.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {option.options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelection(option.id, opt.value)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selections[option.id] === opt.value
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        aria-pressed={selections[option.id] === opt.value}
                      >
                        <div className="font-medium text-gray-900">{opt.label}</div>
                        {opt.price > 0 && (
                          <div className="text-sm text-gray-600 mt-1">
                            +₹{opt.price.toLocaleString()}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Estimated Cost</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Base Price</span>
                    <span>₹{basePrice.toLocaleString()}</span>
                  </div>
                  {selectedPrices > 0 && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Additional Features</span>
                      <span>+₹{selectedPrices.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-blue-600">₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Link href="/contact" className="block">
                    <Button className="w-full" size="lg">
                      Get Detailed Quote
                    </Button>
                  </Link>
                  <Link href="/contact" className="block">
                    <Button variant="outline" className="w-full">
                      Schedule Consultation
                    </Button>
                  </Link>
                </div>

                <p className="text-xs text-gray-500 text-center pt-4">
                  * This is an estimated cost. Final pricing may vary based on specific requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}






