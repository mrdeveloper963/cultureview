import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categoryUpdates = [
  { slug: 'work-culture', icon: '💼', nameEn: 'Work Culture', descriptionEn: 'How people show up, lead, and switch off at work.' },
  { slug: 'food-culture', icon: '🍽️', nameEn: 'Food Culture', descriptionEn: 'Meal times, table manners, and what\'s polite to order.' },
  { slug: 'family-life', icon: '👨‍👩‍👧‍👦', nameEn: 'Family Life', descriptionEn: 'Roles, closeness, and how households are run.' },
  { slug: 'manners-etiquette', icon: '🤝', nameEn: 'Manners & Etiquette', descriptionEn: 'Small courtesies that mean a lot.' },
  { slug: 'punctuality', icon: '⏰', nameEn: 'Punctuality', descriptionEn: 'What "on time" actually means, day to day.' },
  { slug: 'hospitality', icon: '🏠', nameEn: 'Hospitality', descriptionEn: 'How guests are welcomed and treated.' },
  { slug: 'driving-culture', icon: '🚗', nameEn: 'Driving Culture', descriptionEn: 'Rules on paper vs. rules on the road.' },
  { slug: 'attitudes-to-strangers', icon: '👥', nameEn: 'Attitudes to Strangers', descriptionEn: 'How open or reserved people are with people they don\'t know.' },
  { slug: 'dress-code', icon: '👔', nameEn: 'Dress Code', descriptionEn: 'What\'s expected, and what draws a stare.' },
]

async function main() {
  console.log('Updating category icons...')

  for (const cat of categoryUpdates) {
    const existing = await prisma.category.findUnique({
      where: { slug: cat.slug },
    })

    if (existing) {
      await prisma.category.update({
        where: { slug: cat.slug },
        data: {
          icon: cat.icon,
          nameEn: cat.nameEn,
          descriptionEn: cat.descriptionEn,
        },
      })
      console.log(`✓ Updated ${cat.slug}`)
    } else {
      // Create if doesn't exist
      await prisma.category.create({
        data: {
          slug: cat.slug,
          nameEn: cat.nameEn,
          nameFa: null,
          descriptionEn: cat.descriptionEn,
          descriptionFa: null,
          icon: cat.icon,
          displayOrder: categoryUpdates.indexOf(cat) + 1,
        },
      })
      console.log(`✓ Created ${cat.slug}`)
    }
  }

  console.log('Done!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
