'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import type { Country, Category } from '@/types/database'
import { useState } from 'react'

interface SearchFiltersProps {
  countries: Country[]
  categories: Category[]
  currentFilters: {
    q?: string
    country?: string
    category?: string
    experienceType?: string
    sortBy?: string
  }
}

const EXPERIENCE_TYPES = [
  { value: 'native', label: 'Native' },
  { value: 'lived', label: 'Lived There' },
  { value: 'visited', label: 'Visited' },
  { value: 'heard', label: 'Heard From Others' },
]

const SORT_OPTIONS = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'discussed', label: 'Most Discussed' },
]

export function SearchFilters({
  countries,
  categories,
  currentFilters,
}: SearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(currentFilters.q || '')

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    // Reset to page 1 when filters change
    params.delete('page')

    router.push(`/search?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearchQuery('')
    router.push('/search')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilter('q', searchQuery.trim() || null)
  }

  const hasActiveFilters =
    currentFilters.q ||
    currentFilters.country ||
    currentFilters.category ||
    currentFilters.experienceType

  return (
    <div className="space-y-4">
      {/* Search Query */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-2">
            <Input
              type="text"
              placeholder="Search experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="sm" className="w-full">
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Sort By */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sort By</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => updateFilter('sortBy', option.value)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                (currentFilters.sortBy || 'recent') === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              {option.label}
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Country Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Country</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={currentFilters.country || ''}
            onChange={(e) => updateFilter('country', e.target.value || null)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.nameEn}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <button
            onClick={() => updateFilter('category', null)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              !currentFilters.category
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => updateFilter('category', category.id.toString())}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                currentFilters.category === category.id.toString()
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.nameEn}</span>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Experience Type Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Experience Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <button
            onClick={() => updateFilter('experienceType', null)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              !currentFilters.experienceType
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            All Types
          </button>
          {EXPERIENCE_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => updateFilter('experienceType', type.value)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                currentFilters.experienceType === type.value
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              {type.label}
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  )
}
