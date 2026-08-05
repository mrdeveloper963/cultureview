import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LoginForm } from '@/components/auth/LoginForm'
import Link from 'next/link'
import '../../../app/organic-theme.css'

export default async function LoginPage() {
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
          <Link href="/auth/signup" className="organic-btn organic-btn-primary" style={{ whiteSpace: 'nowrap' }}>
            Sign up
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8) var(--space-4)' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <h1 style={{ marginBottom: 'var(--space-2)' }}>Welcome Back</h1>
            <p style={{ fontSize: '15px', opacity: 0.8 }}>
              Sign in to share your cultural experiences
            </p>
          </div>

          {/* Login Card */}
          <div className="organic-card" style={{ padding: 'var(--space-6)', gap: 'var(--space-4)' }}>
            <LoginForm />

            <div style={{ textAlign: 'center', fontSize: '14px', marginTop: 'var(--space-2)' }}>
              <span style={{ opacity: 0.7 }}>Don&apos;t have an account? </span>
              <Link href="/auth/signup" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}>
                Sign up
              </Link>
            </div>
          </div>

          <p style={{ marginTop: 'var(--space-4)', textAlign: 'center', fontSize: '12px', opacity: 0.6 }}>
            By continuing, you agree to our{' '}
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
