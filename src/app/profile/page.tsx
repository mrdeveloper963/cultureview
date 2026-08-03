import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/db'
import { User, MessageSquare, ThumbsUp, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

async function getUserPosts(userId: string) {
  const posts = await prisma.post.findMany({
    where: { userId },
    include: {
      country: true,
      category: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })
  return posts
}

async function getUserStats(userId: string) {
  const [posts, comments] = await Promise.all([
    prisma.post.count({ where: { userId } }),
    prisma.comment.count({ where: { userId } }),
  ])

  const totalLikes = await prisma.post.aggregate({
    where: { userId },
    _sum: { likesCount: true },
  })

  return {
    postsCount: posts,
    commentsCount: comments,
    totalLikes: totalLikes._sum.likesCount || 0,
  }
}

export default async function ProfilePage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const [posts, stats] = await Promise.all([
    getUserPosts(user.id),
    getUserStats(user.id),
  ])

  const displayName = user.user_metadata?.name || user.email?.split('@')[0] || 'User'

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Profile Header */}
      <div className="mb-8">
        <div className="flex items-start gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
            {user.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt={displayName}
                className="h-20 w-20 rounded-full"
              />
            ) : (
              <User className="h-10 w-10" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{displayName}</h1>
            <p className="text-muted-foreground mb-4">{user.email}</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">
                Member since {new Date(user.created_at || '').toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.postsCount}</p>
                <p className="text-sm text-muted-foreground">Opinions Shared</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                <ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalLikes}</p>
                <p className="text-sm text-muted-foreground">Total Likes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.commentsCount}</p>
                <p className="text-sm text-muted-foreground">Comments Made</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Opinions</h2>

        {posts.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mb-4">
                You haven't shared any opinions yet.
              </p>
              <Link href="/">
                <span className="text-primary hover:underline">
                  Explore countries and share your experiences
                </span>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link key={post.id} href={`/posts/${post.id}`}>
                <Card className="transition-all hover:shadow-md hover:border-primary/50">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary">{post.country.code}</Badge>
                        <Badge variant="outline" className="gap-1.5">
                          <span>{post.category.icon}</span>
                          <span>{post.category.nameEn}</span>
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {post.title && (
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                      )}

                      <p className="text-muted-foreground line-clamp-2">
                        {post.content}
                      </p>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likesCount}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.commentsCount}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
