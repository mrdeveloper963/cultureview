import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const countryId = parseInt(id)

    if (isNaN(countryId)) {
      return NextResponse.json({ error: 'Invalid country ID' }, { status: 400 })
    }

    const country = await prisma.country.findUnique({
      where: { id: countryId },
      include: {
        posts: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatarUrl: true,
              },
            },
            category: true,
            _count: {
              select: {
                comments: true,
                votes: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
      },
    })

    if (!country) {
      return NextResponse.json({ error: 'Country not found' }, { status: 404 })
    }

    return NextResponse.json({ country })
  } catch (error) {
    console.error('Error fetching country:', error)
    return NextResponse.json({ error: 'Failed to fetch country' }, { status: 500 })
  }
}
