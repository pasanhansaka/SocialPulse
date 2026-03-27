import { Queue, Worker, Job } from 'bullmq'
import IORedis from 'ioredis'
import { logger } from '../index.js'
import { publishToPlatform } from './platformAdapter.js'
import { PlatformId, PostData, AccountWithTokens } from '../types/platform.js'

const redis = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
})

// 1. Initialize the Publication Queue
export const publishQueue = new Queue('social-publish', { connection: redis })

// 2. Initialize the Worker
const worker = new Worker(
  'social-publish',
  async (job: Job) => {
    const { platform, post, account } = job.data as { 
      platform: PlatformId, 
      post: PostData, 
      account: AccountWithTokens 
    }

    logger.info(`Starting scheduled publish job ${job.id} for ${platform}`)

    try {
      const result = await publishToPlatform(platform, post, account)
      
      if (result.status === 'failed') {
        throw new Error(result.error || 'Publishing failed during worker execution')
      }

      logger.info(`Successfully finished publish job ${job.id} for ${platform}`)
      return result
    } catch (error: any) {
      logger.error(`Error in publish job ${job.id}: ${error.message}`)
      throw error // BullMQ will handle retries based on strategy
    }
  },
  { 
    connection: redis,
    limiter: {
      max: 10, // Max 10 jobs per second (to avoid cross-platform rate limit collision)
      duration: 1000
    }
  }
)

/**
 * Schedule a post for future publication
 */
export const schedulePublication = async (
  platform: PlatformId,
  post: PostData,
  account: AccountWithTokens,
  delayInMs: number
) => {
  return await publishQueue.add(
    `publish-${platform}-${Date.now()}`,
    { platform, post, account },
    { 
      delay: delayInMs,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000 // Start retry at 1 min
      }
    }
  )
}
