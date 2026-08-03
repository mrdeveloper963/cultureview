import Link from 'next/link'
import { ArrowRight, MessageSquare } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Category } from '@/types'

interface CategoryListProps {
  categories: Category[]
  countryId: number
  postCounts?: Record<number, number>
}

export function CategoryList({ categories, countryId, postCounts = {} }: CategoryListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map(category => {
        const count = postCounts[category.id] || 0

        return (
          <Link key={category.id} href={`/countries/${countryId}/categories/${category.id}`}>
            <Card className="group h-full transition-all hover:shadow-md hover:border-primary/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {category.nameEn}
                      </h3>
                    </div>
                    {category.nameFa && (
                      <p className="text-sm text-muted-foreground">{category.nameFa}</p>
                    )}
                    {category.descriptionEn && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {category.descriptionEn}
                      </p>
                    )}

                    {/* Post count */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>
                        {count === 0
                          ? 'No opinions yet'
                          : `${count} ${count === 1 ? 'opinion' : 'opinions'}`}
                      </span>
                    </div>
                  </div>

                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
