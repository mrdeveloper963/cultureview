import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { USE_MOCK_DATA, mockCountries, mockCategories, mockPosts } from '@/lib/mock-data'
import { CategoryFilter } from '@/components/country/CategoryFilter'
import { PostList } from '@/components/post/PostList'
import '../../organic-theme.css'

async function getCountry(id: number) {
  if (USE_MOCK_DATA) {
    return mockCountries.find(c => c.id === id)
  }
  const country = await prisma.country.findUnique({
    where: { id },
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

async function getPosts(countryId: number, categoryId?: number) {
  if (USE_MOCK_DATA) {
    return mockPosts.filter(p =>
      p.countryId === countryId &&
      (categoryId ? p.categoryId === categoryId : true)
    )
  }
  const posts = await prisma.post.findMany({
    where: {
      countryId,
      isPublished: true,
      ...(categoryId ? { categoryId } : {}),
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
      category: true,
      country: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return posts
}

export default async function CountryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ category?: string }>
}) {
  const { id } = await params
  const { category } = await searchParams
  const countryId = parseInt(id)
  const categoryId = category ? parseInt(category) : undefined

  if (isNaN(countryId)) {
    notFound()
  }

  const [country, categories, posts] = await Promise.all([
    getCountry(countryId),
    getCategories(),
    getPosts(countryId, categoryId),
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
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter & Posts */}
      <div style={{ padding: '0 calc(var(--space-8) * 1.6) calc(var(--space-8) * 3)' }}>
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Cultural Experiences</h2>
          <CategoryFilter
            categories={categories}
            countryId={country.id}
            currentCategoryId={categoryId}
          />
        </div>

        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <div style={{ textAlign: 'center', padding: 'calc(var(--space-8) * 2)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto var(--space-4)', opacity: 0.4 }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-2)' }}>No Opinions Yet</h3>
            <p style={{ opacity: 0.7, marginBottom: 'var(--space-6)' }}>
              Be the first to share your experience about {country.nameEn} culture{categoryId ? ' in this category' : ''}!
            </p>
            <Link href={`/posts/new?country=${country.id}${categoryId ? `&category=${categoryId}` : ''}`} className="organic-btn organic-btn-primary">
              Share Your Experience
            </Link>
          </div>
        )}
      </div>

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
