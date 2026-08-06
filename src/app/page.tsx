import Link from 'next/link'
import { prisma } from '@/lib/db'
import { CountrySearch } from '@/components/home/CountrySearch'
import { Navigation } from '@/components/layout/Navigation'
import './organic-theme.css'

// ISR: Revalidate every 60 seconds
export const revalidate = 60

async function getCountries() {
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

async function getCategories() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      slug: true,
      nameEn: true,
      descriptionEn: true,
      icon: true,
      displayOrder: true,
    },
    orderBy: { displayOrder: 'asc' },
  })
  return categories
}

export default async function HomePage() {
  const [countries, categories] = await Promise.all([
    getCountries(),
    getCategories(),
  ])

  const stats = {
    countries: countries.length,
    opinions: countries.reduce((sum, c) => sum + c.totalPosts, 0),
    categories: categories.length,
  }

  return (
    <div className="organic-theme">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <header className="site-header" style={{ padding: 'calc(var(--space-8) * 3) calc(var(--space-8) * 1.6) calc(var(--space-8) * 2)', maxWidth: '760px' }}>
        <div className="organic-tag organic-tag-accent" style={{ marginBottom: 'var(--space-3)' }}>
          A COMMUNITY OF PEOPLE WHO HAVE BEEN THERE
        </div>
        <h1>What&apos;s a country really like? Ask the people who&apos;ve lived it.</h1>
        <p style={{ fontSize: '17px', opacity: 0.85, maxWidth: '600px', margin: 0 }}>
          Real opinions on work, food, family, manners, and more — shared by locals, travelers, and expats, and rated by everyone else. No brochures, no clichés.
        </p>

        {/* Search Bar */}
        <div style={{ marginTop: 'var(--space-4)' }}>
          <CountrySearch countries={countries} />
        </div>

        {/* Popular Countries */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', alignItems: 'center', marginTop: 'var(--space-3)' }}>
          <span className="organic-card-meta" style={{ fontSize: '11px' }}>Popular:</span>
          {countries
            .filter(c => ['Japan', 'Germany', 'Brazil', 'India', 'France', 'United States'].includes(c.nameEn))
            .map((country) => (
              <Link key={country.id} href={`/countries/${country.id}`}>
                <button className="organic-tag organic-tag-outline">
                  {country.nameEn}
                </button>
              </Link>
            ))}
        </div>
      </header>

      {/* Stats Section */}
      <section style={{ padding: '0 calc(var(--space-8) * 1.6) calc(var(--space-8) * 2)' }}>
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '34px' }}>{stats.countries}</div>
            <div className="organic-card-meta">countries covered</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '34px' }}>{stats.opinions}</div>
            <div className="organic-card-meta">opinions shared</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '34px' }}>{stats.categories}</div>
            <div className="organic-card-meta">culture categories</div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: 'calc(var(--space-8) * 3) calc(var(--space-8) * 1.6)' }}>
        <h2>Browse by category</h2>
        <p className="organic-card-meta" style={{ fontSize: '14px', marginBottom: 'var(--space-6)', maxWidth: '520px' }}>
          Every opinion lives inside one of these — so you can compare like with like.
        </p>
        <div className="cats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
          {categories.map((category, i) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <div className="organic-card reveal" style={{ gap: 'var(--space-3)', animationDelay: `${i * 0.05}s` }}>
                <div style={{ width: '44px', height: '44px', fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-accent-100)', borderRadius: '12px' }}>
                  {category.icon}
                </div>
                <div className="organic-card-title">{category.nameEn}</div>
                <p className="organic-card-body">{category.descriptionEn}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Countries Section */}
      <section style={{ padding: '0 calc(var(--space-8) * 1.6) calc(var(--space-8) * 3)' }}>
        <h2>Where people are talking</h2>
        <p className="organic-card-meta" style={{ fontSize: '14px', marginBottom: 'var(--space-6)', maxWidth: '520px' }}>
          Countries with the most active conversations this month.
        </p>
        <div className="country-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
          {countries.slice(0, 6).map((country, i) => (
            <Link key={country.id} href={`/countries/${country.id}`}>
              <div className="organic-card organic-card-horizontal reveal" style={{ gap: 'var(--space-3)', animationDelay: `${i * 0.05}s` }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0, overflow: 'hidden', border: '2px solid var(--color-divider)' }}>
                  <img
                    src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`}
                    alt={`${country.nameEn} flag`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="eager"
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="organic-card-title" style={{ fontSize: '16px' }}>{country.nameEn}</div>
                  <div className="organic-card-meta">{country.totalPosts} opinions</div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" style={{ flexShrink: 0, color: 'var(--color-accent)' }}>
                  <line x1="4" y1="12" x2="18" y2="12"></line>
                  <polyline points="12 6 18 12 12 18"></polyline>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '0 calc(var(--space-8) * 1.6) calc(var(--space-8) * 3)' }}>
        <h2>From people who&apos;ve actually been there</h2>
        <p className="organic-card-meta" style={{ fontSize: '14px', marginBottom: 'var(--space-6)', maxWidth: '520px' }}>
          Every opinion is tagged with how the person knows the country.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
          {[
            { quote: "I moved to Berlin for work and the biggest surprise wasn't the language — it was how seriously people take being five minutes early.", tag: 'Lived in Germany · 3 years' },
            { quote: 'Everyone told me Brazilians were loud and always late. My experience was the opposite once I actually had local friends.', tag: 'Traveled to Brazil' },
            { quote: "In Japan, silence in a conversation isn't awkward, it's normal. Took me months to stop trying to fill every gap.", tag: 'Lived in Japan · 2 years' },
          ].map((testimonial, i) => (
            <div key={i} className="organic-card reveal" style={{ gap: 'var(--space-3)', animationDelay: `${i * 0.1}s` }}>
              <p className="organic-card-body" style={{ fontSize: '15px', fontStyle: 'italic', opacity: 0.95, flex: 1 }}>
                "{testimonial.quote}"
              </p>
              <div className="organic-card-meta">{testimonial.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '0 calc(var(--space-8) * 1.6) calc(var(--space-8) * 3)' }}>
        <h2 style={{ marginBottom: 'var(--space-6)' }}>How CultureView works</h2>
        <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          {[
            { num: '01', title: 'Pick a country and a category', text: "Start with a place you're curious about, then narrow down to work, food, family, or any of the nine categories." },
            { num: '02', title: 'Read real experiences', text: "See what locals, travelers, and expats actually say — each opinion is tagged with how well they know the place." },
            { num: '03', title: 'Vote on what rings true', text: "Agree or disagree based on your own experience. The most trusted opinions rise to the top." },
          ].map((step) => (
            <div key={step.num} className="reveal" style={{ flex: 1, minWidth: '220px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', color: 'var(--color-accent)', marginBottom: 'var(--space-2)' }}>
                {step.num}
              </div>
              <div className="organic-card-title" style={{ fontSize: '19px', marginBottom: 'var(--space-1)' }}>
                {step.title}
              </div>
              <p className="organic-card-body" style={{ opacity: 0.8 }}>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '0 calc(var(--space-8) * 1.6) calc(var(--space-8) * 3)' }}>
        <div style={{ background: 'var(--color-accent-100)', borderRadius: 'var(--radius-lg)', padding: 'calc(var(--space-8) * 1.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '460px' }}>
            <h2 style={{ marginBottom: 'var(--space-2)' }}>Add your voice</h2>
            <p style={{ fontSize: '16px', opacity: 0.85, margin: 0 }}>
              Sign up to share your own experience, vote on opinions, and help build an honest picture of every country.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Link href="/auth/signup" className="organic-btn organic-btn-primary">
              Create free account
            </Link>
            <Link href="/" className="organic-btn" style={{ border: '1px solid var(--color-divider)' }}>
              Browse without an account
            </Link>
          </div>
        </div>
      </section>

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
              <Link href="/countries">Countries</Link>
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
              <Link href="/terms">Terms of use</Link>
              <Link href="/privacy">Privacy policy</Link>
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
