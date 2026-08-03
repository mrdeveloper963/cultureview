import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { voteType } = body

    if (!voteType || !['like', 'dislike'].includes(voteType)) {
      return NextResponse.json(
        { error: 'Invalid vote type' },
        { status: 400 }
      )
    }

    const post = await prisma.post.findUnique({
      where: { id },
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    if (voteType === 'like') {
      await prisma.post.update({
        where: { id },
        data: { likesCount: { increment: 1 } },
      })
    } else {
      await prisma.post.update({
        where: { id },
        data: { dislikesCount: { increment: 1 } },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error voting:', error)
    return NextResponse.json(
      { error: 'Failed to vote' },
      { status: 500 }
    )
  }
}
