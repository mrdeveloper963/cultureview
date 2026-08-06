import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Testing database connection...')
    await prisma.$connect()
    console.log('✓ Database connected successfully!')

    const countryCount = await prisma.country.count()
    console.log(`✓ Found ${countryCount} countries`)

    const categoryCount = await prisma.category.count()
    console.log(`✓ Found ${categoryCount} categories`)

    const postCount = await prisma.post.count()
    console.log(`✓ Found ${postCount} posts`)

  } catch (error) {
    console.error('✗ Database connection failed:', error)
    process.exit(1)
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })
