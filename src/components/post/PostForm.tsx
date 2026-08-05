'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Country, Category } from '@/types/database'

interface PostFormProps {
  countries: Country[]
  categories: Category[]
  defaultCountryId?: number
  defaultCategoryId?: number
}

const EXPERIENCE_TYPES = [
  { value: 'native', label: 'I am from this country', description: 'Local perspective' },
  { value: 'lived', label: 'I lived/worked there', description: 'Extended experience' },
  { value: 'visited', label: 'I visited there', description: 'Tourist perspective' },
  { value: 'heard', label: 'I heard from others', description: 'Secondhand knowledge' },
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
        console.error('Server error:', data)
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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Country Selection */}
      <div className="organic-card" style={{ padding: 'var(--space-4)', gap: 'var(--space-3)' }}>
        <div>
          <div className="organic-card-title" style={{ fontSize: '18px', marginBottom: 'var(--space-1)' }}>1. Select Country</div>
          <div className="organic-card-meta" style={{ fontSize: '13px' }}>Which country is this experience about?</div>
        </div>
        <select
          required
          value={formData.countryId}
          onChange={(e) => setFormData({ ...formData, countryId: e.target.value })}
          className="organic-input"
          style={{ width: '100%' }}
        >
          <option value="">Choose a country...</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.nameEn}
            </option>
          ))}
        </select>
      </div>

      {/* Category Selection */}
      <div className="organic-card" style={{ padding: 'var(--space-4)', gap: 'var(--space-3)' }}>
        <div>
          <div className="organic-card-title" style={{ fontSize: '18px', marginBottom: 'var(--space-1)' }}>2. Select Category</div>
          <div className="organic-card-meta" style={{ fontSize: '13px' }}>What aspect of culture does this relate to?</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setFormData({ ...formData, categoryId: category.id.toString() })}
              style={{
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                border: formData.categoryId === category.id.toString() ? '2px solid var(--color-accent)' : '2px solid var(--color-divider)',
                background: formData.categoryId === category.id.toString() ? 'var(--color-accent-100)' : 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease-out',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: '24px', lineHeight: 1 }}>{category.icon}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{category.nameEn}</h3>
                  {category.descriptionEn && (
                    <p className="organic-card-meta" style={{ fontSize: '11px', lineHeight: 1.4 }}>
                      {category.descriptionEn}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Experience Type */}
      <div className="organic-card" style={{ padding: 'var(--space-4)', gap: 'var(--space-3)' }}>
        <div>
          <div className="organic-card-title" style={{ fontSize: '18px', marginBottom: 'var(--space-1)' }}>3. Your Experience Level</div>
          <div className="organic-card-meta" style={{ fontSize: '13px' }}>How did you gain this knowledge?</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
          {EXPERIENCE_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setFormData({ ...formData, experienceType: type.value })}
              style={{
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                border: formData.experienceType === type.value ? '2px solid var(--color-accent)' : '2px solid var(--color-divider)',
                background: formData.experienceType === type.value ? 'var(--color-accent-100)' : 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease-out',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '14px' }}>{type.label}</div>
              <div className="organic-card-meta" style={{ fontSize: '11px', marginTop: '4px' }}>{type.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Title (Optional) */}
      <div className="organic-card" style={{ padding: 'var(--space-4)', gap: 'var(--space-3)' }}>
        <div>
          <div className="organic-card-title" style={{ fontSize: '18px', marginBottom: 'var(--space-1)' }}>4. Title (Optional)</div>
          <div className="organic-card-meta" style={{ fontSize: '13px' }}>A short, descriptive title for your experience</div>
        </div>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., Punctuality is taken very seriously"
          maxLength={200}
          className="organic-input"
          style={{ width: '100%' }}
        />
      </div>

      {/* Content */}
      <div className="organic-card" style={{ padding: 'var(--space-4)', gap: 'var(--space-3)' }}>
        <div>
          <div className="organic-card-title" style={{ fontSize: '18px', marginBottom: 'var(--space-1)' }}>5. Your Experience</div>
          <div className="organic-card-meta" style={{ fontSize: '13px' }}>
            Share your authentic experience in detail (minimum 50 characters)
          </div>
        </div>
        <textarea
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Describe your experience in detail. Focus on specific observations and personal insights rather than stereotypes..."
          className="organic-input"
          style={{ width: '100%', minHeight: '200px', resize: 'vertical', fontFamily: 'inherit' }}
          rows={10}
        />
        <div className="organic-card-meta" style={{ fontSize: '11px' }}>
          {formData.content.length} / 50 minimum characters
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', background: 'color-mix(in srgb, #dc2626 10%, transparent)', color: '#dc2626', fontSize: '14px' }}>
          {error}
        </div>
      )}

      {/* Submit Buttons */}
      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <button type="submit" className="organic-btn organic-btn-primary" style={{ flex: 1, minWidth: '200px', padding: 'var(--space-3) var(--space-4)' }} disabled={isSubmitting}>
          {isSubmitting ? 'Publishing...' : 'Publish Experience'}
        </button>
        <button
          type="button"
          className="organic-btn"
          style={{ border: '1px solid var(--color-divider)', padding: 'var(--space-3) var(--space-4)' }}
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>

      {/* Guidelines Notice */}
      <div style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', fontSize: '13px', opacity: 0.8 }}>
        <p>
          <strong>Please note:</strong> Share genuine, respectful experiences. Avoid
          stereotypes, offensive language, or hate speech. See our{' '}
          <a href="/guidelines" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
            Community Guidelines
          </a>{' '}
          for more information.
        </p>
      </div>
    </form>
  )
}
