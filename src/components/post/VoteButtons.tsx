'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface VoteButtonsProps {
  postId: string
  initialLikes: number
  initialDislikes: number
}

export function VoteButtons({ postId, initialLikes, initialDislikes }: VoteButtonsProps) {
  const router = useRouter()
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = async (voteType: 'like' | 'dislike') => {
    if (isVoting) return

    setIsVoting(true)
    try {
      const response = await fetch(`/api/posts/${postId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteType }),
      })

      if (response.ok) {
        const data = await response.json()
        setLikes(data.likesCount)
        setDislikes(data.dislikesCount)
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to vote')
      }
    } catch (error) {
      console.error('Vote error:', error)
      alert('Failed to vote. Please try again.')
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
      {/* Like Button */}
      <button
        onClick={() => handleVote('like')}
        disabled={isVoting}
        className="organic-btn organic-btn-ghost"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: 'var(--space-2) var(--space-3)',
          opacity: isVoting ? 0.5 : 1,
          cursor: isVoting ? 'not-allowed' : 'pointer',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
        </svg>
        <span style={{ fontWeight: 600 }}>{likes}</span>
      </button>

      {/* Dislike Button */}
      <button
        onClick={() => handleVote('dislike')}
        disabled={isVoting}
        className="organic-btn organic-btn-ghost"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: 'var(--space-2) var(--space-3)',
          opacity: isVoting ? 0.5 : 1,
          cursor: isVoting ? 'not-allowed' : 'pointer',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: 'rotate(180deg)' }}>
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
        </svg>
        <span style={{ fontWeight: 600 }}>{dislikes}</span>
      </button>
    </div>
  )
}
