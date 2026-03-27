import axios from 'axios'
import { PostData, AccountWithTokens, PublishResult } from '../types/platform.js'

/**
 * Bluesky AT Protocol Service Implementation
 * Supports Creating Posts with text and image embeds
 */
export const blueskyService = {
  /**
   * Publish a post to Bluesky
   * @param post - Content to publish
   * @param account - Connected account tokens (needs platformUserId as DID)
   */
  publish: async (post: PostData, account: AccountWithTokens): Promise<PublishResult> => {
    try {
      const accessToken = account.accessToken
      const did = account.platformUserId // Bluesky Identity DID

      // 1. Prepare base payload
      const payload: any = {
        repo: did,
        collection: 'app.bsky.feed.post',
        record: {
          $type: 'app.bsky.feed.post',
          text: post.content,
          createdAt: new Date().toISOString()
        }
      }

      // 2. Handle media content
      if (post.media && post.media.length > 0) {
        // TODO: In production, user would first upload media to 
        // /xrpc/com.atproto.repo.uploadBlob and get blob ref.
        // For now, we assume media is already processed or handle placeholders.
        if (post.media[0].platform_specific?.blobRef) {
          payload.record.embed = {
            $type: 'app.bsky.embed.images',
            images: [
              {
                image: post.media[0].platform_specific.blobRef,
                alt: post.content.slice(0, 50)
              }
            ]
          }
        }
      }

      // 3. Simple text post
      const response = await axios.post(
        'https://bsky.social/xrpc/com.atproto.repo.createRecord',
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )

      return {
        platform: 'bluesky',
        status: 'published',
        postUrl: `https://bsky.app/profile/${did}/post/${response.data.uri.split('/').pop()}`,
        metadata: response.data
      }
    } catch (error: any) {
      return {
        platform: 'bluesky',
        status: 'failed',
        error: error.response?.data?.message || error.message || 'Bluesky publishing failed'
      }
    }
  }
}
