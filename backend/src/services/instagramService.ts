import axios from 'axios'
import { PostData, AccountWithTokens, PublishResult } from '../types/platform.js'

/**
 * Instagram Graph API Service Implementation
 * Supports Business/Creator accounts
 */
export const instagramService = {
  /**
   * Publish a post (Image or Video) to Instagram
   * @param post - Content to publish
   * @param account - Connected account tokens (needs ig_user_id)
   */
  publish: async (post: PostData, account: AccountWithTokens): Promise<PublishResult> => {
    try {
      const igUserId = account.platformUserId
      const accessToken = account.accessToken

      // 1. Create Media Container
      // Instagram requires a publicly accessible URL for the media
      if (!post.media || post.media.length === 0) {
        throw new Error('Instagram requires at least one image or video.')
      }

      const mediaUrl = post.media[0].url
      const isVideo = post.media[0].type === 'video'

      const containerResponse = await axios.post(
        `https://graph.facebook.com/v19.0/${igUserId}/media`,
        {
          image_url: !isVideo ? mediaUrl : undefined,
          video_url: isVideo ? mediaUrl : undefined,
          caption: post.content,
          media_type: isVideo ? 'REELS' : 'IMAGE',
          access_token: accessToken
        }
      )

      const containerId = containerResponse.data.id

      // 2. Wait for Processing (if video/Reel)
      if (isVideo) {
        let status = 'IN_PROGRESS'
        let attempts = 0
        const maxAttempts = 10

        while (status === 'IN_PROGRESS' && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 5000)) // Wait 5s
          const statusResponse = await axios.get(
            `https://graph.facebook.com/v19.0/${containerId}?fields=status_code&access_token=${accessToken}`
          )
          status = statusResponse.data.status_code
          attempts++
        }

        if (status !== 'FINISHED') {
          throw new Error('Instagram video processing timed out or failed.')
        }
      }

      // 3. Publish Media Container
      const publishResponse = await axios.post(
        `https://graph.facebook.com/v19.0/${igUserId}/media_publish`,
        {
          creation_id: containerId,
          access_token: accessToken
        }
      )

      return {
        platform: 'instagram',
        status: 'published',
        postUrl: `https://www.instagram.com/reels/${publishResponse.data.id}/`, // Placeholder URL pattern
        metadata: publishResponse.data
      }
    } catch (error: any) {
      return {
        platform: 'instagram',
        status: 'failed',
        error: error.response?.data?.error?.message || error.message || 'Instagram publishing failed'
      }
    }
  }
}
