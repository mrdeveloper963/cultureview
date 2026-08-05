import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { USE_MOCK_DATA, mockCountries, mockCategories } from '@/lib/mock-data'
import '../../organic-theme.css'

async function getCountry(id: number) {
  if (USE_MOCK_DATA) {
    return mockCountries.find(c => c.id === id)
  }
  const country = await prisma.country.findUnique({
    where: { id },
    include: {
      posts: {
        select: {
          categoryId: true,
        },
      },
    },
  })
  return country
}

async function getCategories() {
  if (USE_MOCK_DATA) {
    return mockCategories
  }
  const categories = await prisma.category.findMany({
    orderBy: {
      displayOrder: 'asc',
    },
  })
  return categories
}

export default async function CountryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const countryId = parseInt(id)

  if (isNaN(countryId)) {
    notFound()
  }

  const [country, categories] = await Promise.all([
    getCountry(countryId),
    getCategories(),
  ])

  if (!country) {
    notFound()
  }

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

      {/* Back Button */}
      <div style={{ padding: '0 calc(var(--space-8) * 1.6)', marginBottom: 'var(--space-4)' }}>
        <Link href="/" className="organic-btn organic-btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Countries
        </Link>
      </div>

      {/* Country Header */}
      <div style={{ padding: '0 calc(var(--space-8) * 1.6) calc(var(--space-8) * 2)' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--space-6)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
          {/* Flag */}
          <div style={{ width: '120px', height: '120px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--color-accent-2-100)', flexShrink: 0, boxShadow: 'var(--shadow-md)' }}>
            <img
              src={`https://flagcdn.com/w320/${country.code.toLowerCase()}.png`}
              alt={`${country.nameEn} flag`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: 'var(--space-3)', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <div>
                <h1 style={{ marginBottom: 'var(--space-2)' }}>{country.nameEn}</h1>
              </div>
              <div className="organic-tag organic-tag-accent" style={{ fontSize: '13px', padding: 'var(--space-2) var(--space-3)' }}>
                {country.code}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', opacity: 0.7, marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span style={{ fontWeight: 600 }}>
                  {country.totalPosts} {country.totalPosts === 1 ? 'Opinion' : 'Opinions'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <Link href={`/posts/new?country=${country.id}`} className="organic-btn organic-btn-primary">
                Share Your Experience
              </Link>
              <Link href={`/countries/${country.id}/all`} className="organic-btn" style={{ border: '1px solid var(--color-divider)' }}>
                View All Opinions
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: '0 calc(var(--space-8) * 1.6) calc(var(--space-8) * 3)' }}>
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h2 style={{ marginBottom: 'var(--space-2)' }}>Cultural Categories</h2>
          <p className="organic-card-meta" style={{ fontSize: '14px' }}>
            Explore different aspects of {country.nameEn} culture through community experiences.
          </p>
        </div>

        <div className="cats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
          {categories.map((category, i) => (
            <Link key={category.id} href={`/countries/${country.id}/categories/${category.id}`}>
              <div className="organic-card reveal" style={{ gap: 'var(--space-3)', animationDelay: `${i * 0.05}s` }}>
                <div style={{ fontSize: '32px', lineHeight: 1 }}>
                  {category.icon}
                </div>
                <div className="organic-card-title">{category.nameEn}</div>
                <p className="organic-card-body">{category.descriptionEn}</p>
                <div className="organic-card-meta">
                  {Math.floor(Math.random() * 50) + 10} opinions
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {country.totalPosts === 0 && (
        <div style={{ margin: '0 calc(var(--space-8) * 1.6) calc(var(--space-8) * 3)', textAlign: 'center', padding: 'calc(var(--space-8) * 2)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto var(--space-4)', opacity: 0.4 }}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-2)' }}>No Opinions Yet</h3>
          <p style={{ opacity: 0.7, marginBottom: 'var(--space-6)' }}>
            Be the first to share your experience about {country.nameEn} culture!
          </p>
          <Link href={`/posts/new?country=${country.id}`} className="organic-btn organic-btn-primary">
            Share Your Experience
          </Link>
        </div>
      )}

      {/* Footer */}
      <footer style={{ padding: 'calc(var(--space-8) * 2) calc(var(--space-8) * 1.6) calc(var(--space-8) * 1.6)', display: 'flex', justifyContent: 'space-between', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
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
