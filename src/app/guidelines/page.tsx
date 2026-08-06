import { Navigation } from '@/components/layout/Navigation'
import Link from 'next/link'
import '../organic-theme.css'

export default function GuidelinesPage() {
  return (
    <div className="organic-theme" style={{ minHeight: '100vh' }}>
      <Navigation />

      {/* Hero Section */}
      <header className="site-header" style={{ padding: 'calc(var(--space-8) * 2) calc(var(--space-8) * 1.6) calc(var(--space-8) * 1.5)', maxWidth: '720px', textAlign: 'center', margin: '0 auto' }}>
        <div style={{ fontSize: '48px', marginBottom: 'var(--space-3)' }}>🛡️</div>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>Community Guidelines</h1>
        <p style={{ fontSize: '17px', opacity: 0.85, maxWidth: '600px', margin: '0 auto' }}>
          Help us maintain a respectful, authentic, and educational community by following these guidelines
        </p>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '880px', margin: '0 auto', padding: '0 calc(var(--space-8) * 1.6) calc(var(--space-8) * 3)' }}>

        {/* Core Values */}
        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Our Core Values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            <div className="organic-card" style={{ padding: 'var(--space-5)', gap: 'var(--space-2)' }}>
              <div style={{ fontSize: '24px' }}>✨</div>
              <h3 className="organic-card-title">Authenticity</h3>
              <p className="organic-card-body">Share genuine, first-hand experiences based on real interactions with cultures</p>
            </div>
            <div className="organic-card" style={{ padding: 'var(--space-5)', gap: 'var(--space-2)' }}>
              <div style={{ fontSize: '24px' }}>🤝</div>
              <h3 className="organic-card-title">Respect</h3>
              <p className="organic-card-body">Treat all cultures, people, and perspectives with dignity and understanding</p>
            </div>
            <div className="organic-card" style={{ padding: 'var(--space-5)', gap: 'var(--space-2)' }}>
              <div style={{ fontSize: '24px' }}>🎓</div>
              <h3 className="organic-card-title">Education</h3>
              <p className="organic-card-body">Focus on learning and sharing knowledge rather than judging or generalizing</p>
            </div>
            <div className="organic-card" style={{ padding: 'var(--space-5)', gap: 'var(--space-2)' }}>
              <div style={{ fontSize: '24px' }}>🌍</div>
              <h3 className="organic-card-title">Nuance</h3>
              <p className="organic-card-body">Recognize that every country and culture has diversity and complexity</p>
            </div>
          </div>
        </section>

        {/* DO Section */}
        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-4)', color: '#16a34a' }}>✓ DO: Encouraged Practices</h2>
          <div className="organic-card" style={{ padding: 'var(--space-6)', gap: 'var(--space-4)' }}>
            {[
              { title: 'Share Personal Experiences', desc: '"During my 2 years working in Japan, I noticed that..." or "When I visited Morocco, I experienced..."' },
              { title: 'Provide Context', desc: 'Mention when and where your experience occurred, as cultures evolve over time' },
              { title: 'Acknowledge Regional Differences', desc: '"In northern Italy..." instead of generalizing about the entire country' },
              { title: 'Use "I" Statements', desc: '"I found that..." or "In my experience..." rather than absolute statements' },
              { title: 'Be Specific and Detailed', desc: 'Share concrete observations rather than vague generalizations' },
              { title: 'Engage Respectfully', desc: 'When disagreeing, share your own experience rather than dismissing others' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'start' }}>
                <span style={{ fontSize: '20px', color: '#16a34a', flexShrink: 0 }}>✓</span>
                <div>
                  <h4 className="organic-card-title" style={{ fontSize: '15px', marginBottom: 'var(--space-1)' }}>{item.title}</h4>
                  <p className="organic-card-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DON'T Section */}
        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-4)', color: '#dc2626' }}>✗ DON'T: Prohibited Content</h2>
          <div className="organic-card" style={{ padding: 'var(--space-6)', gap: 'var(--space-4)' }}>
            {[
              { title: 'Hate Speech or Discrimination', desc: 'Content that attacks or demeans people based on ethnicity, nationality, religion, or other protected characteristics' },
              { title: 'Harmful Stereotypes', desc: 'Sweeping generalizations that reduce diverse populations to simplistic caricatures' },
              { title: 'Misinformation', desc: 'Presenting false information as fact, especially about laws, customs, or cultural practices' },
              { title: 'Political Propaganda', desc: 'Content primarily aimed at promoting political agendas rather than sharing cultural experiences' },
              { title: 'Personal Attacks', desc: 'Insulting, harassing, or threatening other users' },
              { title: 'Spam or Self-Promotion', desc: 'Advertising, promotional content, or repetitive posts' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'start' }}>
                <span style={{ fontSize: '20px', color: '#dc2626', flexShrink: 0 }}>✗</span>
                <div>
                  <h4 className="organic-card-title" style={{ fontSize: '15px', marginBottom: 'var(--space-1)' }}>{item.title}</h4>
                  <p className="organic-card-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Types */}
        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Experience Type Guidelines</h2>
          <p className="organic-card-body" style={{ marginBottom: 'var(--space-4)' }}>
            Please select the experience type that best matches how you gained your knowledge:
          </p>
          <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
            {[
              { badge: '🏠 Native', title: 'I am from this country', desc: 'You grew up in or are a citizen of this country. Highest credibility for cultural insights.' },
              { badge: '🧳 Lived There', title: 'I lived/worked there', desc: 'You spent extended time (6+ months) living or working in this country.' },
              { badge: '✈️ Visited', title: 'I visited there', desc: 'You visited as a tourist or for a short stay. Share what you observed during your visit.' },
              { badge: '👂 Heard from Others', title: 'I heard from others', desc: 'Your knowledge comes from friends, family, or reliable sources. Please cite your source when possible.' },
            ].map((item, i) => (
              <div key={i} className="organic-card" style={{ padding: 'var(--space-4)', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span className="organic-tag organic-tag-accent">{item.badge}</span>
                  <span className="organic-card-title" style={{ fontSize: '14px' }}>{item.title}</span>
                </div>
                <p className="organic-card-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reporting */}
        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Reporting Content</h2>
          <div className="organic-card" style={{ padding: 'var(--space-6)', gap: 'var(--space-4)' }}>
            <p className="organic-card-body">
              If you see content that violates these guidelines, please use the <strong>Report</strong> button to flag it for review.
            </p>
            <div style={{ background: 'rgba(var(--color-accent-rgb), 0.08)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
              <p className="organic-card-title" style={{ fontSize: '14px', marginBottom: 'var(--space-2)' }}>Our moderation team will review reports and take action including:</p>
              <ul style={{ paddingLeft: 'var(--space-5)', fontSize: '14px', opacity: 0.8 }}>
                <li>Warning the user</li>
                <li>Removing the content</li>
                <li>Temporarily or permanently suspending accounts for repeated violations</li>
              </ul>
            </div>
            <p className="organic-card-body" style={{ fontSize: '13px' }}>
              <strong>Note:</strong> False or malicious reports may result in action against your account.
            </p>
          </div>
        </section>

        {/* Final Message */}
        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <div style={{ background: 'var(--color-accent-100)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', textAlign: 'center' }}>
            <p style={{ fontSize: '15px', marginBottom: 'var(--space-2)' }}>
              <strong>Remember:</strong> CultureView is a learning platform. We all come from different backgrounds and have different perspectives. Let's keep our discussions educational, respectful, and grounded in genuine experiences.
            </p>
            <p className="organic-card-meta" style={{ marginTop: 'var(--space-3)' }}>
              By using CultureView, you agree to follow these community guidelines. We reserve the right to update these guidelines at any time.
            </p>
            <p className="organic-card-meta" style={{ fontSize: '12px', marginTop: 'var(--space-2)' }}>
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </section>

        {/* Back to Home */}
        <div style={{ textAlign: 'center', paddingBottom: 'var(--space-8)' }}>
          <Link href="/" className="organic-btn organic-btn-primary" style={{ textDecoration: 'none' }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
