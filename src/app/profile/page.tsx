import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Navigation } from '@/components/layout/Navigation'
import '../../app/organic-theme.css'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If not logged in, redirect to login
  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="organic-theme" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8) var(--space-4)' }}>
        <div style={{ width: '100%', maxWidth: '600px' }}>
          {/* Welcome Card */}
          <div className="organic-card" style={{ padding: 'var(--space-8)', gap: 'var(--space-6)', textAlign: 'center' }}>
            {/* Profile Icon */}
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
                margin: '0 auto'
              }}
            >
              👤
            </div>

            {/* Welcome Message */}
            <div>
              <h1 style={{ marginBottom: 'var(--space-2)', fontSize: '32px' }}>Welcome! 👋</h1>
              <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: 'var(--space-1)' }}>
                Welcome to CultureView
              </p>
            </div>

            {/* User Info */}
            <div
              style={{
                background: 'rgba(var(--color-accent-rgb), 0.1)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-md)',
                marginTop: 'var(--space-2)'
              }}
            >
              <p style={{ fontSize: '14px', opacity: 0.7, marginBottom: 'var(--space-1)' }}>
                Your Email
              </p>
              <p style={{ fontSize: '16px', fontWeight: 600, wordBreak: 'break-all' }}>
                {user.email}
              </p>
            </div>

            {/* Logout Button */}
            <form action="/auth/logout" method="post" style={{ marginTop: 'var(--space-4)' }}>
              <button
                type="submit"
                className="organic-btn organic-btn-ghost"
                style={{ width: '100%' }}
              >
                Log out
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/" className="organic-btn organic-btn-primary" style={{ textDecoration: 'none' }}>
              🏠 Home
            </a>
            <a href="/posts/new" className="organic-btn organic-btn-primary" style={{ textDecoration: 'none' }}>
              ✍️ Write a Post
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
