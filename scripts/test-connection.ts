import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Testing database connection...')
    await prisma.$connect()
    console.log('✅ Connected to database successfully!')

    const count = await prisma.country.count()
    console.log(`Found ${count} countries in database`)

  } catch (error: any) {
    console.error('❌ Connection failed:', error.message)
    if (error.message.includes('reach database')) {
      console.log('\n💡 Supabase project might be paused.')
      console.log('Go to: https://supabase.com/dashboard/project/wkjhrvcdjxrkglvvyxmi')
      console.log('Check if the project is paused and resume it.')
    }
  } finally {
    await prisma.$disconnect()
  }
}

main()
