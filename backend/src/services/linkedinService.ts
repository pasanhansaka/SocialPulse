import axios from 'axios'
import { PostData, AccountWithTokens, PublishResult } from '../types/platform.js'

/**
 * LinkedIn Posts API Service Implementation
 * Supports publishing to Personal Profiles and Organization Pages
 */
export const linkedinService = {
  /**
   * Create a post using the LinkedIn Posts API
   * @param post - Content to publish
   * @param account - Connected account tokens (needs platformUserId as URN)
   */
  publish: async (post: PostData, account: AccountWithTokens): Promise<PublishResult> => {
    try {
      const authorUrn = account.platformUserId.startsWith('urn:li:') 
        ? account.platformUserId 
        : `urn:li:person:${account.platformUserId}`
      const accessToken = account.accessToken

      // 1. Prepare base payload
      const payload: any = {
        author: authorUrn,
        commentary: post.content,
        visibility: 'PUBLIC',
        distribution: {
          feedDistribution: 'MAIN_FEED',
          targetEntities: [],
          thirdPartyDistributionChannels: []
        },
        lifecycleState: 'PUBLISHED',
        isReshareDisabledByAuthor: false
      }

      // 2. Handle media content
      if (post.media && post.media.length > 0) {
        // TODO: In production, user would first call 
        // /rest/images?action=initializeUpload and upload binary.
        // For now, we assume media is already processed or handle placeholders.
        if (post.media[0].platform_specific?.assetUrn) {
          payload.content = {
            media: {
              title: post.content.slice(0, 100),
              id: post.media[0].platform_specific.assetUrn
            }
          }
        }
      }

      // 3. Simple text post (if no media or no assets ready)
      const response = await axios.post(
        'https://api.linkedin.com/rest/posts',
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'LinkedIn-Version': '202401',
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0'
          }
        }
      )

      const postId = response.headers['x-restli-id'] || response.data.id

      return {
        platform: 'linkedin',
        status: 'published',
        postUrl: `https://www.linkedin.com/feed/update/${postId}`,
        metadata: response.data
      }
    } catch (error: any) {
      return {
        platform: 'linkedin',
        status: 'failed',
        error: error.response?.data?.message || error.message || 'LinkedIn publishing failed'
      }
    }
  }
}
