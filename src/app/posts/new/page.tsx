import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { prisma } from '@/lib/db'
import { PostForm } from '@/components/post/PostForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

async function getCountries() {
  const countries = await prisma.country.findMany({
    orderBy: { nameEn: 'asc' },
  })
  return countries
}

async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { displayOrder: 'asc' },
  })
  return categories
}

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string; category?: string }>
}) {
  const params = await searchParams
  const [countries, categories] = await Promise.all([
    getCountries(),
    getCategories(),
  ])

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">Share Your Experience</h1>
        <p className="text-lg text-muted-foreground">
          Share your authentic cultural experiences and insights with the community.
          Your perspective helps others understand different cultures better.
        </p>
      </div>

      {/* Form */}
      <Suspense fallback={<div>Loading...</div>}>
        <PostForm
          countries={countries}
          categories={categories}
          defaultCountryId={params.country ? parseInt(params.country) : undefined}
          defaultCategoryId={params.category ? parseInt(params.category) : undefined}
        />
      </Suspense>
    </div>
  )
}
