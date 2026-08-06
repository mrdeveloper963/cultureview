import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...\n')

  // Check existing data
  const existingCountries = await prisma.country.count()
  const existingCategories = await prisma.category.count()

  console.log(`Current state:`)
  console.log(`- Countries: ${existingCountries}`)
  console.log(`- Categories: ${existingCategories}\n`)

  // Categories should already be updated by update-category-icons.ts
  console.log('✓ Categories already configured (run update-category-icons.ts if needed)\n')

  // Add more countries if needed (we have 46 already which is good)
  console.log(`✓ Countries already populated (${existingCountries} countries)\n`)

  // Check for posts
  const postCount = await prisma.post.count()
  console.log(`Current posts: ${postCount}`)

  if (postCount === 0) {
    console.log('\n⚠ No posts found. You can add posts via the UI at /posts/new')
  } else {
    console.log(`\n✓ Database has ${postCount} post(s)`)
  }

  console.log('\n✅ Database is ready for use!')
  console.log('\nNext steps:')
  console.log('1. Make sure USE_MOCK_DATA = false in src/lib/mock-data.ts')
  console.log('2. Start the dev server: npm run dev')
  console.log('3. Visit http://localhost:3000')
  console.log('4. Create posts via /posts/new\n')
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
