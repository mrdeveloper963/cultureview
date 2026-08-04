'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Report {
  id: string
  reason: string
  description: string | null
  status: string
  createdAt: string
  post?: {
    id: string
    title: string | null
    content: string
    country: { nameEn: string }
    category: { nameEn: string }
  }
  comment?: {
    id: string
    content: string
    post: {
      id: string
      title: string | null
      country: { nameEn: string }
      category: { nameEn: string }
    }
  }
}

const STATUS_COLORS = {
  pending: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
  reviewed: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  resolved: 'bg-green-500/10 text-green-700 border-green-500/20',
  dismissed: 'bg-gray-500/10 text-gray-700 border-gray-500/20',
}

const REASON_LABELS = {
  spam: 'Spam',
  hate_speech: 'Hate Speech',
  inappropriate: 'Inappropriate',
  misinformation: 'Misinformation',
  other: 'Other',
}

export function ReportsList() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('pending')

  useEffect(() => {
    fetchReports()
  }, [statusFilter])

  const fetchReports = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/reports?status=${statusFilter}`)
      const data = await response.json()
      setReports(data.reports || [])
    } catch (error) {
      console.error('Failed to fetch reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateReportStatus = async (reportId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchReports()
      }
    } catch (error) {
      console.error('Failed to update report:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading reports...</div>
  }

  return (
    <div className="space-y-6">
      {/* Status Filter */}
      <div className="flex gap-2">
        {['pending', 'reviewed', 'resolved', 'dismissed'].map((status) => (
          <Button
            key={status}
            variant={statusFilter === status ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter(status)}
            className="capitalize"
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Reports List */}
      {reports.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-4xl mb-4">📭</div>
            <h3 className="text-lg font-semibold mb-2">No {statusFilter} reports</h3>
            <p className="text-muted-foreground">
              There are no reports with this status at the moment.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="destructive">
                        {REASON_LABELS[report.reason as keyof typeof REASON_LABELS]}
                      </Badge>
                      <Badge className={STATUS_COLORS[report.status as keyof typeof STATUS_COLORS]}>
                        {report.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {report.description && (
                      <p className="text-sm text-muted-foreground mb-3">
                        <strong>Details:</strong> {report.description}
                      </p>
                    )}

                    {/* Reported Content */}
                    {report.post && (
                      <div className="p-4 rounded-lg bg-muted/50 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            Post
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {report.post.country.nameEn} - {report.post.category.nameEn}
                          </Badge>
                        </div>
                        {report.post.title && (
                          <h4 className="font-semibold text-sm mb-1">{report.post.title}</h4>
                        )}
                        <p className="text-sm line-clamp-2">{report.post.content}</p>
                        <Link href={`/posts/${report.post.id}`} className="text-xs text-primary hover:underline mt-2 inline-block">
                          View Post →
                        </Link>
                      </div>
                    )}

                    {report.comment && (
                      <div className="p-4 rounded-lg bg-muted/50 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            Comment
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {report.comment.post.country.nameEn} - {report.comment.post.category.nameEn}
                          </Badge>
                        </div>
                        <p className="text-sm line-clamp-2">{report.comment.content}</p>
                        <Link href={`/posts/${report.comment.post.id}`} className="text-xs text-primary hover:underline mt-2 inline-block">
                          View Post →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {report.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateReportStatus(report.id, 'reviewed')}
                    >
                      Mark as Reviewed
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => updateReportStatus(report.id, 'resolved')}
                    >
                      Resolve
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateReportStatus(report.id, 'dismissed')}
                    >
                      Dismiss
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
