import { Suspense } from 'react'
import { prisma } from '@/lib/db'
import { PostForm } from '@/components/post/PostForm'
import Link from 'next/link'
import '../../organic-theme.css'

async function getCountries() {
  const countries = await prisma.country.findMany({
    orderBy: { nameEn: 'asc' },
  })
  return countries
}

async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { displayOrder: 'asc' },
  })
  return categories
}

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string; category?: string }>
}) {
  const params = await searchParams
  const [countries, categories] = await Promise.all([
    getCountries(),
    getCategories(),
  ])

  return (
    <div className="organic-theme" style={{ minHeight: '100vh' }}>
      {/* Navigation */}
      <nav className="organic-nav" style={{ padding: 'var(--space-4) calc(var(--space-8) * 1.6)', flexWrap: 'wrap' }}>
        <Link href="/" className="organic-brand" style={{ whiteSpace: 'nowrap', textDecoration: 'none', color: 'inherit' }}>
          CultureView
        </Link>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexShrink: 0 }}>
          <Link href="/auth/login" className="organic-btn organic-btn-ghost" style={{ whiteSpace: 'nowrap' }}>
            Log in
          </Link>
          <Link href="/auth/signup" className="organic-btn organic-btn-primary" style={{ whiteSpace: 'nowrap' }}>
            Sign up
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>
        {/* Back Button */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <Link href="/" className="organic-btn organic-btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back
          </Link>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{ marginBottom: 'var(--space-3)' }}>Share Your Experience</h1>
          <p style={{ fontSize: '16px', opacity: 0.8, maxWidth: '700px' }}>
            Share your authentic cultural experiences and insights with the community.
            Your perspective helps others understand different cultures better.
          </p>
        </div>

        {/* Form */}
        <Suspense fallback={<div>Loading...</div>}>
          <PostForm
            countries={countries}
            categories={categories}
            defaultCountryId={params.country ? parseInt(params.country) : undefined}
            defaultCategoryId={params.category ? parseInt(params.category) : undefined}
          />
        </Suspense>
      </div>

      {/* Footer */}
      <footer style={{ padding: 'calc(var(--space-8) * 2) calc(var(--space-8) * 1.6) calc(var(--space-8) * 1.6)', display: 'flex', justifyContent: 'space-between', gap: 'var(--space-8)', flexWrap: 'wrap', marginTop: 'calc(var(--space-8) * 3)' }}>
        <div style={{ maxWidth: '280px' }}>
          <div className="organic-brand" style={{ marginBottom: 'var(--space-2)' }}>CultureView</div>
          <p className="organic-card-meta" style={{ fontSize: '13px' }}>Real culture, from real people.</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
          <div>
            <div className="organic-card-kicker" style={{ marginBottom: 'var(--space-2)' }}>Explore</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <Link href="/">Countries</Link>
              <Link href="/">Categories</Link>
              <Link href="/">Trending</Link>
            </div>
          </div>
          <div>
            <div className="organic-card-kicker" style={{ marginBottom: 'var(--space-2)' }}>Company</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <Link href="/">About</Link>
              <Link href="/guidelines">Content guidelines</Link>
            </div>
          </div>
          <div>
            <div className="organic-card-kicker" style={{ marginBottom: 'var(--space-2)' }}>Legal</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <Link href="/">Terms of use</Link>
              <Link href="/">Privacy policy</Link>
            </div>
          </div>
        </div>
      </footer>

      <div className="organic-hr" style={{ margin: '0 calc(var(--space-8) * 1.6) var(--space-4)' }}></div>
      <div className="organic-card-meta" style={{ padding: '0 calc(var(--space-8) * 1.6) var(--space-6)', fontSize: '12px' }}>
        © 2026 CultureView. All opinions are user submitted.
      </div>
    </div>
  )
}
