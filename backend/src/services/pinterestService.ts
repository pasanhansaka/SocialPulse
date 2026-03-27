import axios from 'axios'
import { PostData, AccountWithTokens, PublishResult } from '../types/platform.js'

/**
 * Pinterest API v5 Service Implementation
 * Supports Creating Pins with links and images
 */
export const pinterestService = {
  /**
   * Publish a Pin to a Pinterest Board
   * @param post - Content to publish
   * @param account - Connected account tokens (needs board_id)
   */
  publish: async (post: PostData, account: AccountWithTokens): Promise<PublishResult> => {
    try {
      if (!post.media || post.media.length === 0) {
        throw new Error('Pinterest requires an image for a Pin.')
      }

      const boardId = account.platformUserId // Pinterest Board ID
      const accessToken = account.accessToken
      const mediaUrl = post.media[0].url

      // Prepare payload
      const payload = {
        title: post.content.slice(0, 100),
        description: post.content.slice(0, 500),
        board_id: boardId,
        media_source: {
          source_type: 'image_url',
          url: mediaUrl
        },
        link: mediaUrl // Default link to the image or a specific source
      }

      const response = await axios.post(
        'https://api.pinterest.com/v5/pins',
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )

      return {
        platform: 'pinterest',
        status: 'published',
        postUrl: `https://www.pinterest.com/pin/${response.data.id}/`,
        metadata: response.data
      }
    } catch (error: any) {
      return {
        platform: 'pinterest',
        status: 'failed',
        error: error.response?.data?.message || error.message || 'Pinterest publishing failed'
      }
    }
  }
}
