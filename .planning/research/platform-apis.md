# Research — Platform APIs & Architecture

## Platform API Summary

### Twitter / X API v2
- **Endpoint:** `POST /2/tweets`
- **Auth:** OAuth 2.0 with PKCE (user context)
- **Scopes needed:** `tweet.write`, `tweet.read`, `users.read`, `offline.access`
- **Rate limits:** 1,500 tweets/15min (per user)
- **Media:** Upload via `POST /2/media/upload` (chunked for video)
- **Thread support:** `reply.in_reply_to_tweet_id` field for threading
- **Sandbox:** Use Free tier with Basic read/write access
- **SDK:** `twitter-api-v2` npm package

### LinkedIn API
- **Endpoint:** `POST /v2/ugcPosts`
- **Auth:** OAuth 2.0, 3-legged
- **Scopes:** `w_member_social`, `r_liteprofile`, `r_emailaddress`
- **Media:** Upload to `assets` endpoint first, get asset URN, reference in post
- **Note:** Company page vs personal profile — different endpoints
- **SDK:** No official Node SDK; use axios directly

### Instagram Graph API (Meta)
- **Endpoint:** `POST /{ig-user-id}/media` then `POST /{ig-user-id}/media_publish`
- **Auth:** Facebook OAuth → Instagram Business account linked
- **Requirements:** Must be Instagram Business or Creator account
- **Two-step:** Create container → publish container
- **Media:** Image/video must be hosted at public URL (upload to S3 first)
- **SDK:** `facebook-nodejs-business-sdk`

### Facebook Graph API
- **Endpoint:** `POST /{page-id}/feed`
- **Auth:** Facebook OAuth → Page access token
- **Requirements:** Facebook Page (not personal profile)
- **Media:** `POST /{page-id}/photos` for images, return story_id, include in post
- **SDK:** Same as Instagram

### TikTok Content Posting API
- **Endpoint:** `POST /v2/post/publish/video/init/`
- **Auth:** OAuth 2.0
- **Scopes:** `video.publish`, `video.upload`
- **Flow:** Init upload → upload chunks → publish
- **Note:** Primarily video; direct post API requires application review
- **SDK:** No official SDK; use axios

---

## Backend Architecture Decisions

### Job Queue (Scheduled Posts)
- **Choice:** BullMQ + Redis
- **Why:** Reliable, Redis-backed, supports delayed jobs, retries, priority queues
- **Pattern:**
  ```
  On schedule: add job to queue with delay = scheduledAt - now
  Worker: picks up job at correct time, calls publisherService
  On failure: BullMQ auto-retries (3 attempts, exponential backoff)
  ```
- **Alternative:** Agenda (MongoDB-backed) if Redis is overkill

### Media Storage
- **Choice:** Cloudflare R2 (S3-compatible, free egress)
- **Upload flow:**
  1. Client requests signed upload URL from backend
  2. Client uploads directly to R2 (never exposes credentials)
  3. R2 returns public CDN URL
  4. Client stores CDN URL in post data
- **Why not direct upload from client:** Security — never expose cloud keys to browser

### Auth Strategy
- **JWT:** Short-lived (15 min), stored in memory (JS variable, not localStorage)
- **Refresh token:** Long-lived (30 days), stored in httpOnly cookie (XSS-safe)
- **Rotation:** Refresh token rotated on each use (prevents replay)
- **OAuth tokens (platform):** Stored encrypted in DB (AES-256-GCM)
  - Key stored in environment variable, never in DB

### Database Schema (PostgreSQL)

```sql
-- Core tables
users (id, email, password_hash, name, avatar, created_at)
social_accounts (id, user_id, platform, username, display_name, avatar_url,
                 access_token_encrypted, refresh_token_encrypted, token_expiry,
                 is_active, connected_at)
posts (id, user_id, content, media_urls[], status, scheduled_at, published_at, created_at)
post_platform_results (id, post_id, account_id, platform, status, platform_post_id,
                       post_url, error_message, attempted_at)
analytics_cache (id, account_id, date, likes, comments, shares, reach, impressions)
```

---

## Frontend Architecture Decisions

### Why Context over Redux
- 4 small contexts with clear boundaries
- No complex cross-slice derived state
- React Query handles all server state (the main Redux use case)
- Simpler mental model for solo developer

### Why TanStack Query
- Handles loading/error states automatically
- Background refetch keeps data fresh
- Optimistic updates for post creation
- Cache invalidation: after publish → invalidate posts list query

### Why Tiptap over contentEditable
- Proper ProseMirror-based editor
- Extension system for hashtag/mention highlighting
- Controlled state via `editor.getHTML()` / `editor.setContent()`
- No need to handle cursor position manually

### Mock-First Strategy
All `src/services/*.js` files export functions that return mock data in development:
```js
// accountsService.js
const IS_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export async function getAccounts() {
  if (IS_MOCK) return mockAccounts
  return api.get('/accounts').then(r => r.data)
}
```
Set `VITE_USE_MOCK=true` in `.env.development`.
Swap to real backend by setting `VITE_USE_MOCK=false` and configuring `VITE_API_URL`.
