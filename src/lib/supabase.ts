import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Debug logging for environment variables
if (typeof window === 'undefined') {
  console.log('=== Supabase Environment Variables Debug ===')
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing')
  console.log('NODE_ENV:', process.env.NODE_ENV)
  console.log('============================================')
}

// Validate URL format
const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Only create client if environment variables are available and valid
export const supabase = supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database types for TypeScript
export interface User {
  id: string
  email: string
  created_at: string
  birth_chart?: BirthChart
}

export interface BirthChart {
  id: string
  user_id: string
  birth_date: string
  birth_time: string
  birth_place: string
  sun_sign: string
  moon_sign: string
  created_at: string
}

export interface JournalEntry {
  id: string
  user_id: string
  prompt: string
  response?: string
  saved_at: string
  created_at: string
} 