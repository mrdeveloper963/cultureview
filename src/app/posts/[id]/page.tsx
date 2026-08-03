import { notFound } from 'next/navigation'
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare, Flag, User } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { VoteButtons } from '@/components/post/VoteButtons'
import { CommentSection } from '@/components/post/CommentSection'

async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      country: true,
      category: true,
      comments: {
        orderBy: { createdAt: 'desc' },
        take: 50,
      },
    },
  })

  return post
}

const EXPERIENCE_TYPE_LABELS: Record<string, { label: string; color: string }> = {
  native: { label: 'Native', color: 'bg-green-500/10 text-green-700 dark:text-green-400' },
  lived: { label: 'Lived There', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400' },
  visited: { label: 'Visited', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400' },
  heard: { label: 'Heard from Others', color: 'bg-orange-500/10 text-orange-700 dark:text-orange-400' },
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  const experienceInfo = EXPERIENCE_TYPE_LABELS[post.experienceType] || {
    label: post.experienceType,
    color: 'bg-muted',
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link href={`/countries/${post.countryId}`}>
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to {post.country.nameEn}
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Header */}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <Link href={`/countries/${post.country.id}`}>
                <Badge variant="secondary" className="text-base px-3 py-1 hover:bg-secondary/80">
                  {post.country.code}
                </Badge>
              </Link>
              <Link href={`/countries/${post.countryId}?category=${post.categoryId}`}>
                <Badge variant="outline" className="gap-1.5 px-3 py-1 hover:bg-muted">
                  <span>{post.category.icon}</span>
                  <span>{post.category.nameEn}</span>
                </Badge>
              </Link>
              <Badge className={`px-3 py-1 ${experienceInfo.color} border-0`}>
                {experienceInfo.label}
              </Badge>
            </div>

            {post.title && (
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                <span>Anonymous User</span>
              </div>
              <span>•</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Post Content */}
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-base leading-relaxed">
                  {post.content}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Vote and Action Buttons */}
          <div className="flex items-center justify-between">
            <VoteButtons
              postId={post.id}
              initialLikes={post.likesCount}
              initialDislikes={post.dislikesCount}
            />
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <Flag className="h-4 w-4" />
              Report
            </Button>
          </div>

          {/* Comments Section */}
          <div className="pt-6 border-t">
            <CommentSection postId={post.id} initialComments={post.comments} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats Card */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Engagement</div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="font-semibold">{post.likesCount}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
                    <ThumbsDown className="h-4 w-4" />
                    <span className="font-semibold">{post.dislikesCount}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4" />
                    <span className="font-semibold">{post.commentsCount}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm text-muted-foreground mb-2">Agreement</div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-green-500"
                    style={{
                      width: `${
                        post.likesCount + post.dislikesCount > 0
                          ? (post.likesCount / (post.likesCount + post.dislikesCount)) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {post.likesCount + post.dislikesCount > 0
                    ? `${Math.round(
                        (post.likesCount / (post.likesCount + post.dislikesCount)) * 100
                      )}% agree`
                    : 'No votes yet'}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Category */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{post.category.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{post.category.nameEn}</h3>
                  <p className="text-sm text-muted-foreground">
                    {post.category.descriptionEn}
                  </p>
                </div>
              </div>
              <Link href={`/countries/${post.countryId}?category=${post.categoryId}`}>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All in This Category
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
