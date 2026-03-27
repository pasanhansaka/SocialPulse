// backend/src/types/platform.ts

export type PlatformId = 
  | 'twitter' 
  | 'instagram' 
  | 'facebook' 
  | 'linkedin' 
  | 'tiktok' 
  | 'youtube' 
  | 'pinterest' 
  | 'threads' 
  | 'bluesky'

export interface PostData {
  content: string
  media?: Array<{
    url: string
    type: 'image' | 'video'
    size: number
    platform_specific?: any
  }>
  scheduledAt?: Date
}

export interface PublishResult {
  platform: PlatformId
  status: 'published' | 'failed' | 'queued'
  postUrl?: string
  error?: string
  retryAt?: number
  metadata?: any
}

export interface AccountWithTokens {
  accessToken: string
  refreshToken?: string | null
  tokenExpiry?: Date | null
  platformUserId: string
  [key: string]: any
}
