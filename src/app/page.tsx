import Link from 'next/link'
import { mockCountries, mockCategories, USE_MOCK_DATA } from '@/lib/mock-data'
import { prisma } from '@/lib/db'

async function getCountries() {
  if (USE_MOCK_DATA) {
    return mockCountries
  }
  const countries = await prisma.country.findMany({
    orderBy: { nameEn: 'asc' },
  })
  return countries
}

async function getCategories() {
  if (USE_MOCK_DATA) {
    return mockCategories
  }
  const categories = await prisma.category.findMany({
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
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caprasimo:wght@400&family=Figtree:wght@400;600;700&display=swap');

        .organic-theme {
          --color-bg: #f5ead8;
          --color-surface: #ebddc5;
          --color-text: #201e1d;
          --color-accent: #c67139;
          --color-accent-2: #7a8a5e;
          --color-divider: color-mix(in srgb, #201e1d 16%, transparent);
          --color-accent-100: #fff2eb;
          --color-accent-600: #b2622d;
          --color-accent-800: #643312;
          --color-accent-2-100: #f0fae1;
          --font-heading: "Caprasimo", system-ui, sans-serif;
          --font-body: "Figtree", system-ui, sans-serif;
          --space-2: 8.8px;
          --space-3: 13.2px;
          --space-4: 17.6px;
          --space-6: 26.4px;
          --space-8: 35.2px;
          --radius-md: 16px;
          --radius-lg: 28px;
          --shadow-md: 0 3px 10px color-mix(in srgb, #2e2b25 16%, transparent);

          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          background: var(--color-bg);
          color: var(--color-text);
          font-family: var(--font-body);
          min-height: 100vh;
        }

        .organic-theme h1, .organic-theme h2, .organic-theme h3 {
          font-family: var(--font-heading);
          font-weight: 400;
          line-height: 1.12;
          letter-spacing: -0.015em;
        }

        .organic-theme h1 { font-size: 42px; margin-bottom: var(--space-3); }
        .organic-theme h2 { font-size: 32px; margin-bottom: var(--space-4); }

        .organic-nav {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4) calc(var(--space-8) * 1.6);
          flex-wrap: wrap;
        }

        .organic-brand {
          font-family: var(--font-heading);
          font-size: 18px;
          margin-right: auto;
          white-space: nowrap;
        }

        .organic-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          font-family: var(--font-heading);
          font-size: 14px;
          padding: var(--space-2) calc(var(--space-3) * 1.2);
          border-radius: var(--radius-md);
          border: 1px solid transparent;
          transition: all 0.12s ease-out;
          text-decoration: none;
        }

        .organic-btn-primary {
          background: var(--color-accent);
          color: var(--color-bg);
        }

        .organic-btn-primary:hover {
          background: var(--color-accent-600);
        }

        .organic-btn-ghost {
          color: var(--color-accent);
        }

        .organic-btn-ghost:hover {
          background: color-mix(in srgb, var(--color-accent) 10%, transparent);
        }

        .organic-tag {
          display: inline-flex;
          font-size: 11px;
          letter-spacing: 0.02em;
          padding: 3px 10px;
          border-radius: calc(var(--radius-md) * 0.75);
        }

        .organic-tag-accent {
          background: var(--color-accent-100);
          color: var(--color-accent-800);
        }

        .organic-tag-outline {
          border: 1px solid var(--color-accent);
          color: var(--color-accent);
          cursor: pointer;
          transition: background 0.12s ease-out;
        }

        .organic-tag-outline:hover {
          background: var(--color-accent-100);
        }

        .organic-card {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          padding: var(--space-3);
          border-radius: var(--radius-md);
          background: var(--color-surface);
          transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
        }

        .organic-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .organic-card-title {
          font-family: var(--font-heading);
          font-size: 17px;
          line-height: 1.2;
        }

        .organic-card-body {
          font-size: 13px;
          opacity: 0.8;
        }

        .organic-card-meta {
          font-size: 11px;
          color: color-mix(in srgb, var(--color-text) 50%, transparent);
        }

        .organic-input {
          width: 100%;
          min-height: 36px;
          padding: 6px 10px;
          padding-left: 32px;
          font: inherit;
          font-size: 14px;
          color: var(--color-text);
          background: var(--color-surface);
          border: 1px solid var(--color-divider);
          border-radius: var(--radius-md);
        }

        .organic-input:focus {
          outline: 2px solid var(--color-accent);
          outline-offset: 0;
          border-color: var(--color-accent);
        }

        .reveal {
          opacity: 0;
          transform: translateY(16px);
          animation: revealIn 0.5s ease-out forwards;
        }

        @keyframes revealIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 960px) {
          .cats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .country-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 640px) {
          .organic-nav { padding: var(--space-3) var(--space-4) !important; }
          .site-header { padding: calc(var(--space-8) * 1.6) var(--space-4) var(--space-6) !important; }
          .site-header h1 { font-size: 30px !important; }
          section { padding-left: var(--space-4) !important; padding-right: var(--space-4) !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .cats-grid { grid-template-columns: 1fr !important; }
          .country-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Navigation */}
      <nav className="organic-nav">
        <div className="organic-brand">CultureView</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
          <Link href="/auth/login" className="organic-btn organic-btn-ghost">
            Log in
          </Link>
          <Link href="/auth/signup" className="organic-btn organic-btn-primary">
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="site-header" style={{ padding: 'calc(var(--space-8) * 3) calc(var(--space-8) * 1.6) calc(var(--space-8) * 2)', maxWidth: '760px' }}>
        <div className="organic-tag organic-tag-accent" style={{ marginBottom: 'var(--space-3)' }}>
          A COMMUNITY OF PEOPLE WHO'VE BEEN THERE
        </div>
        <h1>What's a country really like? Ask the people who've lived it.</h1>
        <p style={{ fontSize: '17px', opacity: 0.85, maxWidth: '600px', margin: 0 }}>
          Real opinions on work, food, family, manners, and more — shared by locals, travelers, and expats, and rated by everyone else. No brochures, no clichés.
        </p>

        {/* Search Bar */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)', maxWidth: '520px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text)', opacity: 0.55 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="10.5" cy="10.5" r="6.5"></circle>
                <line x1="21" y1="21" x2="15.5" y2="15.5"></line>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search for a country, like Japan or Brazil"
              className="organic-input"
            />
          </div>
          <button className="organic-btn organic-btn-primary">Search</button>
        </div>

        {/* Popular Countries */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', alignItems: 'center', marginTop: 'var(--space-3)' }}>
          <span className="organic-card-meta" style={{ fontSize: '11px' }}>Popular:</span>
          {['Japan', 'Germany', 'Brazil', 'India', 'France', 'United States'].map((country) => (
            <button key={country} className="organic-tag organic-tag-outline">
              {country}
            </button>
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
                <div className="organic-card-meta">142 opinions</div>
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
              <div className="organic-card reveal" style={{ flexDirection: 'row', alignItems: 'center', gap: 'var(--space-3)', animationDelay: `${i * 0.05}s` }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--color-accent-2-100)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontSize: '14px', color: 'var(--color-accent)' }}>
                  {country.code}
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
        <h2>From people who've actually been there</h2>
        <p className="organic-card-meta" style={{ fontSize: '14px', marginBottom: 'var(--space-6)', maxWidth: '520px' }}>
          Every opinion is tagged with how the person knows the country.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
          {[
            { quote: "I moved to Berlin for work and the biggest surprise wasn't the language — it was how seriously people take being five minutes early.", tag: 'Lived in Germany · 3 years' },
            { quote: 'Everyone told me Brazilians were loud and always late. My experience was the opposite once I actually had local friends.', tag: 'Traveled to Brazil' },
            { quote: 'In Japan, silence in a conversation isn\'t awkward, it\'s normal. Took me months to stop trying to fill every gap.', tag: 'Lived in Japan · 2 years' },
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
            { num: '01', title: 'Pick a country and a category', text: 'Start with a place you're curious about, then narrow down to work, food, family, or any of the nine categories.' },
            { num: '02', title: 'Read real experiences', text: 'See what locals, travelers, and expats actually say — each opinion is tagged with how well they know the place.' },
            { num: '03', title: 'Vote on what rings true', text: 'Agree or disagree based on your own experience. The most trusted opinions rise to the top.' },
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
      <footer style={{ padding: 'calc(var(--space-8) * 2) calc(var(--space-8) * 1.6) var(--space-6)', display: 'flex', justifyContent: 'space-between', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
        <div style={{ maxWidth: '280px' }}>
          <div className="organic-brand" style={{ marginBottom: 'var(--space-2)' }}>CultureView</div>
          <p className="organic-card-meta" style={{ fontSize: '13px' }}>Real culture, from real people.</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
          <div>
            <div className="organic-card-meta" style={{ marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px' }}>Explore</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <Link href="/">Countries</Link>
              <Link href="/">Categories</Link>
            </div>
          </div>
          <div>
            <div className="organic-card-meta" style={{ marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px' }}>Company</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <Link href="/guidelines">Content guidelines</Link>
            </div>
          </div>
        </div>
      </footer>

      <div style={{ height: '1px', margin: '0 calc(var(--space-8) * 1.6) var(--space-4)', background: 'var(--color-divider)' }}></div>
      <div className="organic-card-meta" style={{ padding: '0 calc(var(--space-8) * 1.6) var(--space-6)', fontSize: '12px' }}>
        © 2026 CultureView. All opinions are user submitted.
      </div>
    </div>
  )
}
