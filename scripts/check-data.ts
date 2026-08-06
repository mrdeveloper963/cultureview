import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Checking database data...\n')

  // Check categories with icons
  const categories = await prisma.category.findMany({
    orderBy: { displayOrder: 'asc' },
    take: 10,
  })

  console.log('Categories:')
  categories.forEach(cat => {
    console.log(`  ${cat.icon || '❌'} ${cat.nameEn} (${cat.slug})`)
  })

  // Check countries
  const countries = await prisma.country.findMany({
    orderBy: { nameEn: 'asc' },
    take: 10,
  })

  console.log('\nCountries (first 10):')
  countries.forEach(country => {
    console.log(`  ${country.code} - ${country.nameEn} (${country.totalPosts} posts)`)
  })

  // Check posts
  const posts = await prisma.post.findMany({
    include: {
      category: true,
      country: true,
    },
    take: 5,
  })

  console.log(`\nPosts (${posts.length} total):`)
  posts.forEach(post => {
    console.log(`  - "${post.title || 'Untitled'}" by user ${post.userId}`)
    console.log(`    ${post.category.icon || '❌'} ${post.category.nameEn} in ${post.country.nameEn}`)
  })
}

main()
  .catch(e => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
