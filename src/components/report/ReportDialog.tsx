'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

interface ReportDialogProps {
  isOpen: boolean
  onClose: () => void
  postId?: string
  commentId?: string
}

const REPORT_REASONS = [
  {
    value: 'spam',
    label: 'Spam or Advertisement',
    description: 'Unsolicited advertising or repeated content',
  },
  {
    value: 'hate_speech',
    label: 'Hate Speech or Discrimination',
    description: 'Content that promotes hatred or discrimination',
  },
  {
    value: 'inappropriate',
    label: 'Inappropriate Content',
    description: 'Offensive, vulgar, or NSFW content',
  },
  {
    value: 'misinformation',
    label: 'Misinformation',
    description: 'False or misleading information',
  },
  {
    value: 'other',
    label: 'Other',
    description: 'Other violation of community guidelines',
  },
]

export function ReportDialog({ isOpen, onClose, postId, commentId }: ReportDialogProps) {
  const router = useRouter()
  const [selectedReason, setSelectedReason] = useState<string>('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!selectedReason) {
      setError('Please select a reason')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          commentId,
          reason: selectedReason,
          description: description.trim() || null,
        }),
      })

      if (response.status === 401) {
        router.push('/auth/login')
        return
      }

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit report')
      }

      setSuccess(true)
      setTimeout(() => {
        onClose()
        setSuccess(false)
        setSelectedReason('')
        setDescription('')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto m-4">
        <Card>
          <CardHeader>
            <CardTitle>Report Content</CardTitle>
            <CardDescription>
              Help us maintain a respectful community by reporting inappropriate content
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="py-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-lg font-semibold mb-2">Report Submitted</h3>
                <p className="text-sm text-muted-foreground">
                  Thank you for helping keep our community safe. We'll review this report soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Reason Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Reason for Report *</label>
                  {REPORT_REASONS.map((reason) => (
                    <button
                      key={reason.value}
                      type="button"
                      onClick={() => setSelectedReason(reason.value)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedReason === reason.value
                          ? 'border-destructive bg-destructive/5'
                          : 'border-border hover:border-destructive/50'
                      }`}
                    >
                      <div className="font-medium text-sm mb-1">{reason.label}</div>
                      <div className="text-xs text-muted-foreground">{reason.description}</div>
                    </button>
                  ))}
                </div>

                {/* Additional Details */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Additional Details (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide any additional context that might help us review this report..."
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    rows={4}
                    maxLength={500}
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {description.length} / 500
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>

                {/* Notice */}
                <div className="text-xs text-muted-foreground">
                  <strong>Note:</strong> False reports may result in action against your account.
                  Only report content that violates our{' '}
                  <a href="/guidelines" className="underline hover:text-foreground">
                    Community Guidelines
                  </a>
                  .
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
