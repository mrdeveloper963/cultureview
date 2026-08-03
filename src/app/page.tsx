import { Suspense } from 'react'
import { Search, Globe2 } from 'lucide-react'
import { prisma } from '@/lib/db'
import { CountryCard } from '@/components/country/CountryCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

async function getCountries() {
  const countries = await prisma.country.findMany({
    orderBy: {
      nameEn: 'asc',
    },
  })
  return countries
}

function CountriesGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="h-32 rounded-lg bg-muted animate-pulse" />
      ))}
    </div>
  )
}

export default async function HomePage() {
  const countries = await getCountries()

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-primary/10 p-4">
            <Globe2 className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Explore Cultural Insights
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Discover authentic experiences and opinions from people who have lived, traveled, and
          immersed themselves in cultures around the world.
        </p>

        {/* Search Bar */}
        <div className="flex gap-2 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search countries..."
              className="pl-10"
            />
          </div>
          <Button>Search</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 mb-12 max-w-3xl mx-auto">
        <div className="text-center p-6 rounded-lg bg-muted/50">
          <div className="text-3xl font-bold text-primary">{countries.length}</div>
          <div className="text-sm text-muted-foreground">Countries</div>
        </div>
        <div className="text-center p-6 rounded-lg bg-muted/50">
          <div className="text-3xl font-bold text-primary">9</div>
          <div className="text-sm text-muted-foreground">Cultural Categories</div>
        </div>
        <div className="text-center p-6 rounded-lg bg-muted/50">
          <div className="text-3xl font-bold text-primary">
            {countries.reduce((sum, c) => sum + c.totalPosts, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Shared Opinions</div>
        </div>
      </div>

      {/* Countries Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">All Countries</h2>
        <Suspense fallback={<CountriesGridSkeleton />}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map(country => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>
        </Suspense>
      </div>

      {countries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No countries found.</p>
        </div>
      )}
    </div>
  )
}
