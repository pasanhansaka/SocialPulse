import axios from 'axios'
import { PostData, AccountWithTokens, PublishResult } from '../types/platform.js'

/**
 * Threads API Service Implementation
 * Supports text and image/video publishing
 */
export const threadsService = {
  /**
   * Publish a thread (post) with text and optional media
   * @param post - Content to publish
   * @param account - Connected account tokens
   */
  publish: async (post: PostData, account: AccountWithTokens): Promise<PublishResult> => {
    try {
      const accessToken = account.accessToken

      // 1. Prepare base payload
      const payload: any = {
        text: post.content,
        access_token: accessToken
      }

      // 2. Handle media content
      if (post.media && post.media.length > 0) {
        const mediaUrl = post.media[0].url
        const isVideo = post.media[0].type === 'video'

        if (isVideo) {
          payload.media_type = 'VIDEO'
          payload.video_url = mediaUrl
        } else {
          payload.media_type = 'IMAGE'
          payload.image_url = mediaUrl
        }
      }

      // 3. Simple text post (standard Threads flow)
      const response = await axios.post(
        'https://graph.threads.net/v1.0/me/threads',
        payload
      )

      return {
        platform: 'threads',
        status: 'published',
        postUrl: `https://www.threads.net/t/${response.data.id}/`,
        metadata: response.data
      }
    } catch (error: any) {
      return {
        platform: 'threads',
        status: 'failed',
        error: error.response?.data?.error?.message || error.message || 'Threads publishing failed'
      }
    }
  }
}
