import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createClient } from '@/lib/supabase/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'You must be logged in to vote' },
        { status: 401 }
      )
    }

    const { voteType } = await request.json()

    if (!voteType || !['like', 'dislike'].includes(voteType)) {
      return NextResponse.json(
        { error: 'Invalid vote type' },
        { status: 400 }
      )
    }

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Check if user already voted
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
    })

    if (existingVote) {
      // If same vote type, remove vote (toggle off)
      if (existingVote.voteType === voteType) {
        await prisma.vote.delete({
          where: {
            userId_postId: {
              userId: user.id,
              postId,
            },
          },
        })

        // Update post counts
        if (voteType === 'like') {
          await prisma.post.update({
            where: { id: postId },
            data: { likesCount: { decrement: 1 } },
          })
        } else {
          await prisma.post.update({
            where: { id: postId },
            data: { dislikesCount: { decrement: 1 } },
          })
        }
      } else {
        // Change vote type
        await prisma.vote.update({
          where: {
            userId_postId: {
              userId: user.id,
              postId,
            },
          },
          data: { voteType },
        })

        // Update post counts
        if (voteType === 'like') {
          await prisma.post.update({
            where: { id: postId },
            data: {
              likesCount: { increment: 1 },
              dislikesCount: { decrement: 1 },
            },
          })
        } else {
          await prisma.post.update({
            where: { id: postId },
            data: {
              likesCount: { decrement: 1 },
              dislikesCount: { increment: 1 },
            },
          })
        }
      }
    } else {
      // Create new vote
      await prisma.vote.create({
        data: {
          userId: user.id,
          postId,
          voteType,
        },
      })

      // Update post counts
      if (voteType === 'like') {
        await prisma.post.update({
          where: { id: postId },
          data: { likesCount: { increment: 1 } },
        })
      } else {
        await prisma.post.update({
          where: { id: postId },
          data: { dislikesCount: { increment: 1 } },
        })
      }
    }

    // Get updated post
    const updatedPost = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        likesCount: true,
        dislikesCount: true,
      },
    })

    return NextResponse.json({
      success: true,
      likesCount: updatedPost?.likesCount || 0,
      dislikesCount: updatedPost?.dislikesCount || 0,
    })
  } catch (error) {
    console.error('Vote error:', error)
    return NextResponse.json(
      { error: 'Failed to process vote' },
      { status: 500 }
    )
  }
}
