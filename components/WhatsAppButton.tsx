import { MessageCircle } from 'lucide-react'
import siteConfig from '@/content/site-config.json'

export default function WhatsAppButton() {
  const message = 'Hi, I would like to know more about Arisotech HRMS.'
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg hover:bg-[#1eb455]"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" aria-hidden />
    </a>
  )
}
