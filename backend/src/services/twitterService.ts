import axios from 'axios'
import { PostData, AccountWithTokens, PublishResult } from '../types/platform.js'

/**
 * Twitter / X Service Implementation (v2 API)
 */
export const twitterService = {
  /**
   * Publish a tweet with text and optional media
   * @param post - Content to publish
   * @param account - Connected account tokens
   */
  publish: async (post: PostData, account: AccountWithTokens): Promise<PublishResult> => {
    try {
      // 1. Prepare payload
      const payload: any = {
        text: post.content,
      }

      // 2. Handle media (Twitter v2 requires media_ids)
      if (post.media && post.media.length > 0) {
        // TODO: In a real production app, you would first upload media to 
        // https://upload.twitter.com/1.1/media/upload.json and get media_ids.
        // For now, we assume media_ids are pre-processed or handle placeholders.
        if (post.media[0].platform_specific?.media_ids) {
          payload.media = {
            media_ids: post.media[0].platform_specific.media_ids
          }
        }
      }

      // 3. Make API call
      const response = await axios.post(
        'https://api.twitter.com/2/tweets',
        payload,
        {
          headers: {
            Authorization: `Bearer ${account.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )

      return {
        platform: 'twitter',
        status: 'published',
        postUrl: `https://twitter.com/i/web/status/${response.data.data.id}`,
        metadata: response.data
      }
    } catch (error: any) {
      // Handle rate limits and platform specific errors
      if (error.response?.status === 429) {
        return {
          platform: 'twitter',
          status: 'failed',
          error: 'Rate limit exceeded. Please try again later.',
          retryAt: Date.now() + (15 * 60 * 1000) // 15 min typical
        }
      }

      return {
        platform: 'twitter',
        status: 'failed',
        error: error.response?.data?.detail || error.message || 'Twitter publishing failed'
      }
    }
  }
}
