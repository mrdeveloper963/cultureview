import { Navigation } from '@/components/layout/Navigation'
import Link from 'next/link'
import '../organic-theme.css'

export default function PrivacyPage() {
  return (
    <div className="organic-theme" style={{ minHeight: '100vh' }}>
      <Navigation />

      {/* Hero Section */}
      <header className="site-header" style={{ padding: 'calc(var(--space-8) * 2) calc(var(--space-8) * 1.6) calc(var(--space-8) * 1.5)', maxWidth: '720px', textAlign: 'center', margin: '0 auto' }}>
        <div style={{ fontSize: '48px', marginBottom: 'var(--space-3)' }}>🔒</div>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>Privacy Policy</h1>
        <p style={{ fontSize: '17px', opacity: 0.85, maxWidth: '600px', margin: '0 auto' }}>
          Your privacy matters to us. Here's how we collect, use, and protect your information.
        </p>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 calc(var(--space-8) * 1.6) calc(var(--space-8) * 3)' }}>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>1. Information We Collect</h2>
          <p className="organic-card-body" style={{ marginBottom: 'var(--space-3)' }}>
            We collect information to provide better services to all our users. The types of information we collect include:
          </p>

          <div style={{ marginBottom: 'var(--space-4)' }}>
            <h3 className="organic-card-title" style={{ fontSize: '16px', marginBottom: 'var(--space-2)' }}>Information You Provide</h3>
            <div className="organic-card" style={{ padding: 'var(--space-5)', gap: 'var(--space-2)' }}>
              <ul style={{ paddingLeft: 'var(--space-5)', fontSize: '15px', lineHeight: 1.7 }}>
                <li><strong>Account Information:</strong> Email address, password, and profile details when you create an account</li>
                <li><strong>Content:</strong> Opinions, comments, and other content you post on the platform</li>
                <li><strong>Communications:</strong> Messages you send through our support channels</li>
              </ul>
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-4)' }}>
            <h3 className="organic-card-title" style={{ fontSize: '16px', marginBottom: 'var(--space-2)' }}>Information We Collect Automatically</h3>
            <div className="organic-card" style={{ padding: 'var(--space-5)', gap: 'var(--space-2)' }}>
              <ul style={{ paddingLeft: 'var(--space-5)', fontSize: '15px', lineHeight: 1.7 }}>
                <li><strong>Usage Data:</strong> How you interact with our Service, including pages visited and features used</li>
                <li><strong>Device Information:</strong> Browser type, operating system, IP address, and device identifiers</li>
                <li><strong>Cookies:</strong> Small data files stored on your device to improve your experience</li>
              </ul>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>2. How We Use Your Information</h2>
          <p className="organic-card-body" style={{ marginBottom: 'var(--space-3)' }}>
            We use the information we collect for the following purposes:
          </p>
          <div className="organic-card" style={{ padding: 'var(--space-5)', gap: 'var(--space-3)' }}>
            {[
              { icon: '🔧', title: 'Provide and Maintain the Service', desc: 'To operate, maintain, and improve CultureView' },
              { icon: '👤', title: 'Manage Your Account', desc: 'To create and manage your user account and profile' },
              { icon: '📊', title: 'Understand Usage', desc: 'To analyze how users interact with our Service and identify trends' },
              { icon: '💬', title: 'Communicate', desc: 'To send you updates, notifications, and respond to your inquiries' },
              { icon: '🛡️', title: 'Safety and Security', desc: 'To detect, prevent, and address fraud, abuse, and security issues' },
              { icon: '⚖️', title: 'Legal Compliance', desc: 'To comply with legal obligations and enforce our terms' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'start' }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <h4 className="organic-card-title" style={{ fontSize: '15px', marginBottom: 'var(--space-1)' }}>{item.title}</h4>
                  <p className="organic-card-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>3. Information Sharing</h2>
          <p className="organic-card-body" style={{ marginBottom: 'var(--space-3)' }}>
            We do not sell your personal information. We may share your information in the following circumstances:
          </p>
          <div className="organic-card" style={{ padding: 'var(--space-5)', gap: 'var(--space-2)' }}>
            <ul style={{ paddingLeft: 'var(--space-5)', fontSize: '15px', lineHeight: 1.7 }}>
              <li><strong>Public Content:</strong> Opinions and comments you post are publicly visible to all users</li>
              <li><strong>Service Providers:</strong> With third-party vendors who help us operate the Service (e.g., hosting, analytics)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to share your information</li>
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>4. Data Security</h2>
          <p className="organic-card-body" style={{ marginBottom: 'var(--space-3)' }}>
            We take the security of your data seriously and implement appropriate technical and organizational measures to protect it, including:
          </p>
          <div className="organic-card" style={{ padding: 'var(--space-5)', gap: 'var(--space-2)' }}>
            <ul style={{ paddingLeft: 'var(--space-5)', fontSize: '15px', lineHeight: 1.7 }}>
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication requirements</li>
              <li>Secure database infrastructure</li>
            </ul>
          </div>
          <p className="organic-card-body" style={{ marginTop: 'var(--space-3)', fontSize: '14px' }}>
            However, no method of transmission over the internet is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
          </p>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>5. Your Rights and Choices</h2>
          <p className="organic-card-body" style={{ marginBottom: 'var(--space-3)' }}>
            You have certain rights regarding your personal information:
          </p>
          <div className="organic-card" style={{ padding: 'var(--space-5)', gap: 'var(--space-2)' }}>
            <ul style={{ paddingLeft: 'var(--space-5)', fontSize: '15px', lineHeight: 1.7 }}>
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information in your account settings</li>
              <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Data Portability:</strong> Request your data in a structured, machine-readable format</li>
            </ul>
          </div>
          <p className="organic-card-body" style={{ marginTop: 'var(--space-3)' }}>
            To exercise these rights, please contact us through our support channels. We will respond to your request within a reasonable timeframe.
          </p>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>6. Cookies and Tracking</h2>
          <p className="organic-card-body" style={{ marginBottom: 'var(--space-3)' }}>
            We use cookies and similar tracking technologies to enhance your experience. Cookies are small data files stored on your device that help us:
          </p>
          <div className="organic-card" style={{ padding: 'var(--space-5)', gap: 'var(--space-2)' }}>
            <ul style={{ paddingLeft: 'var(--space-5)', fontSize: '15px', lineHeight: 1.7 }}>
              <li>Remember your preferences and settings</li>
              <li>Keep you logged in between sessions</li>
              <li>Understand how you use the Service</li>
              <li>Improve performance and user experience</li>
            </ul>
          </div>
          <p className="organic-card-body" style={{ marginTop: 'var(--space-3)' }}>
            You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of the Service.
          </p>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>7. Data Retention</h2>
          <p className="organic-card-body">
            We retain your personal information for as long as necessary to provide the Service and fulfill the purposes outlined in this Privacy Policy. When you delete your account, we will delete or anonymize your personal information, except where we need to retain it for legal or business purposes.
          </p>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>8. Children's Privacy</h2>
          <p className="organic-card-body">
            Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete it.
          </p>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>9. International Data Transfers</h2>
          <p className="organic-card-body">
            Your information may be transferred to and processed in countries other than your own. These countries may have different data protection laws. By using our Service, you consent to such transfers.
          </p>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>10. Changes to This Policy</h2>
          <p className="organic-card-body">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
          </p>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>11. Contact Us</h2>
          <p className="organic-card-body">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us through our support channels.
          </p>
        </section>

        {/* Final Notice */}
        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <div style={{ background: 'var(--color-accent-100)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', textAlign: 'center' }}>
            <p className="organic-card-meta" style={{ fontSize: '13px' }}>
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <p style={{ fontSize: '14px', marginTop: 'var(--space-2)' }}>
              By using CultureView, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </section>

        {/* Related Links */}
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', paddingBottom: 'var(--space-8)', flexWrap: 'wrap' }}>
          <Link href="/terms" className="organic-btn organic-btn-ghost" style={{ textDecoration: 'none' }}>
            Terms of Use
          </Link>
          <Link href="/guidelines" className="organic-btn organic-btn-ghost" style={{ textDecoration: 'none' }}>
            Community Guidelines
          </Link>
          <Link href="/" className="organic-btn organic-btn-primary" style={{ textDecoration: 'none' }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
