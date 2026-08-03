'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Country, Category } from '@/types/database'

interface PostFormProps {
  countries: Country[]
  categories: Category[]
  defaultCountryId?: number
  defaultCategoryId?: number
}

const EXPERIENCE_TYPES = [
  { value: 'native', label: 'I am from this country', labelFa: 'اهل این کشورم' },
  { value: 'lived', label: 'I lived/worked there', labelFa: 'آنجا زندگی/کار کرده‌ام' },
  { value: 'visited', label: 'I visited there', labelFa: 'سفر کرده‌ام' },
  { value: 'heard', label: 'I heard from others', labelFa: 'فقط شنیده‌ام' },
]

export function PostForm({
  countries,
  categories,
  defaultCountryId,
  defaultCategoryId,
}: PostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    countryId: defaultCountryId || '',
    categoryId: defaultCategoryId || '',
    title: '',
    content: '',
    experienceType: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.countryId || !formData.categoryId || !formData.content.trim() || !formData.experienceType) {
      setError('Please fill in all required fields')
      return
    }

    if (formData.content.trim().length < 50) {
      setError('Your experience should be at least 50 characters long')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          countryId: parseInt(formData.countryId as string),
          categoryId: parseInt(formData.categoryId as string),
          title: formData.title.trim() || null,
          content: formData.content.trim(),
          experienceType: formData.experienceType,
        }),
      })

      if (response.status === 401) {
        router.push('/auth/login')
        return
      }

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create post')
      }

      const data = await response.json()
      router.push(`/posts/${data.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Country Selection */}
      <Card>
        <CardHeader>
          <CardTitle>1. Select Country</CardTitle>
          <CardDescription>Which country is this experience about?</CardDescription>
        </CardHeader>
        <CardContent>
          <select
            required
            value={formData.countryId}
            onChange={(e) => setFormData({ ...formData, countryId: e.target.value })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Choose a country...</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.nameEn} {country.nameFa && `(${country.nameFa})`}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Category Selection */}
      <Card>
        <CardHeader>
          <CardTitle>2. Select Category</CardTitle>
          <CardDescription>What aspect of culture does this relate to?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setFormData({ ...formData, categoryId: category.id.toString() })}
                className={`p-4 rounded-lg border-2 text-left transition-all hover:border-primary ${
                  formData.categoryId === category.id.toString()
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{category.nameEn}</h3>
                    {category.descriptionEn && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {category.descriptionEn}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience Type */}
      <Card>
        <CardHeader>
          <CardTitle>3. Your Experience Level</CardTitle>
          <CardDescription>How did you gain this knowledge?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EXPERIENCE_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setFormData({ ...formData, experienceType: type.value })}
                className={`p-4 rounded-lg border-2 text-left transition-all hover:border-primary ${
                  formData.experienceType === type.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}
              >
                <div className="font-medium text-sm">{type.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{type.labelFa}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Title (Optional) */}
      <Card>
        <CardHeader>
          <CardTitle>4. Title (Optional)</CardTitle>
          <CardDescription>A short, descriptive title for your experience</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Punctuality is taken very seriously"
            maxLength={200}
          />
        </CardContent>
      </Card>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>5. Your Experience</CardTitle>
          <CardDescription>
            Share your authentic experience in detail (minimum 50 characters)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <textarea
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Describe your experience in detail. Focus on specific observations and personal insights rather than stereotypes..."
            className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
            rows={10}
          />
          <div className="mt-2 text-xs text-muted-foreground">
            {formData.content.length} / 50 minimum characters
          </div>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Submit Buttons */}
      <div className="flex gap-3">
        <Button type="submit" size="lg" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? 'Publishing...' : 'Publish Experience'}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>

      {/* Guidelines Notice */}
      <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
        <p>
          <strong>Please note:</strong> Share genuine, respectful experiences. Avoid
          stereotypes, offensive language, or hate speech. See our{' '}
          <a href="/guidelines" className="underline hover:text-foreground">
            Community Guidelines
          </a>{' '}
          for more information.
        </p>
      </div>
    </form>
  )
}
