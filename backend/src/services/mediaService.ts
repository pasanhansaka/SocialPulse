import { PlatformId } from '../types/platform'
import { PLATFORMS } from '../../frontend/src/utils/platformConfig' // Shared config
import { logger } from '../index.js'

export interface MediaValidationResult {
  valid: boolean
  error?: string
}

export const mediaService = {
  /**
   * Validate media file against platform-specific constraints
   */
  validateMedia: (
    platform: PlatformId, 
    file: { type: string, size: number }
  ): MediaValidationResult => {
    const config = PLATFORMS[platform]
    
    // Check if platform supports media
    if (config.maxImages === 0 && config.maxVideoMB === 0) {
      return { valid: false, error: `${config.name} does not support media uploads.` }
    }

    // Check file size (MB conversion)
    const fileSizeMB = file.size / (1024 * 1024)
    if (file.type.startsWith('video/') && fileSizeMB > config.maxVideoMB) {
      return { 
        valid: false, 
        error: `Video size ${fileSizeMB.toFixed(1)}MB exceeds ${config.name} limit of ${config.maxVideoMB}MB.` 
      }
    }

    // Standard image validation (R2 typically handles 8-10MB+ effortlessly)
    if (file.type.startsWith('image/') && fileSizeMB > 8) {
      return { valid: false, error: 'Image size exceeds 8MB limit.' }
    }

    return { valid: true }
  },

  /**
   * Placeholder for Cloudflare R2/S3 Upload flow
   * In production, use @aws-sdk/client-s3 with PutObjectCommand
   */
  uploadToStorage: async (file: any, userId: string): Promise<string> => {
    logger.info(`Uploading media for user ${userId}...`)
    
    // Mock upload URL for now (placeholder)
    const mockUrl = `https://storage.socialpulse.app/media/${userId}/${Date.now()}_${file.originalname}`
    
    return mockUrl
  }
}
