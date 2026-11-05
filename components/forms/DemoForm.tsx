'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { modules } from '@/lib/content'

const requestTypes = ['demo', 'trial', 'sales'] as const
const sizes = ['1-50', '51-200', '201-500', '501-1000', '1000-plus'] as const
const timelines = ['asap', '1-3-months', '3-6-months', '6-plus-months'] as const

const schema = z.object({
  name: z.string().trim().min(2, 'Enter your full name').max(255),
  email: z.string().trim().email('Enter a valid work email'),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{7,18}$/, 'Enter a phone number with 8 to 15 digits'),
  companyName: z.string().trim().min(2, 'Enter your company name').max(255),
  companySize: z.enum(sizes, { message: 'Choose your company size' }),
  timeline: z.enum(timelines).optional().or(z.literal('')),
  modules: z.array(z.string()).optional(),
  message: z.string().trim().max(5000).optional(),
})

type FormValues = z.infer<typeof schema>

const field =
  'block h-11 w-full rounded-lg border border-line-strong bg-white px-3 text-[0.95rem] placeholder:text-muted aria-[invalid=true]:border-red-600'

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block font-medium">
      {children}
      {optional && <span className="font-normal text-muted"> (optional)</span>}
    </label>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-sm text-red-700">
      {message}
    </p>
  )
}

export default function DemoForm() {
  const [requestType, setRequestType] = useState<(typeof requestTypes)[number]>('demo')
  const [plan, setPlan] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const honeypot = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const t = params.get('type')
    if (t && (requestTypes as readonly string[]).includes(t)) setRequestType(t as (typeof requestTypes)[number])
    setPlan(params.get('plan'))
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { modules: [] } })

  async function onSubmit(data: FormValues) {
    if (honeypot.current?.value) {
      setStatus('sent')
      return
    }
    setStatus('sending')
    setErrorMessage('')

    try {
      const supabase = createClient()
      const note = [plan ? `Plan: ${plan}` : '', data.message ?? ''].filter(Boolean).join('\n')
      const { error } = await supabase.from('contact_submissions').insert([
        {
          name: data.name,
          email: data.email.toLowerCase(),
          phone: data.phone,
          company_name: data.companyName,
          company_size: data.companySize,
          interested_modules: data.modules?.length ? data.modules : null,
          service_type: requestType,
          timeline: data.timeline || null,
          message: note,
          source: window.location.pathname + window.location.search,
          user_agent: navigator.userAgent,
        },
      ])
      if (error) {
        if (error.message.toLowerCase().includes('rate limit')) {
          throw new Error('This email has sent several requests in the last hour. Try again later or call us.')
        }
        throw new Error('Your request could not be sent. Check your connection and try again, or email us.')
      }
      setStatus('sent')
      reset()
    } catch (e) {
      setStatus('error')
      setErrorMessage(e instanceof Error ? e.message : 'Your request could not be sent. Try again.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-panel border border-paid/30 bg-paid-wash p-6" role="status">
        <CheckCircle2 className="h-7 w-7 text-paid" aria-hidden />
        <h2 className="mt-3 text-2xl font-bold">Request received</h2>
        <p className="mt-2 text-ink-soft">
          We will call or email you within one working day to pick a time. If it is urgent, call us on the number on this page.
        </p>
      </div>
    )
  }

  const heading = { demo: 'Book a demo', trial: 'Start a free trial', sales: 'Talk to sales' }[requestType]
  const submitLabel = { demo: 'Request demo', trial: 'Request trial access', sales: 'Send to sales' }[requestType]

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">{heading}</h2>
        <fieldset className="mt-3">
          <legend className="sr-only">What would you like?</legend>
          <div className="flex flex-wrap gap-2">
            {requestTypes.map((t) => (
              <label
                key={t}
                className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-semibold has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand ${
                  requestType === t ? 'border-ink bg-ink text-white' : 'border-line-strong text-ink-soft hover:text-ink'
                }`}
              >
                <input type="radio" name="requestType" className="sr-only" checked={requestType === t} onChange={() => setRequestType(t)} />
                {{ demo: 'Demo', trial: 'Free trial', sales: 'Sales question' }[t]}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden />

      {status === 'error' && (
        <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800" role="alert">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full name</Label>
          <input id="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby="name-error" {...register('name')} />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="email">Work email</Label>
          <input id="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby="email-error" {...register('email')} />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <input id="phone" type="tel" autoComplete="tel" placeholder="+91" className={field} aria-invalid={!!errors.phone} aria-describedby="phone-error" {...register('phone')} />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>
        <div>
          <Label htmlFor="companyName">Company</Label>
          <input id="companyName" autoComplete="organization" className={field} aria-invalid={!!errors.companyName} aria-describedby="company-error" {...register('companyName')} />
          <FieldError id="company-error" message={errors.companyName?.message} />
        </div>
        <div>
          <Label htmlFor="companySize">Number of employees</Label>
          <select id="companySize" className={field} defaultValue="" aria-invalid={!!errors.companySize} aria-describedby="size-error" {...register('companySize')}>
            <option value="" disabled>
              Choose one
            </option>
            <option value="1-50">1 to 50</option>
            <option value="51-200">51 to 200</option>
            <option value="201-500">201 to 500</option>
            <option value="501-1000">501 to 1,000</option>
            <option value="1000-plus">More than 1,000</option>
          </select>
          <FieldError id="size-error" message={errors.companySize?.message} />
        </div>
        <div>
          <Label htmlFor="timeline" optional>
            When do you want to go live?
          </Label>
          <select id="timeline" className={field} defaultValue="" {...register('timeline')}>
            <option value="">Not sure yet</option>
            <option value="asap">As soon as possible</option>
            <option value="1-3-months">In 1 to 3 months</option>
            <option value="3-6-months">In 3 to 6 months</option>
            <option value="6-plus-months">Later than 6 months</option>
          </select>
        </div>
      </div>

      <fieldset>
        <legend className="mb-2 font-medium">
          What do you want to see? <span className="font-normal text-muted">(optional)</span>
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {modules.map((m) => (
            <label key={m.slug} className="flex cursor-pointer items-center gap-2 rounded-lg border border-line px-3 py-2.5 has-[:checked]:border-brand has-[:checked]:bg-brand-wash">
              <input type="checkbox" value={m.slug} className="h-4 w-4 accent-brand" {...register('modules')} />
              <span className="text-sm font-medium">{m.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <Label htmlFor="message" optional>
          Anything we should know?
        </Label>
        <textarea
          id="message"
          rows={4}
          placeholder="For example: we pay 120 people across two states and use biometric attendance."
          className={`${field} h-auto py-2.5`}
          {...register('message')}
        />
      </div>

      <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto">
        {status === 'sending' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending
          </>
        ) : (
          submitLabel
        )}
      </Button>
      <p className="text-sm text-muted">We use these details only to contact you about Arisotech HRMS.</p>
    </form>
  )
}
