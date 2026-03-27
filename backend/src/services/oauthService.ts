import axios from 'axios'
import { PlatformId } from '../types/platform.js'

export interface OAuthTokens {
  accessToken: string
  refreshToken?: string
  expiresIn?: number
  platformUserId: string
  username: string
  avatar?: string
}

export const oauthService = {
  /**
   * Exchange an authorization code for platform-specific tokens
   */
  exchangeCode: async (platform: PlatformId, code: string): Promise<OAuthTokens> => {
    switch (platform) {
      case 'twitter':
        return await exchangeTwitterCode(code)
      case 'facebook':
      case 'instagram':
        return await exchangeMetaCode(code)
      case 'linkedin':
        return await exchangeLinkedInCode(code)
      // ... other platforms
      default:
        throw new Error(`OAuth for ${platform} not yet implemented`)
    }
  }
}

async function exchangeTwitterCode(code: string): Promise<OAuthTokens> {
  const response = await axios.post('https://api.twitter.com/2/oauth2/token', {
    code,
    grant_type: 'authorization_code',
    client_id: process.env.TWITTER_CLIENT_ID,
    redirect_uri: process.env.TWITTER_CALLBACK_URL,
    code_verifier: 'challenge' // In production, use a secure PKCE verifier
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`).toString('base64')}`
    }
  })

  // Twitter v2 returns access_token, refresh_token, etc.
  // We need to fetch the user profile separately to get username/avatar
  const userResponse = await axios.get('https://api.twitter.com/2/users/me?user.fields=profile_image_url', {
    headers: { Authorization: `Bearer ${response.data.access_token}` }
  })

  return {
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
    expiresIn: response.data.expires_in,
    platformUserId: userResponse.data.data.id,
    username: userResponse.data.data.username,
    avatar: userResponse.data.data.profile_image_url
  }
}

async function exchangeMetaCode(code: string): Promise<OAuthTokens> {
  const response = await axios.get(`https://graph.facebook.com/v19.0/oauth/access_token`, {
    params: {
      client_id: process.env.FACEBOOK_APP_ID,
      client_secret: process.env.FACEBOOK_APP_SECRET,
      redirect_uri: process.env.FACEBOOK_CALLBACK_URL,
      code
    }
  })

  const userResponse = await axios.get(`https://graph.facebook.com/me?fields=id,name,picture&access_token=${response.data.access_token}`)

  return {
    accessToken: response.data.access_token,
    platformUserId: userResponse.data.id,
    username: userResponse.data.name,
    avatar: userResponse.data.picture?.data?.url
  }
}

async function exchangeLinkedInCode(code: string): Promise<OAuthTokens> {
  const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', {
    grant_type: 'authorization_code',
    code,
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    redirect_uri: process.env.LINKEDIN_CALLBACK_URL
  }, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })

  const userResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
    headers: { Authorization: `Bearer ${response.data.access_token}` }
  })

  return {
    accessToken: response.data.access_token,
    expiresIn: response.data.expires_in,
    platformUserId: userResponse.data.sub,
    username: userResponse.data.name,
    avatar: userResponse.data.picture
  }
}
