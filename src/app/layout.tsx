import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// Old header and footer commented out - using new organic design in pages
// import { Header } from '@/components/layout/Header'
// import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'CultureView - Explore Cultural Insights',
  description:
    'A community-driven platform where users share authentic cultural experiences and insights about different countries.',
  keywords: ['culture', 'travel', 'countries', 'cultural experiences', 'opinions'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          {/* Old Header removed - using new organic design */}
          <main className="flex-1">{children}</main>
          {/* Old Footer removed - using new organic design */}
        </div>
      </body>
    </html>
  )
}
