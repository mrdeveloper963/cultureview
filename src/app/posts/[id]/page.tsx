import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Navigation } from '@/components/layout/Navigation'
import { VoteButtons } from '@/components/post/VoteButtons'
import { CommentSection } from '@/components/post/CommentSection'
import '../../organic-theme.css'

async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      country: true,
      category: true,
      comments: {
        orderBy: { createdAt: 'desc' },
        take: 50,
      },
    },
  })

  return post
}

const EXPERIENCE_TYPE_LABELS: Record<string, string> = {
  native: 'Local',
  lived: 'Lived there',
  visited: 'Visited',
  heard: 'Heard from others',
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  const formatDate = (date: Date) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const agreementPercent = post.likesCount + post.dislikesCount > 0
    ? Math.round((post.likesCount / (post.likesCount + post.dislikesCount)) * 100)
    : 0

  return (
    <div className="organic-theme" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />

      {/* Main Content */}
      <main style={{ flex: 1, padding: 'var(--space-6) calc(var(--space-8) * 1.6) calc(var(--space-8) * 2)' }}>
        {/* Back Button */}
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <Link href={`/countries/${post.countryId}`} className="organic-btn organic-btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', paddingLeft: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to {post.country.nameEn}
          </Link>
        </div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 'var(--space-6)', maxWidth: '1200px', alignItems: 'start' }}>
          {/* Left Column - Post */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {/* Post Card */}
            <div className="organic-card" style={{ padding: 'var(--space-6)', gap: 'var(--space-4)' }}>
              {/* Header with badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--color-divider)' }}>
                    <img
                      src={`https://flagcdn.com/w80/${post.country.code.toLowerCase()}.png`}
                      alt={post.country.nameEn}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      loading="eager"
                    />
                  </div>
                  <Link href={`/countries/${post.country.id}`} className="organic-tag organic-tag-accent" style={{ textDecoration: 'none' }}>
                    {post.country.nameEn}
                  </Link>
                </div>

                {post.category.icon && (
                  <Link href={`/countries/${post.countryId}?category=${post.categoryId}`} className="organic-tag organic-tag-outline" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', textDecoration: 'none' }}>
                    <span>{post.category.icon}</span>
                    <span>{post.category.nameEn}</span>
                  </Link>
                )}

                <span className="organic-tag organic-tag-accent-2">
                  {EXPERIENCE_TYPE_LABELS[post.experienceType] || post.experienceType}
                </span>
              </div>

              {/* Title */}
              {post.title && (
                <h1 style={{ fontSize: '28px', lineHeight: 1.3, margin: 0 }}>
                  {post.title}
                </h1>
              )}

              {/* Meta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: '13px', opacity: 0.65 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Anonymous</span>
                </div>
                <span>•</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>

              <div className="organic-hr"></div>

              {/* Content */}
              <p style={{ fontSize: '16px', lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>
                {post.content}
              </p>

              <div className="organic-hr"></div>

              {/* Vote Buttons */}
              <VoteButtons
                postId={post.id}
                initialLikes={post.likesCount}
                initialDislikes={post.dislikesCount}
              />
            </div>

            {/* Comments Section */}
            <div className="organic-card" style={{ padding: 'var(--space-6)', gap: 'var(--space-4)' }}>
              <h3 style={{ fontSize: '20px', margin: 0 }}>
                Comments ({post.commentsCount})
              </h3>
              <div className="organic-hr"></div>
              <CommentSection postId={post.id} initialComments={post.comments} />
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', position: 'sticky', top: 'var(--space-4)' }}>
            {/* Stats */}
            <div className="organic-card" style={{ padding: 'var(--space-4)', gap: 'var(--space-3)' }}>
              <div className="organic-card-kicker">Engagement</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-accent)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                  <span style={{ fontWeight: 700, fontSize: '20px' }}>{post.likesCount}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: '#dc2626' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'rotate(180deg)' }}>
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                  <span style={{ fontWeight: 700, fontSize: '20px' }}>{post.dislikesCount}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', opacity: 0.7 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span style={{ fontWeight: 700, fontSize: '20px' }}>{post.commentsCount}</span>
                </div>
              </div>

              <div className="organic-hr"></div>

              <div className="organic-card-kicker">Agreement</div>
              <div style={{ height: '8px', background: 'var(--color-divider)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${agreementPercent}%`,
                  background: 'var(--color-accent)',
                  transition: 'width 0.3s ease-out',
                }} />
              </div>
              <div className="organic-card-meta">
                {agreementPercent > 0 ? `${agreementPercent}% agree` : 'No votes yet'}
              </div>
            </div>

            {/* Category Info */}
            {post.category.icon && (
              <div className="organic-card" style={{ padding: 'var(--space-4)', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--space-3)' }}>
                  <span style={{ fontSize: '36px', lineHeight: 1 }}>{post.category.icon}</span>
                  <div>
                    <div className="organic-card-title" style={{ fontSize: '16px', marginBottom: 'var(--space-1)' }}>
                      {post.category.nameEn}
                    </div>
                    {post.category.descriptionEn && (
                      <p className="organic-card-body" style={{ margin: 0 }}>
                        {post.category.descriptionEn}
                      </p>
                    )}
                  </div>
                </div>
                <Link
                  href={`/countries/${post.countryId}?category=${post.categoryId}`}
                  className="organic-btn organic-btn-outline"
                  style={{ width: '100%', textAlign: 'center', textDecoration: 'none' }}
                >
                  View All
                </Link>
              </div>
            )}

            {/* CTA */}
            <div className="organic-card" style={{ padding: 'var(--space-4)', gap: 'var(--space-3)', background: 'var(--color-accent-100)' }}>
              <div className="organic-card-title" style={{ fontSize: '15px' }}>
                Share your experience
              </div>
              <p className="organic-card-body" style={{ margin: 0 }}>
                Been to {post.country.nameEn}? Add your perspective.
              </p>
              <Link
                href={`/posts/new?country=${post.countryId}&category=${post.categoryId}`}
                className="organic-btn organic-btn-primary"
                style={{ width: '100%', textAlign: 'center', textDecoration: 'none' }}
              >
                Share Your Story
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ padding: 'calc(var(--space-8) * 2) calc(var(--space-8) * 1.6) calc(var(--space-8) * 1.6)', display: 'flex', justifyContent: 'space-between', gap: 'var(--space-8)', flexWrap: 'wrap', borderTop: '1px solid var(--color-divider)', marginTop: 'auto' }}>
        <div style={{ maxWidth: '280px' }}>
          <div className="organic-brand" style={{ marginBottom: 'var(--space-2)' }}>CultureView</div>
          <p className="organic-card-meta">Real culture, from real people.</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
          <div>
            <div className="organic-card-kicker" style={{ marginBottom: 'var(--space-2)' }}>Explore</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: '14px' }}>
              <Link href="/countries" style={{ textDecoration: 'none', color: 'inherit' }}>Countries</Link>
            </div>
          </div>
          <div>
            <div className="organic-card-kicker" style={{ marginBottom: 'var(--space-2)' }}>Company</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: '14px' }}>
              <Link href="/guidelines" style={{ textDecoration: 'none', color: 'inherit' }}>Content guidelines</Link>
            </div>
          </div>
          <div>
            <div className="organic-card-kicker" style={{ marginBottom: 'var(--space-2)' }}>Legal</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: '14px' }}>
              <Link href="/terms" style={{ textDecoration: 'none', color: 'inherit' }}>Terms of use</Link>
              <Link href="/privacy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy policy</Link>
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
