'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Comment {
  id: string
  content: string
  createdAt: Date
  userId: string
  likesCount: number
  dislikesCount: number
}

interface CommentSectionProps {
  postId: string
  initialComments: Comment[]
}

export function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const router = useRouter()
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      })

      if (response.ok) {
        const data = await response.json()
        setComments([data.comment, ...comments])
        setNewComment('')
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to post comment')
      }
    } catch (error) {
      console.error('Comment error:', error)
      alert('Failed to post comment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (date: Date) => {
    const d = new Date(date)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {/* Comment Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="organic-input"
          style={{
            minHeight: '100px',
            resize: 'vertical',
            fontFamily: 'inherit',
            fontSize: '15px',
            lineHeight: 1.6,
          }}
          disabled={isSubmitting}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            className="organic-btn organic-btn-primary"
            disabled={!newComment.trim() || isSubmitting}
            style={{
              opacity: (!newComment.trim() || isSubmitting) ? 0.5 : 1,
              cursor: (!newComment.trim() || isSubmitting) ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-6)', opacity: 0.6 }}>
          <p className="organic-card-body">No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                padding: 'var(--space-4)',
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-divider)',
              }}
            >
              {/* Comment Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                  }}
                >
                  👤
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>Anonymous</div>
                  <div className="organic-card-meta" style={{ fontSize: '12px' }}>
                    {formatDate(comment.createdAt)}
                  </div>
                </div>
              </div>

              {/* Comment Content */}
              <p style={{ fontSize: '15px', lineHeight: 1.6, margin: '0 0 var(--space-3) 0', whiteSpace: 'pre-wrap' }}>
                {comment.content}
              </p>

              {/* Comment Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--color-divider)' }}>
                <button
                  className="organic-btn organic-btn-ghost"
                  style={{
                    padding: 'var(--space-1) var(--space-2)',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-1)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                  <span>{comment.likesCount}</span>
                </button>
                <button
                  className="organic-btn organic-btn-ghost"
                  style={{
                    padding: 'var(--space-1) var(--space-2)',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-1)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: 'rotate(180deg)' }}>
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                  <span>{comment.dislikesCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
