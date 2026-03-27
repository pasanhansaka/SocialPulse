---
project: SocialPulse
milestone: 1
milestone-name: MVP
milestone-status: active
total-phases: 6
completed-phases: 0
---

# Roadmap

## Milestone 1 — MVP (Current)

**Goal:** A working app where a user can connect accounts, compose a post, publish to multiple platforms, and view history.

**Done when:**
- User can connect 2+ social accounts via OAuth
- User can compose + publish a post to 2+ platforms simultaneously
- Per-platform success/failure shown in real-time
- Posts visible in history with correct status
- Scheduled posts fire at correct time
- App works on mobile and desktop

---

### Phase 01 — Foundation + Shell
**Status:** pending
**Estimate:** ~2 days
**Goal:** App boots, routing works, layout shell renders, design tokens are set.

**Must be TRUE when done:**
- `npm run dev` starts without errors
- All 8 routes navigate without crashing
- Sidebar collapses on mobile, shows bottom nav
- Design tokens defined in tokens.css and applied to AppShell
- All 4 contexts provide mock data to any component that asks
- UI primitives (Button, Input, Badge, Modal, Spinner) render correctly

---

### Phase 02 — Account Connection
**Status:** pending
**Estimate:** ~1.5 days
**Goal:** Users can connect and disconnect social platform accounts.

**Must be TRUE when done:**
- AccountsPage shows all 5 platforms with connect/disconnect buttons
- ConnectModal opens on "Connect", simulates OAuth popup (mock flow for now)
- Connected accounts show username + avatar fetched from mock data
- AccountsContext stores accounts and survives page navigation
- Disconnecting an account removes it from context and UI immediately

---

### Phase 03 — Compose & Publish ⚡ CORE
**Status:** pending
**Estimate:** ~3.5 days
**Goal:** The primary feature: write once, publish everywhere.

**Must be TRUE when done:**
- ComposeEditor allows text input with hashtag/mention highlighting
- PlatformSelector shows connected accounts as toggleable cards
- CharacterCounter updates live per selected platform with correct limits
- MediaUploader accepts drag-drop images, shows preview grid, allows remove
- PostPreview renders a styled preview for each selected platform
- SchedulePicker toggles between "Post Now" and "Schedule" with date/time input
- "Post Now" calls publisherService, runs parallel publish, shows per-platform result
- Failed platforms show retry button; successful ones show "View post" link
- Post saved to history on publish

---

### Phase 04 — Post Management
**Status:** pending
**Estimate:** ~1.5 days
**Goal:** Users can see and manage all their posts.

**Must be TRUE when done:**
- PostsPage has 4 working tabs: Published / Scheduled / Drafts / Failed
- PostCard shows content, platform icons, status badge, timestamp
- Filter by platform dropdown and keyword search both work
- CalendarPage shows scheduled posts on correct dates
- Dragging a calendar event reschedules the post

---

### Phase 05 — Dashboard & Analytics
**Status:** pending
**Estimate:** ~2 days
**Goal:** Users can see performance metrics at a glance.

**Must be TRUE when done:**
- DashboardPage shows stat cards (posts this week, total reach, engagement)
- UpcomingPosts widget shows next 5 scheduled posts
- AnalyticsPage shows engagement line chart and per-platform bar chart
- Date range picker filters analytics data
- Charts render without errors on all viewport sizes

---

### Phase 06 — Polish & Production Readiness
**Status:** pending
**Estimate:** ~1.5 days
**Goal:** Feels like a real product, not a prototype.

**Must be TRUE when done:**
- Every data-fetching surface shows skeleton loader while loading
- Every page has an ErrorBoundary — no unhandled crashes
- All pages lazy-loaded (check bundle analyzer)
- Mobile 375px: compose editor full-screen, bottom nav works, no overflow
- Dark/light mode toggle persists to localStorage
- All icon-only buttons have aria-label
- Keyboard: Tab, Enter, Escape work throughout

---

## Milestone 2 — Growth Features (Future)

- Real OAuth integrations (replace all mocks)
- Team workspace / multi-user
- AI caption suggestions
- Client reporting PDF export
- Browser extension for quick post
- Mobile app (React Native)
