import Link from 'next/link'
import { Navigation } from '@/components/layout/Navigation'
import { prisma } from '@/lib/db'
import '../organic-theme.css'

// ISR: Revalidate every 3600 seconds (1 hour)
export const revalidate = 3600

async function getAllCountries() {
  const countries = await prisma.country.findMany({
    select: {
      id: true,
      nameEn: true,
      code: true,
      totalPosts: true,
    },
    orderBy: { nameEn: 'asc' },
  })
  return countries
}

export default async function CountriesPage() {
  const countries = await getAllCountries()

  return (
    <div className="organic-theme" style={{ minHeight: '100vh' }}>
      <Navigation />

      {/* Hero Section */}
      <header className="site-header" style={{ padding: 'calc(var(--space-8) * 2) calc(var(--space-8) * 1.6) calc(var(--space-8) * 1.5)', maxWidth: '720px', textAlign: 'center', margin: '0 auto' }}>
        <div style={{ fontSize: '48px', marginBottom: 'var(--space-3)' }}>🌍</div>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>All Countries</h1>
        <p style={{ fontSize: '17px', opacity: 0.85, maxWidth: '600px', margin: '0 auto' }}>
          Browse cultural insights and experiences from {countries.length} countries around the world
        </p>
      </header>

      {/* Countries Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 calc(var(--space-8) * 1.6) calc(var(--space-8) * 3)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
          {countries.map((country, i) => (
            <Link key={country.id} href={`/countries/${country.id}`}>
              <div className="organic-card reveal" style={{ gap: 'var(--space-3)', animationDelay: `${(i % 20) * 0.03}s`, transition: 'all 0.2s ease' }}>
                {/* Flag */}
                <div style={{ width: '100%', height: '140px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-divider)' }}>
                  <img
                    src={`https://flagcdn.com/w320/${country.code.toLowerCase()}.png`}
                    alt={`${country.nameEn} flag`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                </div>

                {/* Country Info */}
                <div>
                  <div className="organic-card-title" style={{ fontSize: '18px', marginBottom: 'var(--space-1)' }}>
                    {country.nameEn}
                  </div>
                  <div className="organic-card-meta">
                    {country.totalPosts} {country.totalPosts === 1 ? 'opinion' : 'opinions'}
                  </div>
                </div>

                {/* Arrow Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-accent)', fontSize: '14px', fontWeight: 600 }}>
                  <span>View opinions</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="4" y1="12" x2="18" y2="12"></line>
                    <polyline points="12 6 18 12 12 18"></polyline>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {countries.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'calc(var(--space-8) * 2)' }}>
            <div style={{ fontSize: '64px', marginBottom: 'var(--space-3)' }}>🌐</div>
            <h2 style={{ marginBottom: 'var(--space-2)' }}>No Countries Yet</h2>
            <p className="organic-card-body">
              Countries will appear here once opinions are shared.
            </p>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 calc(var(--space-8) * 1.6) calc(var(--space-8) * 3)' }}>
        <div style={{ background: 'var(--color-accent-100)', borderRadius: 'var(--radius-lg)', padding: 'calc(var(--space-8) * 1.4)', textAlign: 'center' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Can't find your country?</h2>
          <p style={{ fontSize: '16px', opacity: 0.85, marginBottom: 'var(--space-4)', maxWidth: '500px', margin: '0 auto var(--space-4)' }}>
            Be the first to share your cultural experiences and help others understand what life is really like there.
          </p>
          <Link href="/auth/signup" className="organic-btn organic-btn-primary" style={{ textDecoration: 'none' }}>
            Share Your Experience
          </Link>
        </div>
      </div>
    </div>
  )
}
