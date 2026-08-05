'use client'

import { useRouter } from 'next/navigation'
import type { Category } from '@/types/database'

interface CategoryFilterProps {
  categories: Category[]
  countryId: number
  currentCategoryId?: number
}

export function CategoryFilter({ categories, countryId, currentCategoryId }: CategoryFilterProps) {
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value
    if (categoryId) {
      router.push(`/countries/${countryId}?category=${categoryId}`)
    } else {
      router.push(`/countries/${countryId}`)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
      <label htmlFor="category-filter" style={{ fontSize: '14px', fontWeight: 600, opacity: 0.8 }}>
        Filter by category:
      </label>
      <select
        id="category-filter"
        value={currentCategoryId || ''}
        onChange={handleChange}
        className="organic-input"
        style={{ minWidth: '250px', maxWidth: '400px' }}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.icon} {category.nameEn}
          </option>
        ))}
      </select>
    </div>
  )
}
