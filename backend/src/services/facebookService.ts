import axios from 'axios'
import { PostData, AccountWithTokens, PublishResult } from '../types/platform.js'

/**
 * Facebook Pages API Service Implementation
 * Supports publishing to Facebook Pages managed by the user
 */
export const facebookService = {
  /**
   * Publish a post with text and optional media to a Facebook Page
   * @param post - Content to publish
   * @param account - Connected account tokens (needs page_id)
   */
  publish: async (post: PostData, account: AccountWithTokens): Promise<PublishResult> => {
    try {
      const pageId = account.platformUserId
      const accessToken = account.accessToken

      // 1. Prepare payload
      const payload: any = {
        message: post.content,
        access_token: accessToken
      }

      // 2. Handle media (Facebook supports link posts or individual photo posts)
      if (post.media && post.media.length > 0) {
        const mediaUrl = post.media[0].url
        const isVideo = post.media[0].type === 'video'

        if (isVideo) {
          // Video upload flow
          const videoResponse = await axios.post(
            `https://graph.facebook.com/v19.0/${pageId}/videos`,
            {
              file_url: mediaUrl,
              description: post.content,
              access_token: accessToken
            }
          )
          return {
            platform: 'facebook',
            status: 'published',
            postUrl: `https://facebook.com/${videoResponse.data.id}/`,
            metadata: videoResponse.data
          }
        } else {
          // Photo upload flow
          payload.url = mediaUrl
          const photoResponse = await axios.post(
            `https://graph.facebook.com/v19.0/${pageId}/photos`,
            payload
          )
          return {
            platform: 'facebook',
            status: 'published',
            postUrl: `https://facebook.com/${photoResponse.data.post_id || photoResponse.data.id}/`,
            metadata: photoResponse.data
          }
        }
      }

      // 3. Simple text post
      const response = await axios.post(
        `https://graph.facebook.com/v19.0/${pageId}/feed`,
        payload
      )

      return {
        platform: 'facebook',
        status: 'published',
        postUrl: `https://facebook.com/${response.data.id}/`,
        metadata: response.data
      }
    } catch (error: any) {
      return {
        platform: 'facebook',
        status: 'failed',
        error: error.response?.data?.error?.message || error.message || 'Facebook publishing failed'
      }
    }
  }
}
