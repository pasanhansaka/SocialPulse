---
phase: 04-post-management
status: pending
wave-count: 2
depends-on: 03-compose-publish
must-haves:
  - PostsPage has 4 working tabs with correct data
  - PostCard shows content, platform badges, status
  - Filter and search work
  - CalendarPage shows scheduled posts on correct dates
---

# Phase 04 Plan — Post Management

## Wave 1 — Posts Page

### Task 4.1 — postsService.js (Mock)
```
src/services/postsService.js:
  getPosts(filters) → returns mock posts array (20 items, mixed statuses)
  getPost(id) → single post
  createPost(data) → creates, returns with id
  updatePost(id, data) → updates scheduledAt, content, etc.
  deletePost(id) → soft delete
  retryPost(id, platforms[]) → re-fires failed platforms

Mock post shape:
  { id, content, media[], platforms[], status: 'published'|'scheduled'|'draft'|'failed',
    scheduledAt, publishedAt, platformResults[], createdAt, engagement: { likes, comments, shares } }
```

### Task 4.2 — PostStatusBadge
```
src/components/posts/PostStatusBadge.jsx:
  - published → green badge "Published"
  - scheduled → blue badge "Scheduled · Jan 15, 3:00 PM"
  - draft → gray badge "Draft"
  - failed → red badge "Failed" with warning icon
  - partial → amber badge "Partial — 2/3 platforms"
```

### Task 4.3 — PostCard
```
src/components/posts/PostCard.jsx:
  - Content preview (2 lines truncated, "See more" expand)
  - Media thumbnails row (max 3 shown + "+N more")
  - Platform icon row with per-platform status dot
  - PostStatusBadge
  - Timestamp (relative: "2 hours ago", hover shows absolute)
  - Engagement metrics if published: ♥ 24 · 💬 3 · ↗ 8
  - Actions menu (⋮): Edit draft, Reschedule, Delete, Duplicate
  - Checkbox for bulk select (appears on hover)
```

### Task 4.4 — PostFilters
```
src/components/posts/PostFilters.jsx:
  - Platform multi-select dropdown (checkboxes per platform)
  - Date range: "Last 7 days / 30 days / 90 days / Custom"
  - Keyword search input (debounced 300ms)
  - "Clear filters" button (shows only when filters active)
  - Active filter count badge
```

### Task 4.5 — BulkActions
```
src/components/posts/BulkActions.jsx:
  - Appears when 1+ posts selected
  - "X posts selected" count
  - Buttons: Delete (danger), Reschedule, Export
  - Select all / deselect all
```

### Task 4.6 — PostsPage
```
src/pages/PostsPage.jsx:
  - Tab bar: Published (N) / Scheduled (N) / Drafts (N) / Failed (N)
  - Counts in tabs from React Query data
  - PostFilters component above post list
  - PostCard list with BulkActions bar
  - Infinite scroll (load more on scroll to bottom) OR pagination
  - EmptyState per tab: "No published posts yet" / "Nothing scheduled" etc.
```

---

## Wave 2 — Calendar Page

### Task 4.7 — CalendarPage
```
src/pages/CalendarPage.jsx:
  - FullCalendar with dayGridMonth + timeGridWeek plugins
  - Toolbar: title, prev/next, today, month/week toggle
  - Each scheduled post as calendar event:
    { title: post.content.slice(0, 40), start: post.scheduledAt, color: primaryPlatformColor }
  - Click event → opens PostDetailModal
  - Drag event to new date/time → calls postsService.updatePost({ scheduledAt: newDate })
  - Optimistic update: update UI immediately, revert on error

PostDetailModal:
  - Shows full post content, platform list, current status
  - "Edit" button → navigates to ComposePage with draft pre-filled
  - "Cancel post" danger button
  - "Post now" button (if scheduled)
```

---

## Verification Checklist

- [ ] PostsPage loads with Published tab active
- [ ] Tab switching shows correct posts per status
- [ ] Badge counts in tabs are accurate
- [ ] Filter by platform → only that platform's posts shown
- [ ] Keyword search → filters content in real-time (debounced)
- [ ] Select 2 posts → BulkActions bar appears
- [ ] Delete bulk → posts removed, counts update
- [ ] CalendarPage: scheduled posts appear on correct dates
- [ ] Click calendar event → PostDetailModal opens with correct data
- [ ] Drag event → scheduledAt updates in postsService
