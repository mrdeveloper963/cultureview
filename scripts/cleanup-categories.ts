import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// The 9 official categories with emoji icons
const OFFICIAL_CATEGORIES = [
  'work-culture',
  'food-culture',
  'family-life',
  'manners-etiquette',
  'punctuality',
  'hospitality',
  'social-life',
  'communication-style',
  'personal-space',
]

async function main() {
  console.log('Cleaning up categories...\n')

  // Get all categories
  const allCategories = await prisma.category.findMany({
    orderBy: { id: 'asc' },
  })

  console.log(`Total categories in database: ${allCategories.length}`)

  // Find categories to delete (not in official list or no emoji icon)
  const toDelete = allCategories.filter(cat => {
    const hasNoEmoji = !cat.icon || cat.icon.length < 2 || !/[\u{1F300}-\u{1FAD6}]/u.test(cat.icon)
    const notOfficial = !OFFICIAL_CATEGORIES.includes(cat.slug)
    return hasNoEmoji || notOfficial
  })

  console.log(`\nCategories to DELETE (${toDelete.length}):`)
  toDelete.forEach(cat => {
    console.log(`  ❌ ${cat.icon || '(no icon)'} ${cat.nameEn} (${cat.slug})`)
  })

  const toKeep = allCategories.filter(cat => {
    const hasEmoji = cat.icon && cat.icon.length >= 2 && /[\u{1F300}-\u{1FAD6}]/u.test(cat.icon)
    const isOfficial = OFFICIAL_CATEGORIES.includes(cat.slug)
    return hasEmoji && isOfficial
  })

  console.log(`\nCategories to KEEP (${toKeep.length}):`)
  toKeep.forEach(cat => {
    console.log(`  ✅ ${cat.icon} ${cat.nameEn} (${cat.slug})`)
  })

  // Check if any posts use categories we're about to delete
  for (const cat of toDelete) {
    const postCount = await prisma.post.count({
      where: { categoryId: cat.id }
    })
    if (postCount > 0) {
      console.log(`\n⚠️  WARNING: Category "${cat.nameEn}" has ${postCount} posts!`)
      console.log(`   Cannot delete. Please reassign posts first.`)
      return
    }
  }

  // Delete old categories
  console.log('\n🗑️  Deleting old categories...')
  for (const cat of toDelete) {
    await prisma.category.delete({
      where: { id: cat.id }
    })
    console.log(`   Deleted: ${cat.nameEn}`)
  }

  console.log('\n✅ Cleanup complete!')
  console.log(`   Kept: ${toKeep.length} categories`)
  console.log(`   Deleted: ${toDelete.length} categories`)
}

main()
  .catch(e => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
