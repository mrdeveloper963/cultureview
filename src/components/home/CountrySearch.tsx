'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Country {
  id: number
  nameEn: string
  code: string
}

interface CountrySearchProps {
  countries: Country[]
}

export function CountrySearch({ countries }: CountrySearchProps) {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()

  const filteredCountries = query.trim()
    ? countries
        .filter(c => c.nameEn.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
    : []

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (filteredCountries.length > 0) {
      router.push(`/countries/${filteredCountries[0].id}`)
      setQuery('')
      setShowSuggestions(false)
    }
  }

  const handleSelectCountry = (countryId: number) => {
    router.push(`/countries/${countryId}`)
    setQuery('')
    setShowSuggestions(false)
  }

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', gap: 'var(--space-2)', maxWidth: '520px', position: 'relative' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text)', opacity: 0.55, zIndex: 1 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <circle cx="10.5" cy="10.5" r="6.5"></circle>
            <line x1="21" y1="21" x2="15.5" y2="15.5"></line>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search for a country, like Japan or Brazil"
          className="organic-input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            // Delay to allow click on suggestion
            setTimeout(() => setShowSuggestions(false), 200)
          }}
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredCountries.length > 0 && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-divider)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 10,
          }}>
            {filteredCountries.map((country) => (
              <button
                key={country.id}
                type="button"
                onClick={() => handleSelectCountry(country.id)}
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  textAlign: 'left',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  transition: 'background 0.15s ease-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-accent-100)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--color-divider)', flexShrink: 0 }}>
                  <img
                    src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`}
                    alt={country.nameEn}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <span style={{ fontWeight: 500 }}>{country.nameEn}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <button type="submit" className="organic-btn organic-btn-primary">Search</button>
    </form>
  )
}
