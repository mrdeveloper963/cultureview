import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { PostList } from '@/components/post/PostList'
import { CountryFilter } from '@/components/category/CountryFilter'
import { Navigation } from '@/components/layout/Navigation'
import '../../organic-theme.css'

// ISR: Revalidate every 60 seconds
export const revalidate = 60

async function getCategory(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      nameEn: true,
      descriptionEn: true,
      icon: true,
    },
  })
  return category
}

async function getCountries() {
  const countries = await prisma.country.findMany({
    select: {
      id: true,
      nameEn: true,
      totalPosts: true,
    },
    orderBy: { nameEn: 'asc' },
  })
  return countries
}

async function getPosts(categoryId: number, countryId?: number) {
  const posts = await prisma.post.findMany({
    where: {
      categoryId,
      isPublished: true,
      ...(countryId ? { countryId } : {}),
    },
    select: {
      id: true,
      userId: true,
      title: true,
      content: true,
      experienceType: true,
      likesCount: true,
      dislikesCount: true,
      commentsCount: true,
      createdAt: true,
      categoryId: true,
      countryId: true,
      category: {
        select: {
          id: true,
          nameEn: true,
          icon: true,
        },
      },
      country: {
        select: {
          id: true,
          nameEn: true,
          code: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 50, // Limit results
  })

  // Add user info
  return posts.map(post => ({
    ...post,
    user: {
      id: post.userId,
      email: 'user@example.com',
    },
  }))
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ country?: string }>
}) {
  const { slug } = await params
  const { country } = await searchParams
  const countryId = country ? parseInt(country) : undefined

  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const [countries, posts] = await Promise.all([
    getCountries(),
    getPosts(category.id, countryId).catch(() => []),
  ])

  const selectedCountry = countryId ? countries.find(c => c.id === countryId) : null

  return (
    <div className="organic-theme" style={{ minHeight: '100vh' }}>
      {/* Navigation */}
      <Navigation />

      {/* Back Button */}
      <div style={{ padding: '0 calc(var(--space-8) * 1.6)', marginBottom: 'var(--space-4)' }}>
        <Link href="/" className="organic-btn organic-btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Category Header */}
      <div style={{ padding: '0 calc(var(--space-8) * 1.6) calc(var(--space-8) * 2)' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--space-6)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
          {/* Icon */}
          {category.icon && (
            <div style={{ width: '120px', height: '120px', borderRadius: 'var(--radius-lg)', background: 'var(--color-accent-100)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', boxShadow: 'var(--shadow-md)' }}>
              {category.icon}
            </div>
          )}

          {/* Info */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <h1 style={{ marginBottom: 'var(--space-2)' }}>{category.nameEn}</h1>
              {category.descriptionEn && (
                <p style={{ fontSize: '18px', opacity: 0.8, margin: 0 }}>
                  {category.descriptionEn}
                </p>
              )}
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', opacity: 0.7, marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span style={{ fontWeight: 600 }}>
                  {posts.length} {posts.length === 1 ? 'Opinion' : 'Opinions'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M2 12h20"></path>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <span style={{ fontWeight: 600 }}>
                  All Countries
                </span>
              </div>
            </div>

            {/* Action Button */}
            <Link href={`/posts/new?category=${category.id}`} className="organic-btn organic-btn-primary">
              Share Your Experience
            </Link>
          </div>
        </div>
      </div>

      {/* Country Filter & Posts */}
      <div style={{ padding: '0 calc(var(--space-8) * 1.6) calc(var(--space-8) * 3)' }}>
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>
            {selectedCountry ? `Experiences from ${selectedCountry.nameEn}` : 'All Experiences'}
          </h2>

          {/* Country Filter Dropdown */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
            <CountryFilter
              countries={countries}
              categorySlug={slug}
              currentCountryId={countryId}
            />

            {selectedCountry && (
              <Link href={`/categories/${slug}`} className="organic-btn organic-btn-ghost" style={{ fontSize: '13px' }}>
                Clear filter
              </Link>
            )}
          </div>
        </div>

        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <div style={{ textAlign: 'center', padding: 'calc(var(--space-8) * 2)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)' }}>
            <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>{category.icon}</div>
            <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-2)' }}>No Opinions Yet</h3>
            <p style={{ opacity: 0.7, marginBottom: 'var(--space-6)' }}>
              Be the first to share your experience about {category.nameEn}
              {selectedCountry ? ` in ${selectedCountry.nameEn}` : ''}!
            </p>
            <Link
              href={`/posts/new?category=${category.id}${countryId ? `&country=${countryId}` : ''}`}
              className="organic-btn organic-btn-primary"
            >
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
