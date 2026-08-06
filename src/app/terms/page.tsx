import { Navigation } from '@/components/layout/Navigation'
import Link from 'next/link'
import '../organic-theme.css'

export default function TermsPage() {
  return (
    <div className="organic-theme" style={{ minHeight: '100vh' }}>
      <Navigation />

      {/* Hero Section */}
      <header className="site-header" style={{ padding: 'calc(var(--space-8) * 2) calc(var(--space-8) * 1.6) calc(var(--space-8) * 1.5)', maxWidth: '720px', textAlign: 'center', margin: '0 auto' }}>
        <div style={{ fontSize: '48px', marginBottom: 'var(--space-3)' }}>📜</div>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>Terms of Use</h1>
        <p style={{ fontSize: '17px', opacity: 0.85, maxWidth: '600px', margin: '0 auto' }}>
          By using CultureView, you agree to these terms and conditions
        </p>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 calc(var(--space-8) * 1.6) calc(var(--space-8) * 3)' }}>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>1. Acceptance of Terms</h2>
          <p className="organic-card-body" style={{ marginBottom: 'var(--space-3)' }}>
            By accessing and using CultureView ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use the Service.
          </p>
          <p className="organic-card-body">
            We reserve the right to update and change these Terms of Use from time to time without notice. Any new features that augment or enhance the current Service shall be subject to the Terms of Use.
          </p>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>2. Description of Service</h2>
          <p className="organic-card-body" style={{ marginBottom: 'var(--space-3)' }}>
            CultureView is a community-driven platform where users share authentic cultural experiences and insights about different countries. The Service allows users to:
          </p>
          <div className="organic-card" style={{ padding: 'var(--space-5)', gap: 'var(--space-2)' }}>
            <ul style={{ paddingLeft: 'var(--space-5)', fontSize: '15px', lineHeight: 1.7 }}>
              <li>Read opinions and experiences about various countries and cultures</li>
              <li>Create an account and share their own cultural experiences</li>
              <li>Vote on opinions shared by other users</li>
              <li>Comment on and discuss cultural topics</li>
              <li>Browse content by country and category</li>
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>3. Account Registration</h2>
          <p className="organic-card-body" style={{ marginBottom: 'var(--space-3)' }}>
            To access certain features of the Service, you must register for an account. When you register, you agree to:
          </p>
          <div className="organic-card" style={{ padding: 'var(--space-5)', gap: 'var(--space-2)' }}>
            <ul style={{ paddingLeft: 'var(--space-5)', fontSize: '15px', lineHeight: 1.7 }}>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and accept all risks of unauthorized access</li>
              <li>Notify us immediately if you discover or suspect any security breaches</li>
              <li>Take responsibility for all activities that occur under your account</li>
            </ul>
          </div>
          <p className="organic-card-body" style={{ marginTop: 'var(--space-3)' }}>
            You must be at least 13 years old to use this Service. By using the Service, you represent and warrant that you meet this requirement.
          </p>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>4. User Content</h2>
          <p className="organic-card-body" style={{ marginBottom: 'var(--space-3)' }}>
            You retain ownership of any content you post on CultureView. However, by posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display your content in connection with operating and promoting the Service.
          </p>
          <p className="organic-card-body" style={{ marginBottom: 'var(--space-3)' }}>
            You are solely responsible for the content you post. You agree that your content will:
          </p>
          <div className="organic-card" style={{ padding: 'var(--space-5)', gap: 'var(--space-2)' }}>
            <ul style={{ paddingLeft: 'var(--space-5)', fontSize: '15px', lineHeight: 1.7 }}>
              <li>Not violate any laws or regulations</li>
              <li>Not infringe on any third party's intellectual property rights</li>
              <li>Not contain hate speech, harassment, or discriminatory content</li>
              <li>Not contain false, misleading, or deceptive information</li>
              <li>Comply with our Community Guidelines</li>
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>5. Prohibited Uses</h2>
          <p className="organic-card-body" style={{ marginBottom: 'var(--space-3)' }}>
            You may not use the Service for any illegal or unauthorized purpose. You agree not to:
          </p>
          <div className="organic-card" style={{ padding: 'var(--space-5)', gap: 'var(--space-2)' }}>
            <ul style={{ paddingLeft: 'var(--space-5)', fontSize: '15px', lineHeight: 1.7 }}>
              <li>Violate any laws in your jurisdiction</li>
              <li>Post content that is harmful, threatening, abusive, or harassing</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Use automated systems to access the Service without permission</li>
              <li>Spam, phish, or engage in any fraudulent activity</li>
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>6. Intellectual Property</h2>
          <p className="organic-card-body">
            The Service and its original content (excluding user-generated content), features, and functionality are owned by CultureView and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>7. Termination</h2>
          <p className="organic-card-body">
            We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach the Terms of Use or Community Guidelines. Upon termination, your right to use the Service will immediately cease.
          </p>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>8. Disclaimer of Warranties</h2>
          <p className="organic-card-body">
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the Service's operation or the information, content, or materials included on the Service. You use the Service at your own risk.
          </p>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>9. Limitation of Liability</h2>
          <p className="organic-card-body">
            In no event shall CultureView, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Service.
          </p>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>10. Changes to Terms</h2>
          <p className="organic-card-body">
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
        </section>

        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>11. Contact Information</h2>
          <p className="organic-card-body">
            If you have any questions about these Terms, please contact us through our support channels.
          </p>
        </section>

        {/* Final Notice */}
        <section style={{ marginBottom: 'calc(var(--space-8) * 2)' }}>
          <div style={{ background: 'var(--color-accent-100)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', textAlign: 'center' }}>
            <p className="organic-card-meta" style={{ fontSize: '13px' }}>
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <p style={{ fontSize: '14px', marginTop: 'var(--space-2)' }}>
              By continuing to use CultureView, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
            </p>
          </div>
        </section>

        {/* Related Links */}
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', paddingBottom: 'var(--space-8)', flexWrap: 'wrap' }}>
          <Link href="/privacy" className="organic-btn organic-btn-ghost" style={{ textDecoration: 'none' }}>
            Privacy Policy
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
