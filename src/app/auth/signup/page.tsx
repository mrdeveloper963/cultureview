import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SignUpForm } from '@/components/auth/SignUpForm'
import Link from 'next/link'
import '../../../app/organic-theme.css'

export default async function SignUpPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className="organic-theme" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <nav className="organic-nav" style={{ padding: 'var(--space-4) calc(var(--space-8) * 1.6)', flexWrap: 'wrap' }}>
        <Link href="/" className="organic-brand" style={{ whiteSpace: 'nowrap', textDecoration: 'none', color: 'inherit' }}>
          CultureView
        </Link>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexShrink: 0 }}>
          <Link href="/auth/login" className="organic-btn organic-btn-ghost" style={{ whiteSpace: 'nowrap' }}>
            Log in
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8) var(--space-4)' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <h1 style={{ marginBottom: 'var(--space-2)' }}>Create Account</h1>
            <p style={{ fontSize: '15px', opacity: 0.8 }}>
              Join our community to share your experiences
            </p>
          </div>

          {/* Sign Up Card */}
          <div className="organic-card" style={{ padding: 'var(--space-6)', gap: 'var(--space-4)' }}>
            <SignUpForm />

            <div style={{ textAlign: 'center', fontSize: '14px', marginTop: 'var(--space-2)' }}>
              <span style={{ opacity: 0.7 }}>Already have an account? </span>
              <Link href="/auth/login" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}>
                Sign in
              </Link>
            </div>
          </div>

          <p style={{ marginTop: 'var(--space-4)', textAlign: 'center', fontSize: '12px', opacity: 0.6 }}>
            By creating an account, you agree to our{' '}
            <Link href="/terms" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
