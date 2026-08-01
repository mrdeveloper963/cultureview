// Application constants

export const EXPERIENCE_TYPES = {
  NATIVE: 'native',
  LIVED: 'lived',
  TRAVELED: 'traveled',
  HEARD: 'heard',
} as const

export const VOTE_TYPES = {
  LIKE: 'like',
  DISLIKE: 'dislike',
} as const

export const REPORT_REASONS = {
  SPAM: 'spam',
  HATE_SPEECH: 'hate_speech',
  INAPPROPRIATE: 'inappropriate',
  MISINFORMATION: 'misinformation',
  OTHER: 'other',
} as const

export const REPORT_STATUS = {
  PENDING: 'pending',
  REVIEWED: 'reviewed',
  RESOLVED: 'resolved',
  DISMISSED: 'dismissed',
} as const

export const ITEMS_PER_PAGE = 20
export const MAX_COMMENT_DEPTH = 3
export const MAX_POST_LENGTH = 5000
export const MAX_COMMENT_LENGTH = 2000
