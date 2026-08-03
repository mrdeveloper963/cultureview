import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        nameEn: 'asc',
      },
      select: {
        id: true,
        nameEn: true,
        nameFa: true,
        code: true,
        flagUrl: true,
        totalPosts: true,
      },
    })

    return NextResponse.json({ countries })
  } catch (error) {
    console.error('Error fetching countries:', error)
    return NextResponse.json({ error: 'Failed to fetch countries' }, { status: 500 })
  }
}
