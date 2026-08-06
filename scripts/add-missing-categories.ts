import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const MISSING_CATEGORIES = [
  {
    slug: 'social-life',
    nameEn: 'Social Life',
    descriptionEn: 'How people hang out, party, and make friends.',
    icon: '🎉',
    displayOrder: 6,
  },
  {
    slug: 'communication-style',
    nameEn: 'Communication Style',
    descriptionEn: 'Direct vs. indirect, loud vs. quiet, formal vs. casual.',
    icon: '💬',
    displayOrder: 7,
  },
  {
    slug: 'personal-space',
    nameEn: 'Personal Space',
    descriptionEn: 'How close people stand, comfort with touch and eye contact.',
    icon: '🚶',
    displayOrder: 8,
  },
  {
    slug: 'time-attitude',
    nameEn: 'Attitude to Time',
    descriptionEn: 'Punctuality expectations and how schedules are treated.',
    icon: '⏰',
    displayOrder: 9,
  },
]

async function main() {
  console.log('Adding missing categories...\n')

  for (const cat of MISSING_CATEGORIES) {
    const existing = await prisma.category.findUnique({
      where: { slug: cat.slug }
    })

    if (existing) {
      console.log(`✓ Category "${cat.slug}" already exists`)
      continue
    }

    await prisma.category.create({
      data: {
        slug: cat.slug,
        nameEn: cat.nameEn,
        nameFa: null,
        descriptionEn: cat.descriptionEn,
        descriptionFa: null,
        icon: cat.icon,
        displayOrder: cat.displayOrder,
      }
    })

    console.log(`✅ Created: ${cat.icon} ${cat.nameEn}`)
  }

  console.log('\n✅ All categories added!')

  // Show final list
  const allCategories = await prisma.category.findMany({
    orderBy: { displayOrder: 'asc' }
  })

  console.log(`\nFinal category list (${allCategories.length} total):`)
  allCategories.forEach(cat => {
    console.log(`  ${cat.displayOrder}. ${cat.icon} ${cat.nameEn} (${cat.slug})`)
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
