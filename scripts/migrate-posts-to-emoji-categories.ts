import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Map old slugs to new emoji category slugs
const CATEGORY_MIGRATION: Record<string, string> = {
  'work_culture': 'work-culture',
  'food_culture': 'food-culture',
  'family_culture': 'family-life',
  'etiquette': 'manners-etiquette',
}

async function main() {
  console.log('Migrating posts to emoji categories...\n')

  const allCategories = await prisma.category.findMany()

  for (const [oldSlug, newSlug] of Object.entries(CATEGORY_MIGRATION)) {
    const oldCat = allCategories.find(c => c.slug === oldSlug)
    const newCat = allCategories.find(c => c.slug === newSlug)

    if (!oldCat) {
      console.log(`⚠️  Old category "${oldSlug}" not found, skipping`)
      continue
    }

    if (!newCat) {
      console.log(`❌ New category "${newSlug}" not found! Cannot migrate.`)
      continue
    }

    const posts = await prisma.post.findMany({
      where: { categoryId: oldCat.id }
    })

    if (posts.length === 0) {
      console.log(`✓ No posts in "${oldSlug}"`)
      continue
    }

    console.log(`📦 Migrating ${posts.length} posts from "${oldSlug}" to "${newSlug}"...`)

    for (const post of posts) {
      await prisma.post.update({
        where: { id: post.id },
        data: { categoryId: newCat.id }
      })
    }

    console.log(`   ✅ Migrated ${posts.length} posts`)
  }

  console.log('\n✅ Migration complete!')
}

main()
  .catch(e => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
