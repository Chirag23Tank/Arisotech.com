'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  serviceType: z.enum(['web-development', 'mobile-apps', 'networking', 'consulting', 'other']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  budgetRange: z.enum(['under-10k', '10k-25k', '25k-50k', '50k-100k', '100k-plus', 'not-sure']).optional(),
  timeline: z.enum(['asap', '1-3-months', '3-6-months', '6-plus-months']).optional(),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const lastSubmitTime = useRef<number>(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    // Client-side rate limiting (5 seconds between submissions)
    const now = Date.now()
    if (now - lastSubmitTime.current < 5000) {
      setSubmitStatus('error')
      setErrorMessage('Please wait a few seconds before submitting again.')
      return
    }
    lastSubmitTime.current = now

    // Honeypot spam protection - check if honeypot field is filled
    if (formRef.current) {
      const honeypot = formRef.current.querySelector<HTMLInputElement>('input[name="website"]')
      if (honeypot && honeypot.value) {
        // Bot detected - silently fail
        setSubmitStatus('success')
        reset()
        setTimeout(() => setSubmitStatus('idle'), 5000)
        return
      }
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Additional validation: Check for suspicious patterns
      const suspiciousPatterns = [
        /http[s]?:\/\//i, // URLs
        /<script/i, // Script tags
        /javascript:/i, // JavaScript protocol
      ]

      const hasSuspiciousContent = suspiciousPatterns.some(pattern => 
        pattern.test(data.message) || pattern.test(data.name) || pattern.test(data.email)
      )

      if (hasSuspiciousContent) {
        throw new Error('Invalid content detected. Please check your submission.')
      }

      // Create Supabase client
      const supabase = createClient()

      // Insert data into Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: data.name.trim(),
            email: data.email.trim().toLowerCase(),
            phone: data.phone?.trim() || null,
            company_name: data.companyName?.trim() || null,
            service_type: data.serviceType,
            message: data.message.trim(),
            budget_range: data.budgetRange || null,
            timeline: data.timeline || null,
            source: typeof window !== 'undefined' ? window.location.pathname : 'website',
            user_agent: typeof window !== 'undefined' ? navigator.userAgent : null,
            created_at: new Date().toISOString(),
          },
        ])

      if (error) {
        console.error('Supabase error:', error)
        
        // Handle specific error cases
        if (error.code === '23505') { // Unique constraint violation
          throw new Error('You have already submitted this form. Please wait before submitting again.')
        } else if (error.code === 'PGRST116') { // Rate limit (if configured)
          throw new Error('Too many submissions. Please try again later.')
        } else if (error.message.includes('rate limit') || error.message.includes('Rate limit')) {
          throw new Error('Rate limit exceeded. Please try again later.')
        } else {
          throw new Error(error.message || 'Failed to save submission. Please try again.')
        }
      }

      // Success
      setSubmitStatus('success')
      reset()
      
      // Optional: Track successful submission (analytics)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submission', {
          event_category: 'Contact',
          event_label: data.serviceType,
        })
      }

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot field for spam protection - hidden from users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px' }}
        aria-hidden="true"
      />

      {submitStatus === 'success' && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <p className="text-sm text-green-800">
            Thank you! Your message has been sent successfully. We'll get back to you soon.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-sm text-red-800">{errorMessage || 'Failed to send message. Please try again.'}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            {...register('name')}
            placeholder="John Doe"
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="john@example.com"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <Input
            id="companyName"
            {...register('companyName')}
            placeholder="Acme Inc."
          />
        </div>
      </div>

      <div>
        <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
          Service Type <span className="text-red-500">*</span>
        </label>
        <select
          id="serviceType"
          {...register('serviceType')}
          aria-invalid={errors.serviceType ? 'true' : 'false'}
          className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Select a service</option>
          <option value="web-development">Web Development</option>
          <option value="mobile-apps">Mobile Apps</option>
          <option value="networking">Networking</option>
          <option value="consulting">Consulting</option>
          <option value="other">Other</option>
        </select>
        {errors.serviceType && (
          <p className="mt-1 text-sm text-red-600">{errors.serviceType.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range
          </label>
          <select
            id="budgetRange"
            {...register('budgetRange')}
            className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select budget range</option>
            <option value="under-10k">Under $10,000</option>
            <option value="10k-25k">$10,000 - $25,000</option>
            <option value="25k-50k">$25,000 - $50,000</option>
            <option value="50k-100k">$50,000 - $100,000</option>
            <option value="100k-plus">$100,000+</option>
            <option value="not-sure">Not Sure</option>
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
            Timeline
          </label>
          <select
            id="timeline"
            {...register('timeline')}
            className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select timeline</option>
            <option value="asap">ASAP</option>
            <option value="1-3-months">1-3 Months</option>
            <option value="3-6-months">3-6 Months</option>
            <option value="6-plus-months">6+ Months</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          rows={6}
          {...register('message')}
          placeholder="Tell us about your project..."
          aria-invalid={errors.message ? 'true' : 'false'}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  )
}

