---
project: SocialPulse
type: web-application
status: active
created: 2026-03-26
milestone: 1
---

# SocialPulse — Project Context

## Vision

A centralized social media management platform. Users connect their social accounts once, then compose a single post and auto-publish it to all selected platforms simultaneously. The goal is to eliminate the friction of logging into each platform separately.

**The one-liner:** Buffer/Hootsuite — but yours, built from scratch with React.

## Problem Being Solved

Content creators, marketers, and small businesses waste hours manually copy-pasting posts across Twitter, LinkedIn, Instagram, Facebook, and TikTok. They need one place to: write once, preview per platform, schedule or publish immediately, and track results.

## Who Uses This

- Solo content creators managing personal brand across platforms
- Small business owners running their own social media
- Freelance social media managers handling multiple clients

## Core Features (Must-Have)

1. **Multi-account OAuth** — connect Twitter/X, LinkedIn, Instagram, Facebook, TikTok
2. **Compose Editor** — rich text with hashtags, mentions, emoji support
3. **Platform Selector** — toggle which connected platforms receive the post
4. **Auto-Publish** — fire to all selected platforms simultaneously, parallel, non-blocking
5. **Scheduler** — pick date/time; background queue fires at the right moment
6. **Media Upload** — drag-drop images/video with per-platform validation
7. **Post History** — published / scheduled / drafts / failed tabs
8. **Calendar View** — visual timeline of scheduled posts
9. **Analytics** — engagement, reach, likes per platform

## Out of Scope (v1)

- Team collaboration / multi-user workspace
- AI-generated captions
- Story/Reel/Short-form video specific features
- Client reporting exports
- Bulk import from CSV

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 18 + Vite | Fast HMR, modern tooling |
| Routing | React Router v6 | Nested routes, data loaders |
| Global State | Context API + useReducer | Right-sized for this app |
| Server State | TanStack Query v5 | Caching, background refetch |
| Styling | Tailwind CSS + CSS variables | Utility + custom design tokens |
| Forms | React Hook Form + Zod | Performant + runtime validation |
| HTTP | Axios | Interceptors for auth |
| Editor | Tiptap | Headless rich text |
| Charts | Recharts | Composable SVG charts |
| Calendar | FullCalendar | Drag-to-reschedule support |
| Dates | date-fns | Tree-shakeable, immutable |
| Icons | Lucide React | Clean, consistent |
| Toasts | Sonner | Zero-config beautiful toasts |
| Animation | Framer Motion | Layout transitions, gestures |
| Testing | Vitest + Testing Library | Vite-native test runner |

## Design Direction

**Dark-first, editorial, high-contrast.** Near-black canvas. Platform brand colors used as small accents only, never full backgrounds. Think "command center" not "social media toy."

- Font display: Syne (geometric, bold 800)
- Font body: DM Sans (clean, readable)
- Font mono: DM Mono (for counters/data)
- Base background: `#0d0d14`
- Brand accent: `#6c63ff`

## Architecture Decisions

- **4 React Contexts**: Auth, Accounts, Posts, UI — kept lean; server state in React Query
- **Adapter pattern** for publisher: each platform has its own adapter in `services/publisherService.js`
- **`Promise.allSettled`** for parallel publish — one platform failure never blocks others
- **Mock-first development**: all services return mock data in early sprints; real APIs swapped in Sprint 6
- **`src/utils/platformConfig.js`** is built first — every other file imports from it

## Repository Structure

```
socialpulse/
├── src/
│   ├── context/          # AuthContext, AccountsContext, PostsContext, UIContext
│   ├── hooks/            # useAuth, useAccounts, usePosts, usePublisher, useScheduler
│   ├── pages/            # LoginPage, DashboardPage, ComposePage, CalendarPage, PostsPage, AccountsPage, AnalyticsPage, SettingsPage
│   ├── components/
│   │   ├── layout/       # AppShell, Sidebar, TopBar, MobileNav
│   │   ├── compose/      # ComposeEditor, PlatformSelector, MediaUploader, PostPreview, CharacterCounter, SchedulePicker
│   │   ├── accounts/     # AccountCard, ConnectModal, PlatformBadge
│   │   ├── posts/        # PostCard, PostStatusBadge, PostFilters, BulkActions
│   │   ├── dashboard/    # StatCard, RecentActivity, UpcomingPosts
│   │   ├── analytics/    # EngagementChart, ReachChart, PlatformComparison
│   │   └── ui/           # Button, Input, Modal, Dropdown, Avatar, Badge, Tooltip, Spinner, Skeleton, EmptyState
│   ├── services/         # api.js, authService, accountsService, postsService, publisherService, analyticsService, mediaService
│   ├── utils/            # platformConfig.js, dateUtils, mediaUtils, validators
│   ├── constants/        # platforms.js, routes.js, queryKeys.js
│   └── styles/           # globals.css, tokens.css, animations.css
└── .planning/            # GSD project state
```

## Success Criteria

- User can connect at least 2 platform accounts
- User can write a post, select 2+ platforms, and publish — seeing per-platform success/failure
- Post appears in history with correct status
- Scheduler fires a post at the correct time
- App renders correctly on mobile (375px) and desktop (1440px)
- No full-page crashes; all errors are caught and displayed gracefully
