import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Countries data with ISO codes
const countries = [
  { nameEn: 'United States', nameFa: 'ایالات متحده', code: 'USA', flagUrl: '/flags/us.svg' },
  { nameEn: 'United Kingdom', nameFa: 'بریتانیا', code: 'GBR', flagUrl: '/flags/gb.svg' },
  { nameEn: 'Germany', nameFa: 'آلمان', code: 'DEU', flagUrl: '/flags/de.svg' },
  { nameEn: 'France', nameFa: 'فرانسه', code: 'FRA', flagUrl: '/flags/fr.svg' },
  { nameEn: 'Italy', nameFa: 'ایتالیا', code: 'ITA', flagUrl: '/flags/it.svg' },
  { nameEn: 'Spain', nameFa: 'اسپانیا', code: 'ESP', flagUrl: '/flags/es.svg' },
  { nameEn: 'Canada', nameFa: 'کانادا', code: 'CAN', flagUrl: '/flags/ca.svg' },
  { nameEn: 'Australia', nameFa: 'استرالیا', code: 'AUS', flagUrl: '/flags/au.svg' },
  { nameEn: 'Japan', nameFa: 'ژاپن', code: 'JPN', flagUrl: '/flags/jp.svg' },
  { nameEn: 'China', nameFa: 'چین', code: 'CHN', flagUrl: '/flags/cn.svg' },
  { nameEn: 'India', nameFa: 'هند', code: 'IND', flagUrl: '/flags/in.svg' },
  { nameEn: 'Brazil', nameFa: 'برزیل', code: 'BRA', flagUrl: '/flags/br.svg' },
  { nameEn: 'Mexico', nameFa: 'مکزیک', code: 'MEX', flagUrl: '/flags/mx.svg' },
  { nameEn: 'South Korea', nameFa: 'کره جنوبی', code: 'KOR', flagUrl: '/flags/kr.svg' },
  { nameEn: 'Turkey', nameFa: 'ترکیه', code: 'TUR', flagUrl: '/flags/tr.svg' },
  { nameEn: 'Iran', nameFa: 'ایران', code: 'IRN', flagUrl: '/flags/ir.svg' },
  { nameEn: 'United Arab Emirates', nameFa: 'امارات متحده عربی', code: 'ARE', flagUrl: '/flags/ae.svg' },
  { nameEn: 'Saudi Arabia', nameFa: 'عربستان سعودی', code: 'SAU', flagUrl: '/flags/sa.svg' },
  { nameEn: 'Netherlands', nameFa: 'هلند', code: 'NLD', flagUrl: '/flags/nl.svg' },
  { nameEn: 'Sweden', nameFa: 'سوئد', code: 'SWE', flagUrl: '/flags/se.svg' },
  { nameEn: 'Norway', nameFa: 'نروژ', code: 'NOR', flagUrl: '/flags/no.svg' },
  { nameEn: 'Denmark', nameFa: 'دانمارک', code: 'DNK', flagUrl: '/flags/dk.svg' },
  { nameEn: 'Switzerland', nameFa: 'سوئیس', code: 'CHE', flagUrl: '/flags/ch.svg' },
  { nameEn: 'Austria', nameFa: 'اتریش', code: 'AUT', flagUrl: '/flags/at.svg' },
  { nameEn: 'Belgium', nameFa: 'بلژیک', code: 'BEL', flagUrl: '/flags/be.svg' },
  { nameEn: 'Poland', nameFa: 'لهستان', code: 'POL', flagUrl: '/flags/pl.svg' },
  { nameEn: 'Russia', nameFa: 'روسیه', code: 'RUS', flagUrl: '/flags/ru.svg' },
  { nameEn: 'Ukraine', nameFa: 'اوکراین', code: 'UKR', flagUrl: '/flags/ua.svg' },
  { nameEn: 'Greece', nameFa: 'یونان', code: 'GRC', flagUrl: '/flags/gr.svg' },
  { nameEn: 'Portugal', nameFa: 'پرتغال', code: 'PRT', flagUrl: '/flags/pt.svg' },
  { nameEn: 'Ireland', nameFa: 'ایرلند', code: 'IRL', flagUrl: '/flags/ie.svg' },
  { nameEn: 'New Zealand', nameFa: 'نیوزلند', code: 'NZL', flagUrl: '/flags/nz.svg' },
  { nameEn: 'Singapore', nameFa: 'سنگاپور', code: 'SGP', flagUrl: '/flags/sg.svg' },
  { nameEn: 'Malaysia', nameFa: 'مالزی', code: 'MYS', flagUrl: '/flags/my.svg' },
  { nameEn: 'Thailand', nameFa: 'تایلند', code: 'THA', flagUrl: '/flags/th.svg' },
  { nameEn: 'Indonesia', nameFa: 'اندونزی', code: 'IDN', flagUrl: '/flags/id.svg' },
  { nameEn: 'Philippines', nameFa: 'فیلیپین', code: 'PHL', flagUrl: '/flags/ph.svg' },
  { nameEn: 'Vietnam', nameFa: 'ویتنام', code: 'VNM', flagUrl: '/flags/vn.svg' },
  { nameEn: 'Pakistan', nameFa: 'پاکستان', code: 'PAK', flagUrl: '/flags/pk.svg' },
  { nameEn: 'Bangladesh', nameFa: 'بنگلادش', code: 'BGD', flagUrl: '/flags/bd.svg' },
  { nameEn: 'Egypt', nameFa: 'مصر', code: 'EGY', flagUrl: '/flags/eg.svg' },
  { nameEn: 'South Africa', nameFa: 'آفریقای جنوبی', code: 'ZAF', flagUrl: '/flags/za.svg' },
  { nameEn: 'Nigeria', nameFa: 'نیجریه', code: 'NGA', flagUrl: '/flags/ng.svg' },
  { nameEn: 'Argentina', nameFa: 'آرژانتین', code: 'ARG', flagUrl: '/flags/ar.svg' },
  { nameEn: 'Chile', nameFa: 'شیلی', code: 'CHL', flagUrl: '/flags/cl.svg' },
  { nameEn: 'Colombia', nameFa: 'کلمبیا', code: 'COL', flagUrl: '/flags/co.svg' },
]

// Cultural categories
const categories = [
  {
    slug: 'work_culture',
    nameEn: 'Work Culture',
    nameFa: 'فرهنگ کار',
    descriptionEn: 'Work-life balance, workplace expectations, hierarchy, communication style',
    descriptionFa: 'تعادل کار و زندگی، انتظارات محیط کار، سلسله مراتب، سبک ارتباطی',
    icon: 'briefcase',
    displayOrder: 1,
  },
  {
    slug: 'food_culture',
    nameEn: 'Food Culture',
    nameFa: 'فرهنگ غذا',
    descriptionEn: 'Dining etiquette, typical meals, food traditions',
    descriptionFa: 'آداب غذا خوردن، وعده‌های غذایی معمول، سنت‌های غذایی',
    icon: 'utensils',
    displayOrder: 2,
  },
  {
    slug: 'family_culture',
    nameEn: 'Family Culture',
    nameFa: 'فرهنگ خانواده',
    descriptionEn: 'Family structure, roles, traditions, living arrangements',
    descriptionFa: 'ساختار خانواده، نقش‌ها، سنت‌ها، ترتیبات زندگی',
    icon: 'users',
    displayOrder: 3,
  },
  {
    slug: 'etiquette',
    nameEn: 'Etiquette & Manners',
    nameFa: 'آداب معاشرت',
    descriptionEn: 'Social norms, greetings, politeness, taboos',
    descriptionFa: 'هنجارهای اجتماعی، احوال‌پرسی، ادب، تابوها',
    icon: 'hand-shake',
    displayOrder: 4,
  },
  {
    slug: 'punctuality',
    nameEn: 'Punctuality',
    nameFa: 'وقت‌شناسی',
    descriptionEn: 'Attitudes toward time, being on time for appointments',
    descriptionFa: 'نگرش نسبت به زمان، سر وقت بودن در قرارها',
    icon: 'clock',
    displayOrder: 5,
  },
  {
    slug: 'hospitality',
    nameEn: 'Hospitality',
    nameFa: 'مهمان‌نوازی',
    descriptionEn: 'How guests are treated, hosting traditions',
    descriptionFa: 'برخورد با مهمان‌ها، سنت‌های میزبانی',
    icon: 'home',
    displayOrder: 6,
  },
  {
    slug: 'driving_culture',
    nameEn: 'Driving & Traffic',
    nameFa: 'فرهنگ رانندگی',
    descriptionEn: 'Traffic behavior, driving rules, road safety',
    descriptionFa: 'رفتار ترافیکی، قوانین رانندگی، ایمنی جاده‌ای',
    icon: 'car',
    displayOrder: 7,
  },
  {
    slug: 'attitude_strangers',
    nameEn: 'Attitude to Strangers',
    nameFa: 'رفتار با غریبه‌ها',
    descriptionEn: 'How people interact with strangers, openness, friendliness',
    descriptionFa: 'نحوه تعامل مردم با غریبه‌ها، باز بودن، دوستانه بودن',
    icon: 'user-plus',
    displayOrder: 8,
  },
  {
    slug: 'dress_culture',
    nameEn: 'Dress Culture',
    nameFa: 'فرهنگ پوشش',
    descriptionEn: 'Dress codes, fashion norms, formality expectations',
    descriptionFa: 'کدهای لباس، هنجارهای مد، انتظارات رسمی بودن',
    icon: 'shirt',
    displayOrder: 9,
  },
]

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data (optional - be careful in production!)
  console.log('🗑️  Clearing existing data...')
  await prisma.vote.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.category.deleteMany()
  await prisma.country.deleteMany()

  // Seed countries
  console.log('🌍 Seeding countries...')
  for (const country of countries) {
    await prisma.country.create({
      data: country,
    })
  }
  console.log(`✅ Created ${countries.length} countries`)

  // Seed categories
  console.log('📂 Seeding categories...')
  for (const category of categories) {
    await prisma.category.create({
      data: category,
    })
  }
  console.log(`✅ Created ${categories.length} categories`)

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch(e => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
