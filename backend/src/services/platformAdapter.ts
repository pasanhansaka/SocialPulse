import { PlatformId, PostData, PublishResult, AccountWithTokens } from '../types/platform.js'
import { twitterService } from './twitterService.js'
import { instagramService } from './instagramService.js'
import { facebookService } from './facebookService.js'
import { linkedinService } from './linkedinService.js'
import { tiktokService } from './tiktokService.js'
import { youtubeService } from './youtubeService.js'
import { pinterestService } from './pinterestService.js'
import { threadsService } from './threadsService.js'
import { blueskyService } from './blueskyService.js'

export const publishToPlatform = async (
  platform: PlatformId,
  post: PostData,
  account: AccountWithTokens
): Promise<PublishResult> => {
  try {
    switch (platform) {
      case 'twitter':
        return await twitterService.publish(post, account)
      case 'instagram':
        return await instagramService.publish(post, account)
      case 'facebook':
        return await facebookService.publish(post, account)
      case 'linkedin':
        return await linkedinService.publish(post, account)
      case 'tiktok':
        return await tiktokService.publish(post, account)
      case 'youtube':
        return await youtubeService.publish(post, account)
      case 'pinterest':
        return await pinterestService.publish(post, account)
      case 'threads':
        return await threadsService.publish(post, account)
      case 'bluesky':
        return await blueskyService.publish(post, account)
      default:
        throw new Error(`Unsupported platform: ${platform}`)
    }
  } catch (error: any) {
    return { 
      platform, 
      status: 'failed', 
      error: error.message || 'Unknown error during publishing' 
    }
  }
}

/**
 * Main publisher service that handles multi-platform firing
 * Use Promise.allSettled() so ONE platform failure NEVER blocks others
 */
export const publishToAll = async (
  post: PostData, 
  accounts: Record<PlatformId, AccountWithTokens>,
  selectedPlatforms: PlatformId[]
): Promise<PublishResult[]> => {
  const publishPromises = selectedPlatforms.map(platform => {
    const account = accounts[platform]
    if (!account) {
      return Promise.resolve({
        platform,
        status: 'failed',
        error: `No connected account found for ${platform}`
      } as PublishResult)
    }
    return publishToPlatform(platform, post, account)
  })

  const results = await Promise.allSettled(publishPromises)

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value
    } else {
      return {
        platform: selectedPlatforms[index],
        status: 'failed',
        error: result.reason?.message || 'Unexpected promise rejection'
      } as PublishResult
    }
  })
}
