'use client'

import { useRouter } from 'next/navigation'

interface Country {
  id: number
  nameEn: string
  totalPosts: number
}

interface CountryFilterProps {
  countries: Country[]
  categorySlug: string
  currentCountryId?: number
}

export function CountryFilter({ countries, categorySlug, currentCountryId }: CountryFilterProps) {
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = e.target.value
    if (countryId) {
      router.push(`/categories/${categorySlug}?country=${countryId}`)
    } else {
      router.push(`/categories/${categorySlug}`)
    }
  }

  return (
    <select
      className="organic-input"
      style={{ width: 'auto', minWidth: '250px', paddingLeft: '12px' }}
      value={currentCountryId || ''}
      onChange={handleChange}
    >
      <option value="">All Countries</option>
      {countries.map((country) => (
        <option key={country.id} value={country.id}>
          {country.nameEn} ({country.totalPosts} {country.totalPosts === 1 ? 'opinion' : 'opinions'})
        </option>
      ))}
    </select>
  )
}
