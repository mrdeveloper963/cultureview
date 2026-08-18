import { createClient } from '@/lib/supabase/server'

export async function Navigation() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="organic-nav" style={{ padding: 'var(--space-4) calc(var(--space-8) * 1.6)', flexWrap: 'wrap' }}>
      <a href="/" className="organic-brand" style={{ whiteSpace: 'nowrap', textDecoration: 'none', color: 'inherit' }}>
        CultureView
      </a>
      <div className="organic-nav-links" style={{ marginRight: 'auto' }}>
        <a href="/countries">Countries</a>
        <a href="/#categories">Categories</a>
        <a href="/guidelines">Guidelines</a>
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexShrink: 0 }}>
        {user ? (
          // User is logged in - show profile icon
          <a
            href="/profile"
            className="organic-btn organic-btn-primary"
            style={{
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              padding: '0'
            }}
            title={user.email || 'Profile'}
          >
            👤
          </a>
        ) : (
          // User is not logged in - show login/signup buttons
          <>
            <a href="/auth/login" className="organic-btn organic-btn-ghost" style={{ whiteSpace: 'nowrap', textDecoration: 'none' }}>
              Log in
            </a>
            <a href="/auth/signup" className="organic-btn organic-btn-primary" style={{ whiteSpace: 'nowrap', textDecoration: 'none' }}>
              Sign up
            </a>
          </>
        )}
      </div>
    </nav>
  )
}
