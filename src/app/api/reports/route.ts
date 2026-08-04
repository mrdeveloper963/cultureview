import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

const VALID_REASONS = ['spam', 'hate_speech', 'inappropriate', 'misinformation', 'other']

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to report content.' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { postId, commentId, reason, description } = body

    // Validation
    if (!postId && !commentId) {
      return NextResponse.json(
        { error: 'Either postId or commentId is required' },
        { status: 400 }
      )
    }

    if (!reason || !VALID_REASONS.includes(reason)) {
      return NextResponse.json(
        { error: 'Invalid or missing reason' },
        { status: 400 }
      )
    }

    // Check if post/comment exists
    if (postId) {
      const post = await prisma.post.findUnique({
        where: { id: postId },
      })

      if (!post) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        )
      }
    }

    if (commentId) {
      const comment = await prisma.comment.findUnique({
        where: { id: commentId },
      })

      if (!comment) {
        return NextResponse.json(
          { error: 'Comment not found' },
          { status: 404 }
        )
      }
    }

    // Check for duplicate report (user already reported this content)
    const existingReport = await prisma.report.findFirst({
      where: {
        reporterId: user.id,
        ...(postId ? { postId } : { commentId }),
      },
    })

    if (existingReport) {
      return NextResponse.json(
        { error: 'You have already reported this content' },
        { status: 400 }
      )
    }

    // Create report
    const report = await prisma.report.create({
      data: {
        reporterId: user.id,
        postId: postId || null,
        commentId: commentId || null,
        reason,
        description: description || null,
        status: 'pending',
      },
    })

    // Mark content as reported
    if (postId) {
      await prisma.post.update({
        where: { id: postId },
        data: { isReported: true },
      })
    }

    if (commentId) {
      await prisma.comment.update({
        where: { id: commentId },
        data: { isReported: true },
      })
    }

    return NextResponse.json(
      {
        id: report.id,
        message: 'Report submitted successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Report creation error:', error)
    return NextResponse.json(
      { error: 'Failed to submit report' },
      { status: 500 }
    )
  }
}

// GET endpoint for admin to view reports
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // TODO: Add admin check here
    // For now, any authenticated user can view reports (you should add proper admin role check)

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'pending'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = 20

    const reports = await prisma.report.findMany({
      where: {
        status: status as any,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        post: {
          include: {
            country: true,
            category: true,
          },
        },
        comment: {
          include: {
            post: {
              include: {
                country: true,
                category: true,
              },
            },
          },
        },
      },
    })

    const totalCount = await prisma.report.count({
      where: { status: status as any },
    })

    return NextResponse.json({
      reports,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error('Reports fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}
