import { Router, Response } from 'express'
import { authenticate, AuthRequest } from '../middleware/auth.js'
import { supabase, logger } from '../index.js'
import { oauthService } from '../services/oauthService.js'
import { PlatformId } from '../types/platform.js'

const router = Router()

/**
 * List all connected social accounts for the user
 */
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { data: accounts, error } = await supabase
      .from('ConnectedAccount')
      .select('id, platform, username, avatar, isActive, tokenExpiry')
      .eq('userId', req.user!.id)

    if (error) throw error
    res.json(accounts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch connected accounts' })
  }
})

/**
 * Handle OAuth Callback from social platforms
 */
router.post('/callback/:platform', authenticate, async (req: AuthRequest, res: Response) => {
  const { platform } = req.params as { platform: PlatformId }
  const { code } = req.body

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' })
  }

  try {
    // 1. Exchange code for tokens & profile
    const oauthData = await oauthService.exchangeCode(platform, code)

    // 2. Save or Update in Database (Using Supabase Upsert)
    const { data: account, error: upsertError } = await supabase
      .from('ConnectedAccount')
      .upsert({
        userId: req.user!.id,
        platform: platform.toUpperCase() as any,
        platformUserId: oauthData.platformUserId,
        accessToken: oauthData.accessToken,
        refreshToken: oauthData.refreshToken,
        tokenExpiry: oauthData.expiresIn ? new Date(Date.now() + oauthData.expiresIn * 1000) : null,
        username: oauthData.username,
        avatar: oauthData.avatar,
        isActive: true
      }, {
        onConflict: 'userId,platform,platformUserId'
      })
      .select('id')
      .single()

    if (upsertError) throw upsertError

    res.json({ success: true, accountId: account.id })
  } catch (error: any) {
    logger.error(`OAuth Callback Error (${platform}):`, error)
    res.status(500).json({ error: `Failed to connect ${platform} account` })
  }
})

/**
 * Disconnect an account
 */
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { error } = await supabase
      .from('ConnectedAccount')
      .delete()
      .eq('id', req.params.id)
      .eq('userId', req.user!.id)

    if (error) throw error
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to disconnect account' })
  }
})

export default router
