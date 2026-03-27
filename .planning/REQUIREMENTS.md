---
project: SocialPulse
version: 1.0
status: approved
---

# Requirements

## Functional Requirements

### REQ-AUTH-01: User Authentication
- User can register with email + password
- User can log in and receive a JWT token
- JWT is stored in memory (not localStorage for security); refresh token in httpOnly cookie
- Protected routes redirect unauthenticated users to /login
- User can log out, clearing all tokens

### REQ-ACCOUNTS-01: Connect Social Accounts
- User can initiate OAuth flow for: Twitter/X, LinkedIn, Instagram, Facebook, TikTok
- OAuth opens in a popup window; parent page listens for completion message
- On success, connected account appears in accounts list with username + avatar
- User can disconnect any account at any time
- Each account stores: platform, username, avatar URL, access token (encrypted at rest), token expiry
- Multiple accounts per platform are supported (e.g., 2 Twitter accounts)

### REQ-COMPOSE-01: Post Composition
- Editor supports plain text with hashtag (#) and mention (@) highlighting
- Editor shows character count per active platform with color states: safe (green) / warning (amber, 90%) / over (red)
- User can attach up to 10 images or 1 video per post
- Media is validated per platform: file type, size, count limits
- User can remove individual media items
- Editor preserves draft state in PostsContext while navigating away

### REQ-COMPOSE-02: Platform Selection
- Platform selector shows all connected accounts as toggleable cards
- Each card displays platform icon, account username, avatar
- At least 1 platform must be selected to enable Publish/Schedule button
- Selected platforms highlighted with platform brand color accent

### REQ-COMPOSE-03: Post Preview
- Live preview panel updates as user types
- Preview rendered in each selected platform's visual style (Twitter card, LinkedIn card, etc.)
- Preview shows how post will appear: avatar, username, content, media thumbnails
- If content exceeds platform limit, preview shows truncation indicator

### REQ-PUBLISH-01: Immediate Publish
- "Post Now" triggers parallel publish to all selected platforms
- Each platform publish is independent — one failure doesn't block others (Promise.allSettled)
- UI shows per-platform loading spinner → success checkmark / error state
- On success: post saved to history with status "published", platform result URLs stored
- On partial failure: success platforms shown, failed platforms show retry button
- Full failure: all platforms show error, user can edit and retry

### REQ-PUBLISH-02: Scheduled Publish
- "Schedule" mode shows date/time picker (min: 5 minutes from now)
- Scheduled post saved to DB with status "scheduled"
- Backend job queue (BullMQ) checks every minute and fires due posts
- Scheduled posts appear in Calendar view and Scheduled tab
- User can edit or cancel a scheduled post before it fires

### REQ-POSTS-01: Post History
- Posts page has 4 tabs: Published / Scheduled / Drafts / Failed
- Each PostCard shows: content preview (truncated), platform icons with status, timestamp, engagement metrics (if published)
- Filter by platform, date range, keyword search
- Bulk select: delete, reschedule selected drafts
- Infinite scroll or pagination (20 posts per page)

### REQ-CALENDAR-01: Calendar View
- Month and week view (FullCalendar)
- Each scheduled post appears as an event on its scheduled date/time
- Click event → opens post detail/edit modal
- Drag event to reschedule (updates scheduledAt in DB)

### REQ-ANALYTICS-01: Analytics
- Date range picker (last 7d, 30d, 90d, custom)
- Per-platform: total posts, total reach, total engagement, avg engagement rate
- Line chart: engagement over time
- Bar chart: reach per platform
- Data fetched from backend analytics endpoint (aggregated from platform APIs)

### REQ-SETTINGS-01: Settings
- Update display name, email, password
- Notification preferences (email on publish failure)
- Danger zone: delete account

## Non-Functional Requirements

### NFR-PERF-01: Performance
- Initial page load (LCP) < 2.5s on 4G connection
- All pages lazy-loaded via React.lazy + Suspense
- Images served with next-gen formats (WebP) and lazy loading

### NFR-RESP-01: Responsive Design
- Fully functional at 375px (mobile), 768px (tablet), 1440px (desktop)
- Mobile: bottom navigation bar replaces sidebar
- Compose editor goes full-screen on mobile

### NFR-A11Y-01: Accessibility
- All interactive elements have visible focus-visible rings
- Color is never the only indicator of state (icons + text accompany color)
- ARIA labels on icon-only buttons
- Keyboard navigable (Tab, Enter, Space, Escape for modals)

### NFR-ERROR-01: Error Handling
- Every async surface has loading skeleton
- Every page wrapped in ErrorBoundary
- Network errors show inline error with retry option, never crash the page
- Toast notifications for async operation results

### NFR-SEC-01: Security
- OAuth tokens stored encrypted at rest in DB
- API calls use short-lived JWT (15min) + refresh token rotation
- Media uploads go through signed URL flow (never expose cloud credentials to client)
- All API inputs validated server-side with Zod

## Platform-Specific Constraints

| Platform | Char Limit | Max Images | Video Max | Notes |
|---|---|---|---|---|
| Twitter/X | 280 | 4 | 512MB | Thread support for long posts (v2) |
| LinkedIn | 3,000 | 9 | 5GB | Company page vs personal profile |
| Instagram | 2,200 | 10 | 100MB | Business account required for API |
| Facebook | 63,206 | 10 | 4GB | Pages API only; personal restricted |
| TikTok | 2,200 | 1 (video) | 4GB | Primarily video format |
