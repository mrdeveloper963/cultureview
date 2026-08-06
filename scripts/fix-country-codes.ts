import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Map 3-letter codes to 2-letter codes (ISO 3166-1 alpha-3 to alpha-2)
const CODE_MAPPING: Record<string, string> = {
  'AFG': 'af', // Afghanistan
  'ALB': 'al', // Albania
  'DZA': 'dz', // Algeria
  'ARG': 'ar', // Argentina
  'ARM': 'am', // Armenia
  'AUS': 'au', // Australia
  'AUT': 'at', // Austria
  'AZE': 'az', // Azerbaijan
  'BHR': 'bh', // Bahrain
  'BGD': 'bd', // Bangladesh
  'BLR': 'by', // Belarus
  'BEL': 'be', // Belgium
  'BOL': 'bo', // Bolivia
  'BIH': 'ba', // Bosnia and Herzegovina
  'BRA': 'br', // Brazil
  'BGR': 'bg', // Bulgaria
  'KHM': 'kh', // Cambodia
  'CAN': 'ca', // Canada
  'CHL': 'cl', // Chile
  'CHN': 'cn', // China
  'COL': 'co', // Colombia
  'CRI': 'cr', // Costa Rica
  'HRV': 'hr', // Croatia
  'CUB': 'cu', // Cuba
  'CYP': 'cy', // Cyprus
  'CZE': 'cz', // Czech Republic
  'DNK': 'dk', // Denmark
  'DOM': 'do', // Dominican Republic
  'ECU': 'ec', // Ecuador
  'EGY': 'eg', // Egypt
  'SLV': 'sv', // El Salvador
  'EST': 'ee', // Estonia
  'ETH': 'et', // Ethiopia
  'FIN': 'fi', // Finland
  'FRA': 'fr', // France
  'GEO': 'ge', // Georgia
  'DEU': 'de', // Germany
  'GHA': 'gh', // Ghana
  'GRC': 'gr', // Greece
  'GTM': 'gt', // Guatemala
  'HTI': 'ht', // Haiti
  'HND': 'hn', // Honduras
  'HKG': 'hk', // Hong Kong
  'HUN': 'hu', // Hungary
  'ISL': 'is', // Iceland
  'IND': 'in', // India
  'IDN': 'id', // Indonesia
  'IRN': 'ir', // Iran
  'IRQ': 'iq', // Iraq
  'IRL': 'ie', // Ireland
  'ISR': 'il', // Israel
  'ITA': 'it', // Italy
  'JAM': 'jm', // Jamaica
  'JPN': 'jp', // Japan
  'JOR': 'jo', // Jordan
  'KAZ': 'kz', // Kazakhstan
  'KEN': 'ke', // Kenya
  'KWT': 'kw', // Kuwait
  'LVA': 'lv', // Latvia
  'LBN': 'lb', // Lebanon
  'LBY': 'ly', // Libya
  'LTU': 'lt', // Lithuania
  'LUX': 'lu', // Luxembourg
  'MYS': 'my', // Malaysia
  'MLT': 'mt', // Malta
  'MEX': 'mx', // Mexico
  'MDA': 'md', // Moldova
  'MNG': 'mn', // Mongolia
  'MAR': 'ma', // Morocco
  'NPL': 'np', // Nepal
  'NLD': 'nl', // Netherlands
  'NZL': 'nz', // New Zealand
  'NIC': 'ni', // Nicaragua
  'NGA': 'ng', // Nigeria
  'MKD': 'mk', // North Macedonia
  'NOR': 'no', // Norway
  'OMN': 'om', // Oman
  'PAK': 'pk', // Pakistan
  'PAN': 'pa', // Panama
  'PRY': 'py', // Paraguay
  'PER': 'pe', // Peru
  'PHL': 'ph', // Philippines
  'POL': 'pl', // Poland
  'PRT': 'pt', // Portugal
  'QAT': 'qa', // Qatar
  'ROU': 'ro', // Romania
  'RUS': 'ru', // Russia
  'SAU': 'sa', // Saudi Arabia
  'SRB': 'rs', // Serbia
  'SGP': 'sg', // Singapore
  'SVK': 'sk', // Slovakia
  'SVN': 'si', // Slovenia
  'ZAF': 'za', // South Africa
  'KOR': 'kr', // South Korea
  'ESP': 'es', // Spain
  'LKA': 'lk', // Sri Lanka
  'SWE': 'se', // Sweden
  'CHE': 'ch', // Switzerland
  'SYR': 'sy', // Syria
  'TWN': 'tw', // Taiwan
  'THA': 'th', // Thailand
  'TUN': 'tn', // Tunisia
  'TUR': 'tr', // Turkey
  'UKR': 'ua', // Ukraine
  'ARE': 'ae', // United Arab Emirates
  'GBR': 'gb', // United Kingdom
  'USA': 'us', // United States
  'URY': 'uy', // Uruguay
  'VEN': 've', // Venezuela
  'VNM': 'vn', // Vietnam
  'YEM': 'ye', // Yemen
}

async function main() {
  console.log('Fixing country codes from 3-letter to 2-letter...\n')

  const countries = await prisma.country.findMany()
  let updated = 0
  let notFound = 0

  for (const country of countries) {
    const newCode = CODE_MAPPING[country.code]

    if (!newCode) {
      console.log(`❌ No mapping found for: ${country.nameEn} (${country.code})`)
      notFound++
      continue
    }

    if (country.code.toLowerCase() === newCode) {
      console.log(`✓ ${country.nameEn}: already correct (${newCode})`)
      continue
    }

    await prisma.country.update({
      where: { id: country.id },
      data: { code: newCode.toUpperCase() }
    })

    console.log(`✅ ${country.nameEn}: ${country.code} → ${newCode.toUpperCase()}`)
    updated++
  }

  console.log(`\n✅ Complete! Updated ${updated} countries, ${notFound} not found`)
}

main()
  .catch(e => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
