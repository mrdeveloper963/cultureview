import { prisma } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Prisma } from '@prisma/client'

interface SearchResultsProps {
  searchParams: {
    q?: string
    country?: string
    category?: string
    experienceType?: string
    sortBy?: string
    page?: string
  }
}

const POSTS_PER_PAGE = 12

export async function SearchResults({ searchParams }: SearchResultsProps) {
  const page = parseInt(searchParams.page || '1')
  const skip = (page - 1) * POSTS_PER_PAGE

  // Build where clause
  const where: Prisma.PostWhereInput = {
    isPublished: true,
  }

  // Text search
  if (searchParams.q) {
    where.OR = [
      { title: { contains: searchParams.q, mode: 'insensitive' } },
      { content: { contains: searchParams.q, mode: 'insensitive' } },
    ]
  }

  // Country filter
  if (searchParams.country) {
    where.countryId = parseInt(searchParams.country)
  }

  // Category filter
  if (searchParams.category) {
    where.categoryId = parseInt(searchParams.category)
  }

  // Experience type filter
  if (searchParams.experienceType) {
    where.experienceType = searchParams.experienceType
  }

  // Build orderBy clause
  let orderBy: Prisma.PostOrderByWithRelationInput = { createdAt: 'desc' }

  if (searchParams.sortBy === 'popular') {
    orderBy = { likesCount: 'desc' }
  } else if (searchParams.sortBy === 'discussed') {
    orderBy = { commentsCount: 'desc' }
  }

  // Fetch posts and total count
  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy,
      skip,
      take: POSTS_PER_PAGE,
      include: {
        country: true,
        category: true,
      },
    }),
    prisma.post.count({ where }),
  ])

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE)

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2">No results found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search query
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Found <strong>{totalCount}</strong> experience{totalCount !== 1 ? 's' : ''}
        </p>
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {post.country.nameEn}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {post.category.icon} {post.category.nameEn}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {post.experienceType}
                      </Badge>
                    </div>
                    {post.title && (
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                    )}
                  </div>
                </div>

                {/* Content Preview */}
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {post.content}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span>👍</span>
                    <span>{post.likesCount}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span>💬</span>
                    <span>{post.commentsCount} comments</span>
                  </span>
                  <span>
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {page > 1 && (
            <Link
              href={`/search?${new URLSearchParams({
                ...searchParams,
                page: (page - 1).toString(),
              }).toString()}`}
            >
              <button className="px-4 py-2 rounded-md border hover:bg-muted text-sm">
                Previous
              </button>
            </Link>
          )}

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (page <= 3) {
                pageNum = i + 1
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = page - 2 + i
              }

              return (
                <Link
                  key={pageNum}
                  href={`/search?${new URLSearchParams({
                    ...searchParams,
                    page: pageNum.toString(),
                  }).toString()}`}
                >
                  <button
                    className={`w-10 h-10 rounded-md text-sm ${
                      page === pageNum
                        ? 'bg-primary text-primary-foreground'
                        : 'border hover:bg-muted'
                    }`}
                  >
                    {pageNum}
                  </button>
                </Link>
              )
            })}
          </div>

          {page < totalPages && (
            <Link
              href={`/search?${new URLSearchParams({
                ...searchParams,
                page: (page + 1).toString(),
              }).toString()}`}
            >
              <button className="px-4 py-2 rounded-md border hover:bg-muted text-sm">
                Next
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
