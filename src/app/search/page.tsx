import { Suspense } from 'react'
import { prisma } from '@/lib/db'
import { SearchFilters } from '@/components/search/SearchFilters'
import { SearchResults } from '@/components/search/SearchResults'
import { Card, CardContent } from '@/components/ui/card'

interface SearchPageProps {
  searchParams: {
    q?: string
    country?: string
    category?: string
    experienceType?: string
    sortBy?: string
    page?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Fetch countries and categories for filters
  const [countries, categories] = await Promise.all([
    prisma.country.findMany({
      orderBy: { nameEn: 'asc' },
    }),
    prisma.category.findMany({
      orderBy: { displayOrder: 'asc' },
    }),
  ])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Search Experiences</h1>
          <p className="text-muted-foreground">
            Find cultural experiences by country, category, or keyword
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4">
              <SearchFilters
                countries={countries}
                categories={categories}
                currentFilters={searchParams}
              />
            </div>
          </aside>

          {/* Search Results */}
          <main className="lg:col-span-3">
            <Suspense
              fallback={
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="animate-pulse">Loading results...</div>
                  </CardContent>
                </Card>
              }
            >
              <SearchResults searchParams={searchParams} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
