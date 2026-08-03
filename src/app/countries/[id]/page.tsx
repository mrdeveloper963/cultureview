import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { CategoryList } from '@/components/country/CategoryList'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

async function getCountry(id: number) {
  const country = await prisma.country.findUnique({
    where: { id },
    include: {
      posts: {
        select: {
          categoryId: true,
        },
      },
    },
  })

  return country
}

async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      displayOrder: 'asc',
    },
  })

  return categories
}

export default async function CountryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const countryId = parseInt(id)

  if (isNaN(countryId)) {
    notFound()
  }

  const [country, categories] = await Promise.all([
    getCountry(countryId),
    getCategories(),
  ])

  if (!country) {
    notFound()
  }

  // Count posts per category
  const postCounts: Record<number, number> = {}
  country.posts.forEach(post => {
    postCounts[post.categoryId] = (postCounts[post.categoryId] || 0) + 1
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Countries
          </Link>
        </Button>
      </div>

      {/* Country Header */}
      <div className="mb-12">
        <div className="flex items-start gap-6 mb-6">
          {/* Flag */}
          <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-muted text-5xl shadow-lg">
            {country.flagUrl ? (
              <img
                src={country.flagUrl}
                alt={`${country.nameEn} flag`}
                className="h-full w-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-3xl font-bold text-muted-foreground">
                {country.code}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{country.nameEn}</h1>
                {country.nameFa && (
                  <p className="text-xl text-muted-foreground">{country.nameFa}</p>
                )}
              </div>
              <Badge variant="secondary" className="text-base px-4 py-2">
                {country.code}
              </Badge>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <span className="font-medium">
                  {country.totalPosts} {country.totalPosts === 1 ? 'Opinion' : 'Opinions'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Explore cultural insights</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button size="lg" asChild>
            <Link href={`/posts/new?country=${country.id}`}>
              Share Your Experience
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href={`/countries/${country.id}/all`}>
              View All Opinions
            </Link>
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Cultural Categories</h2>
          <p className="text-muted-foreground">
            Explore different aspects of {country.nameEn} culture through community experiences.
          </p>
        </div>

        <CategoryList
          categories={categories}
          countryId={country.id}
          postCounts={postCounts}
        />
      </div>

      {/* Empty State */}
      {country.totalPosts === 0 && (
        <div className="mt-12 text-center p-12 rounded-lg bg-muted/50">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No Opinions Yet</h3>
          <p className="text-muted-foreground mb-6">
            Be the first to share your experience about {country.nameEn} culture!
          </p>
          <Button asChild>
            <Link href={`/posts/new?country=${country.id}`}>
              Share Your Experience
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
