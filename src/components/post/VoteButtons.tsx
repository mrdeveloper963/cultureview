'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VoteButtonsProps {
  postId: string
  initialLikes: number
  initialDislikes: number
}

export function VoteButtons({ postId, initialLikes, initialDislikes }: VoteButtonsProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null)
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = async (voteType: 'like' | 'dislike') => {
    if (isVoting) return

    setIsVoting(true)

    try {
      if (userVote === voteType) {
        if (voteType === 'like') {
          setLikes(likes - 1)
        } else {
          setDislikes(dislikes - 1)
        }
        setUserVote(null)
      } else {
        if (userVote === 'like') {
          setLikes(likes - 1)
          setDislikes(dislikes + 1)
        } else if (userVote === 'dislike') {
          setDislikes(dislikes - 1)
          setLikes(likes + 1)
        } else {
          if (voteType === 'like') {
            setLikes(likes + 1)
          } else {
            setDislikes(dislikes + 1)
          }
        }
        setUserVote(voteType)
      }

      await fetch(`/api/posts/${postId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voteType }),
      })
    } catch (error) {
      console.error('Failed to vote:', error)
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={userVote === 'like' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleVote('like')}
        disabled={isVoting}
        className={`gap-2 ${
          userVote === 'like'
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'hover:bg-green-50 dark:hover:bg-green-950'
        }`}
      >
        <ThumbsUp className="h-4 w-4" />
        <span className="font-semibold">{likes}</span>
      </Button>

      <Button
        variant={userVote === 'dislike' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleVote('dislike')}
        disabled={isVoting}
        className={`gap-2 ${
          userVote === 'dislike'
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'hover:bg-red-50 dark:hover:bg-red-950'
        }`}
      >
        <ThumbsDown className="h-4 w-4" />
        <span className="font-semibold">{dislikes}</span>
      </Button>

      <span className="text-sm text-muted-foreground ml-2">
        {likes + dislikes > 0 && `${Math.round((likes / (likes + dislikes)) * 100)}% agree`}
      </span>
    </div>
  )
}
