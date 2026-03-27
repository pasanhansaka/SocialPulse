import { Router, Response } from 'express'
import { authenticate, AuthRequest } from '../middleware/auth.js'
import { supabase, logger } from '../index.js'
import { publishToAll } from '../services/platformAdapter.js'
import { schedulePublication } from '../services/queueService.js'
import { PlatformId, PostData, AccountWithTokens } from '../types/platform.js'

const router = Router()

/**
 * Fetch all posts (Published, Scheduled, Drafts)
 */
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { data: posts, error } = await supabase
      .from('Post')
      .select('*')
      .eq('userId', req.user!.id)
      .order('createdAt', { ascending: false })

    if (error) throw error
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' })
  }
})

/**
 * Unified Publish Everywhere Endpoint
 */
router.post('/publish', authenticate, async (req: AuthRequest, res: Response) => {
  const { content, media, platforms } = req.body as { 
    content: string, 
    media: any[], 
    platforms: PlatformId[] 
  }

  if (!content || !platforms || platforms.length === 0) {
    return res.status(400).json({ error: 'Content and at least one platform are required.' })
  }

  try {
    // 1. Fetch relevant connected accounts
    const { data: connectedAccounts, error: accountsError } = await supabase
      .from('ConnectedAccount')
      .select('*')
      .eq('userId', req.user!.id)
      .eq('isActive', true)
      .in('platform', platforms.map(p => p.toUpperCase()))

    if (accountsError) throw accountsError

    const accountsMap: Record<string, AccountWithTokens> = {}
    connectedAccounts?.forEach((acc: any) => {
      accountsMap[acc.platform.toLowerCase()] = {
        accessToken: acc.accessToken,
        refreshToken: acc.refreshToken,
        tokenExpiry: acc.tokenExpiry,
        platformUserId: acc.platformUserId
      }
    })

    const postData: PostData = { content, media }

    // 2. Fire simultaneous publication via adapter
    const results = await publishToAll(postData, accountsMap as any, platforms)

    // 3. Persist the post record in the database
    const { data: post, error: postError } = await supabase
      .from('Post')
      .insert({
        userId: req.user!.id,
        content,
        media: media as any,
        platforms: platforms.map(p => p.toUpperCase() as any),
        status: results.every(r => r.status === 'published') ? 'published' : 'partial',
        platformResults: results as any,
        publishedAt: new Date().toISOString()
      })
      .select()
      .single()

    if (postError) throw postError

    res.json({ post, results })
  } catch (error: any) {
    logger.error('Publication Error:', error)
    res.status(500).json({ error: 'Failed to publish post across platforms' })
  }
})

/**
 * Schedule a post for the future
 */
router.post('/schedule', authenticate, async (req: AuthRequest, res: Response) => {
  const { content, media, platforms, scheduledAt } = req.body as { 
    content: string, 
    media: any[], 
    platforms: PlatformId[],
    scheduledAt: string
  }

  try {
    const postDate = new Date(scheduledAt)
    const delay = postDate.getTime() - Date.now()

    if (delay < 0) {
      return res.status(400).json({ error: 'Scheduled time must be in the future.' })
    }

    // 1. Create the post record in 'scheduled' status
    const { data: post, error: postError } = await supabase
      .from('Post')
      .insert({
        userId: req.user!.id,
        content,
        media: media as any,
        platforms: platforms.map(p => p.toUpperCase() as any),
        status: 'scheduled',
        scheduledAt: postDate.toISOString()
      })
      .select()
      .single()

    if (postError) throw postError

    // 2. Map account tokens for the worker
    const { data: connectedAccounts, error: accountsError } = await supabase
      .from('ConnectedAccount')
      .select('*')
      .eq('userId', req.user!.id)
      .in('platform', platforms.map(p => p.toUpperCase()))

    if (accountsError) throw accountsError

    // 3. Add to job queue for each platform
    for (const platform of platforms) {
      const acc = connectedAccounts?.find((a: any) => a.platform.toLowerCase() === platform)
      if (acc) {
        await schedulePublication(
          platform, 
          { content, media }, 
          { accessToken: acc.accessToken, platformUserId: acc.platformUserId }, 
          delay
        )
      }
    }

    res.json({ success: true, post })
  } catch (error: any) {
    logger.error('Scheduling Error:', error)
    res.status(500).json({ error: 'Failed to schedule post' })
  }
})

export default router
