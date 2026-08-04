import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Country } from '@/types'

interface CountryCardProps {
  country: Country
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/countries/${country.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Flag */}
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 border-2 border-primary/20">
              <span className="text-xl font-bold text-primary uppercase">
                {country.code}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {country.nameEn}
              </h3>
              {country.nameFa && (
                <p className="text-sm text-muted-foreground">{country.nameFa}</p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>
                  {country.totalPosts === 0
                    ? 'No opinions yet'
                    : `${country.totalPosts} ${country.totalPosts === 1 ? 'opinion' : 'opinions'}`}
                </span>
              </div>
            </div>

            {/* Badge */}
            {country.totalPosts > 0 && (
              <Badge variant="secondary" className="shrink-0">
                {country.totalPosts}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
