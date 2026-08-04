const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const posts = await prisma.post.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      country: true,
      category: true,
    }
  })
  console.log('Total posts:', await prisma.post.count())
  console.log('\nRecent posts:')
  posts.forEach(p => {
    console.log(`- ${p.title || 'No title'} (${p.country.nameEn} - ${p.category.nameEn})`)
  })
}

main().finally(() => prisma.$disconnect())
