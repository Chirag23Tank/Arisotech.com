import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Get environment variables with validation
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  
  // Validate that required environment variables are present
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      'Missing Supabase environment variables. ' +
      'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file'
    )
    throw new Error(
      'Supabase configuration is missing. Please check your environment variables.'
    )
  }
  
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

