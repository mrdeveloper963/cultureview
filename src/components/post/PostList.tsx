'use client'

import Link from 'next/link'
import { PostCard } from './PostCard'

interface Post {
  id: string
  title: string | null
  content: string
  experienceType: string
  likesCount: number
  dislikesCount: number
  createdAt: Date
  user: {
    id: string
    email: string
  }
  category: {
    id: number
    nameEn: string
    icon: string
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

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
