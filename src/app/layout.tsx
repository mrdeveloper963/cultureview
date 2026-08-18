import type { Metadata } from 'next'
import { Inter, Figtree } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
})

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-body',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'CultureView - Explore Cultural Insights',
    template: '%s | CultureView',
  },
  description:
    'A community-driven platform where users share authentic cultural experiences and insights about different countries. Real opinions from locals, travelers, and expats.',
  keywords: [
    'culture',
    'travel',
    'countries',
    'cultural experiences',
    'opinions',
    'expat life',
    'living abroad',
    'travel insights',
    'cultural differences',
  ],
  authors: [{ name: 'CultureView' }],
  creator: 'CultureView',
  publisher: 'CultureView',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'CultureView - Explore Cultural Insights',
    description:
      'Real cultural experiences and insights from people around the world',
    siteName: 'CultureView',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CultureView - Explore Cultural Insights',
    description:
      'Real cultural experiences and insights from people around the world',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${figtree.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased" style={{ backgroundColor: '#f5ead8' }} suppressHydrationWarning>
        <div className="relative flex min-h-screen flex-col">
          {/* Old Header removed - using new organic design */}
          <main className="flex-1">{children}</main>
          {/* Old Footer removed - using new organic design */}
        </div>
      </body>
    </html>
  )
}
