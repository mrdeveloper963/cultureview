import { notFound } from 'next/navigation'
import { ArrowLeft, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

async function getCountry(id: number) {
  const country = await prisma.country.findUnique({
    where: { id },
  })
  return country
}

async function getCategory(id: number) {
  const category = await prisma.category.findUnique({
    where: { id },
  })
  return category
}

async function getPosts(countryId: number, categoryId: number) {
  const posts = await prisma.post.findMany({
    where: {
      countryId,
      categoryId,
      isPublished: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 50,
  })
  return posts
}

const EXPERIENCE_TYPE_LABELS: Record<string, { label: string; color: string }> = {
  native: { label: 'Native', color: 'bg-green-500/10 text-green-700 dark:text-green-400' },
  lived: { label: 'Lived There', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400' },
  visited: { label: 'Visited', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400' },
  heard: { label: 'Heard', color: 'bg-orange-500/10 text-orange-700 dark:text-orange-400' },
}

export default async function CategoryPostsPage({
  params,
}: {
  params: Promise<{ id: string; categoryId: string }>
}) {
  const { id, categoryId } = await params
  const countryId = parseInt(id)
  const catId = parseInt(categoryId)

  if (isNaN(countryId) || isNaN(catId)) {
    notFound()
  }

  const [country, category, posts] = await Promise.all([
    getCountry(countryId),
    getCategory(catId),
    getPosts(countryId, catId),
  ])

  if (!country || !category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link href={`/countries/${country.id}`}>
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to {country.nameEn}
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl">{category.icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold">{category.nameEn}</h1>
              <Badge variant="secondary" className="text-base px-3 py-1">
                {country.code}
              </Badge>
            </div>
            {category.descriptionEn && (
              <p className="text-lg text-muted-foreground">{category.descriptionEn}</p>
            )}
            <div className="flex items-center gap-2 mt-3 text-muted-foreground">
              <MessageSquare className="h-5 w-5" />
              <span className="font-medium">
                {posts.length} {posts.length === 1 ? 'opinion' : 'opinions'}
              </span>
            </div>
          </div>
        </div>

        <Link href={`/posts/new?country=${country.id}&category=${category.id}`}>
          <Button size="lg">Share Your Experience</Button>
        </Link>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No Opinions Yet</h3>
            <p className="text-muted-foreground mb-6">
              Be the first to share your experience about {category.nameEn} in {country.nameEn}!
            </p>
            <Link href={`/posts/new?country=${country.id}&category=${category.id}`}>
              <Button>Share Your Experience</Button>
            </Link>
          </div>
        ) : (
          posts.map((post) => {
            const experienceInfo = EXPERIENCE_TYPE_LABELS[post.experienceType] || {
              label: post.experienceType,
              color: 'bg-muted',
            }

            return (
              <Link key={post.id} href={`/posts/${post.id}`}>
                <Card className="group transition-all hover:shadow-md hover:border-primary/50">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {/* Badges */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={`px-2 py-0.5 text-xs ${experienceInfo.color} border-0`}>
                          {experienceInfo.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Title */}
                      {post.title && (
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                      )}

                      {/* Content Preview */}
                      <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                        {post.content}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="font-medium">{post.likesCount}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
                          <ThumbsDown className="h-4 w-4" />
                          <span className="font-medium">{post.dislikesCount}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <MessageSquare className="h-4 w-4" />
                          <span className="font-medium">{post.commentsCount}</span>
                        </div>
                        {post.likesCount + post.dislikesCount > 0 && (
                          <div className="ml-auto text-muted-foreground">
                            {Math.round(
                              (post.likesCount / (post.likesCount + post.dislikesCount)) * 100
                            )}
                            % agree
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
