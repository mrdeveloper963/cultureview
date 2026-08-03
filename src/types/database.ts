// TypeScript types for database models
import { Prisma } from '@prisma/client'

// Country types
export type Country = Prisma.CountryGetPayload<{}>

// Category types
export type Category = Prisma.CategoryGetPayload<{}>

// Post types
export type Post = Prisma.PostGetPayload<{}>
export type PostWithRelations = Prisma.PostGetPayload<{
  include: {
    country: true
    category: true
    comments: true
    votes: true
  }
}>

// Comment types
export type Comment = Prisma.CommentGetPayload<{}>
export type CommentWithRelations = Prisma.CommentGetPayload<{
  include: {
    replies: true
    votes: true
  }
}>

// Vote types
export type Vote = Prisma.VoteGetPayload<{}>

// Report types
export type Report = Prisma.ReportGetPayload<{}>

// Experience type enum
export type ExperienceType = 'native' | 'lived' | 'visited' | 'heard'

// Vote type enum
export type VoteType = 'like' | 'dislike'

// Report reason enum
export type ReportReason = 'spam' | 'hate_speech' | 'inappropriate' | 'misinformation' | 'other'

// Report status enum
export type ReportStatus = 'pending' | 'reviewed' | 'resolved' | 'dismissed'
