'use client'

import { useState, memo, useMemo } from 'react'
import Link from 'next/link'

interface Post {
  id: string
  title: string | null
  content: string
  experienceType: string
  likesCount: number
  dislikesCount: number
  createdAt: Date
  user?: {
    id: string
    email: string
  }
  userId?: string
  category: {
    id: number
    nameEn: string
    icon: string | null
  }
  country: {
    id: number
    nameEn: string
    code: string
  }
  _count: {
    comments: number
  }
}

interface PostCardProps {
  post: Post
}

const EXPERIENCE_LABELS: Record<string, string> = {
  native: 'Local',
  lived: 'Lived there',
  visited: 'Visited',
  heard: 'Heard from others',
}

export const PostCard = memo(function PostCard({ post }: PostCardProps) {
  const [likes, setLikes] = useState(post.likesCount)
  const [dislikes, setDislikes] = useState(post.dislikesCount)
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null)

  const formattedDate = useMemo(() => {
    const now = new Date()
    const diff = now.getTime() - new Date(post.createdAt).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`
    if (days < 365) return `${Math.floor(days / 30)} months ago`
    return `${Math.floor(days / 365)} years ago`
  }, [post.createdAt])

  const truncatedContent = useMemo(() => {
    return post.content.length > 300 ? `${post.content.slice(0, 300)}...` : post.content
  }, [post.content])

  const handleVote = async (voteType: 'like' | 'dislike') => {
    // If clicking the same vote, remove it
    if (userVote === voteType) {
      if (voteType === 'like') {
        setLikes(likes - 1)
      } else {
        setDislikes(dislikes - 1)
      }
      setUserVote(null)
      // TODO: Call API to remove vote
      return
    }

    // If switching vote
    if (userVote) {
      if (userVote === 'like') {
        setLikes(likes - 1)
        setDislikes(dislikes + 1)
      } else {
        setDislikes(dislikes - 1)
        setLikes(likes + 1)
      }
    } else {
      // New vote
      if (voteType === 'like') {
        setLikes(likes + 1)
      } else {
        setDislikes(dislikes + 1)
      }
    }

    setUserVote(voteType)
    // TODO: Call API to save vote
  }


  return (
    <div className="organic-card" style={{ padding: 'var(--space-4)', gap: 'var(--space-3)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', flexWrap: 'wrap' }}>
            {post.category.icon && <span style={{ fontSize: '20px', lineHeight: 1 }}>{post.category.icon}</span>}
            <span className="organic-card-title" style={{ fontSize: '14px' }}>{post.category.nameEn}</span>
            <span className="organic-card-meta">•</span>
            <span className="organic-tag organic-tag-accent-2" style={{ fontSize: '10px', padding: '2px 8px' }}>
              {EXPERIENCE_LABELS[post.experienceType] || post.experienceType}
            </span>
          </div>
          {post.title && (
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', marginBottom: 'var(--space-2)', lineHeight: 1.3 }}>
              {post.title}
            </h3>
          )}
        </div>
      </div>

      {/* Content */}
      <p style={{ fontSize: '14px', lineHeight: 1.6, opacity: 0.9 }}>
        {truncatedContent}
      </p>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', flexWrap: 'wrap', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--color-divider)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          {/* Like/Dislike */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <button
              onClick={() => handleVote('like')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: userVote === 'like' ? 'var(--color-accent-100)' : 'transparent',
                color: userVote === 'like' ? 'var(--color-accent)' : 'inherit',
                cursor: 'pointer',
                fontSize: '13px',
                transition: 'all 0.15s ease-out',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={userVote === 'like' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              <span style={{ fontWeight: 600 }}>{likes}</span>
            </button>

            <button
              onClick={() => handleVote('dislike')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: userVote === 'dislike' ? 'color-mix(in srgb, #dc2626 10%, transparent)' : 'transparent',
                color: userVote === 'dislike' ? '#dc2626' : 'inherit',
                cursor: 'pointer',
                fontSize: '13px',
                transition: 'all 0.15s ease-out',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={userVote === 'dislike' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" style={{ transform: 'rotate(180deg)' }}>
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              <span style={{ fontWeight: 600 }}>{dislikes}</span>
            </button>
          </div>

          {/* Comments */}
          <Link
            href={`/posts/${post.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              color: 'inherit',
              fontSize: '13px',
              transition: 'all 0.15s ease-out',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span style={{ fontWeight: 600 }}>{post._count.comments}</span>
          </Link>
        </div>

        {/* Date & View Details */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <span className="organic-card-meta" style={{ fontSize: '12px' }}>{formattedDate}</span>
          <Link
            href={`/posts/${post.id}`}
            className="organic-btn organic-btn-ghost"
            style={{ fontSize: '12px', padding: 'var(--space-1) var(--space-2)' }}
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  )
})
