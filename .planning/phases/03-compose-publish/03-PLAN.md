---
phase: 03-compose-publish
status: pending
wave-count: 4
depends-on: 02-accounts
must-haves:
  - User can write text and see character count update per platform
  - User can toggle platform selection
  - User can attach images
  - "Post Now" fires parallel publish and shows per-platform result
  - Published post appears in history
  - "Schedule" saves post with future timestamp
---

# Phase 03 Plan — Compose & Publish ⚡

## Goal

Build the core value proposition: one compose screen → publish to multiple platforms simultaneously.

---

## Wave 1 — Compose Page Layout + Editor

### Task 3.1 — ComposePage Two-Panel Layout
```
src/pages/ComposePage.jsx:
  - Left panel (60%): editor area
  - Right panel (40%): preview area
  - On mobile: stacked, preview below editor, preview toggled via tab
  - "Compose" page title in TopBar
  - Persistent draft warning if navigating away with unsaved content (useBlocker)
```

### Task 3.2 — ComposeEditor
```
src/components/compose/ComposeEditor.jsx:
  - Tiptap editor with StarterKit + Placeholder extension
  - Placeholder text: "What's on your mind? Use # for hashtags, @ for mentions..."
  - Custom Tiptap extension: highlight #hashtags in blue, @mentions in purple
  - onChange: updates PostsContext draft.content
  - Min height: 160px, auto-grows with content
  - Toolbar: Bold, Italic, Emoji picker (simple popover with emoji grid)
  - Paste from clipboard supported
```

### Task 3.3 — CharacterCounter
```
src/components/compose/CharacterCounter.jsx:
  - Shows count per selected platform: "280 / 280" format
  - 0-89%: muted color (safe)
  - 90-99%: amber warning
  - 100%+: red danger, shows overage (+12)
  - Circular progress ring SVG per platform icon
  - Compact: fits in a single row under the editor
```

---

## Wave 2 — Platform Selector + Media

### Task 3.4 — PlatformSelector
```
src/components/compose/PlatformSelector.jsx:
  - Reads connected accounts from AccountsContext
  - Renders each account as a card: platform icon, username, avatar
  - Click to toggle selected state — updates PostsContext selectedPlatforms[]
  - Selected: platform color border + checkmark badge
  - Unselected: muted border, grayscale avatar
  - If no accounts connected: shows EmptyState with "Connect accounts →" link
  - Disabled state: show tooltip "Token expired, reconnect"
```

### Task 3.5 — MediaUploader
```
src/components/compose/MediaUploader.jsx:
  - Drag-drop zone with dashed border, hover highlight
  - Click to open file picker
  - Paste image from clipboard (paste event listener)
  - Shows thumbnail grid for uploaded files (max 10 shown)
  - Each thumbnail: preview image/video icon, remove (×) button on hover
  - File validation: check against selected platforms' limits
    - If any selected platform has lower limit, warn with tooltip
  - Progress bar per file during upload (mock: simulate 0→100% over 1.5s)
  - Stores uploaded media URLs in PostsContext draft.media[]
```

---

## Wave 3 — Preview + Scheduler

### Task 3.6 — PostPreview
```
src/components/compose/PostPreview.jsx:
  - Tab row for each selected platform
  - Each tab renders platform-specific card:
    TWITTER: white card, avatar left, username + @handle, content, image grid (2×2), engagement icons
    LINKEDIN: white card, avatar + name + "1st", content, single image, Like/Comment/Share bar
    INSTAGRAM: square image top, avatar + username below, caption truncated at 3 lines
    FACEBOOK: avatar + name + timestamp, content, image, Like/Comment/Share
    TIKTOK: dark card, video placeholder, username overlay, caption
  - If content over platform limit: show red truncation line with "Content will be truncated" warning
  - Empty state: "Select a platform to see preview"
```

### Task 3.7 — SchedulePicker
```
src/components/compose/SchedulePicker.jsx:
  - Toggle: "Post Now" | "Schedule for later"
  - Schedule mode: date input + time input (HTML native or custom)
  - Minimum time: now + 5 minutes (validate on submit)
  - Shows relative time preview: "Will post in 2 days, 3 hours"
  - Updates PostsContext draft.scheduledAt
```

### Task 3.8 — HashtagSuggester
```
src/components/compose/HashtagSuggester.jsx:
  - Detects when user types # in editor
  - Shows popover with top 8 trending hashtag suggestions (mock data)
  - Click suggestion: inserts hashtag at cursor
  - Keyboard: arrow keys navigate, Enter inserts, Escape closes
```

---

## Wave 4 — Publisher Service + Publish Button

### Task 3.9 — Publisher Service
```
src/services/publisherService.js:

Adapter interface: each adapter exports { publish(post, accessToken) → { url, platformPostId } }

Mock adapters (return success after 800-1500ms random delay, 10% random failure rate):
  src/services/adapters/twitterAdapter.js
  src/services/adapters/linkedinAdapter.js
  src/services/adapters/instagramAdapter.js
  src/services/adapters/facebookAdapter.js
  src/services/adapters/tiktokAdapter.js

publisherService.publishToAll(post, selectedAccounts):
  1. Transform post for each platform (truncate content, cap media)
  2. Promise.allSettled(selectedAccounts.map(account => adapter.publish(...)))
  3. Return: Array<{ platform, accountId, status: 'published'|'failed', postUrl?, error? }>

publisherService.retryPlatform(post, account):
  Same as above but for single platform.

transformPostForPlatform(post, platformId):
  { text: post.content.slice(0, charLimit), media: post.media.slice(0, maxImages) }
```

### Task 3.10 — usePublisher Hook
```
src/hooks/usePublisher.js:

State managed by useReducer:
  {
    status: 'idle' | 'publishing' | 'done' | 'error',
    platformResults: {
      [accountId]: { status: 'pending'|'publishing'|'published'|'failed', postUrl?, error? }
    }
  }

Actions: PUBLISH_START, PLATFORM_DONE, PUBLISH_COMPLETE, RETRY_PLATFORM, RESET

publish(post, selectedAccounts):
  - dispatch PUBLISH_START (sets all platforms to 'publishing')
  - call publisherService.publishToAll
  - dispatch PLATFORM_DONE per result
  - dispatch PUBLISH_COMPLETE
  - save post to history via postsService.createPost (mock)

retryPlatform(post, account):
  - dispatch RETRY_PLATFORM for that account
  - call publisherService.retryPlatform
  - dispatch PLATFORM_DONE

Returns: { status, platformResults, publish, retryPlatform, reset }
```

### Task 3.11 — Publish Button + Result UI
```
In ComposePage, after Wave 1-3 complete:

PublishBar (bottom of compose panel):
  - "Post Now" button: primary, disabled if no platforms selected or content empty
  - "Save Draft" ghost button
  - SchedulePicker inline

PublishResultPanel (appears after publish):
  Per platform row:
    - Platform icon + username
    - Status: spinner (publishing) → green checkmark + "View post ↗" link (published) → red × + error message + "Retry" button (failed)
  "Done" button: clears draft, navigates to /posts
  "Post Again" button: resets publish state, keeps content
```

---

## Verification Checklist

- [ ] Type in editor → character counter updates for each selected platform
- [ ] Counter turns amber at 90%, red at 100%+
- [ ] Toggle platform: card border changes, counter updates
- [ ] Drag image into uploader → thumbnail appears
- [ ] Remove media item → thumbnail disappears
- [ ] Preview tab updates live as content is typed
- [ ] Schedule mode: past date rejected with validation error
- [ ] Click "Post Now" → all selected platforms show spinner simultaneously
- [ ] After mock delay: some succeed (checkmark), some may fail (red ×)
- [ ] "Retry" on failed platform → re-runs that single platform
- [ ] "View post" link opens (mock URL, new tab)
- [ ] Published post appears in PostsPage → Published tab
- [ ] Schedule → saved post appears in PostsPage → Scheduled tab
- [ ] No crash on any interaction
