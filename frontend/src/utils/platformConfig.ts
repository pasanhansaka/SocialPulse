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

export interface PlatformConfig {
  id: PlatformId
  name: string
  color: string
  bgColor: string
  charLimit: number
  maxImages: number
  maxVideoMB: number
  supportsHashtags: boolean
  supportsMentions: boolean
  supportsFirstComment: boolean
  supportsAltText: boolean
  oauthScopes: string[]
  apiBaseUrl?: string
  publishEndpoint?: string
}

export const PLATFORMS: Record<PlatformId, PlatformConfig> = {
  twitter: {
    id: 'twitter',
    name: 'Twitter / X',
    color: '#000000',
    bgColor: 'rgba(0,0,0,0.1)',
    charLimit: 280,
    maxImages: 4,
    maxVideoMB: 512,
    supportsHashtags: true,
    supportsMentions: true,
    supportsFirstComment: false,
    supportsAltText: true,
    oauthScopes: ['tweet.read', 'tweet.write', 'users.read', 'offline.access']
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    color: '#E4405F',
    bgColor: 'rgba(228,64,95,0.1)',
    charLimit: 2200,
    maxImages: 10,
    maxVideoMB: 100,
    supportsHashtags: true,
    supportsMentions: true,
    supportsFirstComment: true,
    supportsAltText: true,
    oauthScopes: ['instagram_basic', 'instagram_content_publish', 'pages_read_engagement']
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    color: '#1877F2',
    bgColor: 'rgba(24,119,242,0.1)',
    charLimit: 63206,
    maxImages: 10,
    maxVideoMB: 4000,
    supportsHashtags: true,
    supportsMentions: true,
    supportsFirstComment: false,
    supportsAltText: true,
    oauthScopes: ['pages_manage_posts', 'pages_read_engagement']
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    color: '#0A66C2',
    bgColor: 'rgba(10,102,194,0.1)',
    charLimit: 3000,
    maxImages: 9,
    maxVideoMB: 5000,
    supportsHashtags: true,
    supportsMentions: true,
    supportsFirstComment: true,
    supportsAltText: true,
    oauthScopes: ['w_member_social', 'w_organization_social', 'r_liteprofile']
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    color: '#000000',
    bgColor: 'rgba(0,0,0,0.1)',
    charLimit: 2200,
    maxImages: 35,
    maxVideoMB: 4000,
    supportsHashtags: true,
    supportsMentions: true,
    supportsFirstComment: false,
    supportsAltText: false,
    oauthScopes: ['video.upload', 'video.publish', 'user.info.basic']
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    color: '#FF0000',
    bgColor: 'rgba(255,0,0,0.1)',
    charLimit: 5000,
    maxImages: 0,
    maxVideoMB: 256000,
    supportsHashtags: true,
    supportsMentions: true,
    supportsFirstComment: false,
    supportsAltText: false,
    oauthScopes: ['https://www.googleapis.com/auth/youtube.upload']
  },
  pinterest: {
    id: 'pinterest',
    name: 'Pinterest',
    color: '#E60023',
    bgColor: 'rgba(230,0,35,0.1)',
    charLimit: 500,
    maxImages: 1,
    maxVideoMB: 32,
    supportsHashtags: true,
    supportsMentions: false,
    supportsFirstComment: false,
    supportsAltText: true,
    oauthScopes: ['boards:read', 'pins:read', 'pins:write']
  },
  threads: {
    id: 'threads',
    name: 'Threads',
    color: '#000000',
    bgColor: 'rgba(0,0,0,0.1)',
    charLimit: 500,
    maxImages: 20,
    maxVideoMB: 8,
    supportsHashtags: true,
    supportsMentions: true,
    supportsFirstComment: false,
    supportsAltText: true,
    oauthScopes: ['threads_content_publish', 'threads_basic']
  },
  bluesky: {
    id: 'bluesky',
    name: 'Bluesky',
    color: '#0085FF',
    bgColor: 'rgba(0,133,255,0.1)',
    charLimit: 300,
    maxImages: 4,
    maxVideoMB: 100,
    supportsHashtags: true,
    supportsMentions: true,
    supportsFirstComment: false,
    supportsAltText: true,
    oauthScopes: [] // AT Protocol uses app passwords or sessions
  }
}

export const getPlatformConfig = (id: PlatformId) => PLATFORMS[id]

export const isOverLimit = (text: string, platformId: PlatformId): boolean => {
  const config = PLATFORMS[platformId]
  return text.length > config.charLimit
}

export const getRemainingChars = (text: string, platformId: PlatformId): number => {
  const config = PLATFORMS[platformId]
  return config.charLimit - text.length
}
