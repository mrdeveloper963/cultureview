import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LoginForm } from '@/components/auth/LoginForm'
import Link from 'next/link'
import { Globe } from 'lucide-react'

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Globe className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">CultureView</span>
        </Link>

        {/* Login Card */}
        <div className="bg-background rounded-lg border shadow-lg p-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to share your cultural experiences
            </p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/auth/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-foreground">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
