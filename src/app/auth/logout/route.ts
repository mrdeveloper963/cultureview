import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function POST() {
  const supabase = await createClient()

  await supabase.auth.signOut()

  // Get the origin from request headers
  const headersList = await headers()
  const origin = headersList.get('origin') || headersList.get('referer') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const baseUrl = origin.replace(/\/$/, '') // Remove trailing slash

  return NextResponse.redirect(new URL('/', baseUrl))
}
