import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ReportsList } from '@/components/admin/ReportsList'

export default async function AdminReportsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // TODO: Add proper admin role check
  // For now, any authenticated user can access (you should implement proper admin checks)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Content Reports</h1>
          <p className="text-muted-foreground">
            Review and manage reported content from the community
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <ReportsList />
        </Suspense>
      </div>
    </div>
  )
}
