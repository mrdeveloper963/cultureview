// API request and response types
import { ExperienceType, VoteType, ReportReason } from './database'

// Post API types
export interface CreatePostRequest {
  countryId: number
  categoryId: number
  title?: string
  content: string
  experienceType: ExperienceType
}

export interface UpdatePostRequest {
  title?: string
  content?: string
}

// Comment API types
export interface CreateCommentRequest {
  postId: string
  content: string
  parentCommentId?: string
}

export interface UpdateCommentRequest {
  content: string
}

// Vote API types
export interface CreateVoteRequest {
  postId?: string
  commentId?: string
  voteType: VoteType
}

// Report API types
export interface CreateReportRequest {
  postId?: string
  commentId?: string
  reason: ReportReason
  description?: string
}

// Search API types
export interface SearchParams {
  q?: string
  countryId?: number
  categoryId?: number
  experienceType?: ExperienceType
  sortBy?: 'newest' | 'popular' | 'controversial'
  page?: number
  limit?: number
}

// Pagination response
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
