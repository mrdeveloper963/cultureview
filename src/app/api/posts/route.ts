import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to create a post.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { countryId, categoryId, title, content, experienceType } = body

    if (!countryId || !categoryId || !content || !experienceType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (content.trim().length < 50) {
      return NextResponse.json(
        { error: 'Content must be at least 50 characters long' },
        { status: 400 }
      )
    }

    const validExperienceTypes = ['native', 'lived', 'visited', 'heard']
    if (!validExperienceTypes.includes(experienceType)) {
      return NextResponse.json(
        { error: 'Invalid experience type' },
        { status: 400 }
      )
    }

    const post = await prisma.post.create({
      data: {
        userId: user.id,
        countryId: parseInt(countryId),
        categoryId: parseInt(categoryId),
        title: title?.trim() || null,
        content: content.trim(),
        experienceType,
        isPublished: true,
      },
    })

    await prisma.country.update({
      where: { id: parseInt(countryId) },
      data: { totalPosts: { increment: 1 } },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
