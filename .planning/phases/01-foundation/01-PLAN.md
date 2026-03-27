---
phase: 01-foundation
status: pending
wave-count: 3
must-haves:
  - App boots without errors on npm run dev
  - All 8 routes navigate without crash
  - Sidebar collapses and shows bottom nav on mobile
  - All 4 contexts provide mock data
  - UI primitives render correctly
  - Design tokens applied globally
---

# Phase 01 Plan — Foundation + Shell

## Goal

Bootstrap the project so every subsequent phase has a stable, styled, navigable shell to build into.

---

## Wave 1 — Project Config + Design System

**Can run in parallel:** Yes (all independent files)

### Task 1.1 — Vite Project + Dependencies
```
Create vite + react project, install all dependencies from package.json spec.
Configure vite.config.js with @ path alias pointing to src/.
Configure tailwind.config.js with content paths and custom font families.
```
**Verify:** `npm run dev` starts, `npm run build` succeeds.

### Task 1.2 — Platform Constants + Config
```
Create src/constants/platforms.js — export PLATFORM enum object.
Create src/utils/platformConfig.js — full config for all 5 platforms.
Each platform: { id, name, color, bgColor, charLimit, maxImages, maxVideoMB,
  supportsHashtags, supportsMentions, oauthScopes, apiName }
Export: getPlatformConfig(id), getAllPlatforms(), isOverLimit(text, platformId),
  getCharPercent(text, platformId)
```
**Verify:** Import in browser console, `getPlatformConfig('twitter').charLimit === 280`.

### Task 1.3 — Route + Query Key Constants
```
Create src/constants/routes.js — export ROUTES object with all 8 paths.
Create src/constants/queryKeys.js — export QUERY_KEYS for React Query.
```

### Task 1.4 — Design Tokens + Global CSS
```
Create src/styles/tokens.css — all CSS custom properties (colors, radii, shadows).
Create src/styles/globals.css — @tailwind directives, @import tokens.css, body defaults, scrollbar styles.
Create src/styles/animations.css — fade-in, slide-up, skeleton-pulse keyframes.
Import Google Fonts: Syne (600,700,800) + DM Sans (300,400,500) + DM Mono (400,500).
```
**Verify:** Body has dark background, correct font family visible.

---

## Wave 2 — Contexts + UI Primitives

**Can run in parallel:** Contexts and UI components are independent.

### Task 2.1 — AuthContext
```
Create src/context/AuthContext.jsx.
State: { user, token, isAuthenticated, isLoading }
Mock user: { id: '1', name: 'Alex Rivera', email: 'alex@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex' }
Actions: login(email, password) → sets mock user, logout() → clears user
useAuth() hook exported from same file.
```

### Task 2.2 — AccountsContext
```
Create src/context/AccountsContext.jsx.
State: { accounts: [], isLoading }
Mock: 3 connected accounts (twitter, linkedin, instagram) with realistic fake data.
Actions: connectAccount(platform), disconnectAccount(id), toggleAccountActive(id)
useAccounts() hook exported.
```

### Task 2.3 — PostsContext
```
Create src/context/PostsContext.jsx.
State: { draft: { content, media, selectedPlatforms, scheduledAt }, publishState: {} }
Actions: updateDraft(fields), selectPlatform(id), deselectPlatform(id),
  clearDraft(), setPublishState(platform, state)
usePosts() hook exported.
```

### Task 2.4 — UIContext
```
Create src/context/UIContext.jsx.
State: { sidebarOpen, activeModal, modalProps }
Init sidebarOpen from localStorage ('sidebar_open').
Actions: toggleSidebar(), openModal(name, props), closeModal()
useUI() hook exported.
```

### Task 2.5 — UI Primitives
```
Create all components in src/components/ui/:
  Button.jsx — variants: primary, secondary, ghost, danger. sizes: sm, md, lg. loading state.
  Input.jsx — label, error, helper text, prefix/suffix icon slots.
  Badge.jsx — variants: default, success, warning, danger, platform (takes platformId).
  Modal.jsx — portal-based, backdrop click closes, Escape key closes, Framer Motion animation.
  Spinner.jsx — size prop (sm/md/lg), color via CSS var.
  Skeleton.jsx — animated pulse, accepts className for sizing.
  EmptyState.jsx — icon, title, description, optional action button.
  Avatar.jsx — src, fallback initials, size prop, platform badge overlay option.
```
**Verify:** Render each in a test page, confirm styles correct.

---

## Wave 3 — Layout Shell + Routing

### Task 3.1 — Layout Components
```
Create src/components/layout/Sidebar.jsx:
  - Nav links with icons (Lucide): Dashboard, Compose, Posts, Calendar, Analytics, Accounts, Settings
  - Active state from useLocation()
  - Collapsible: icon-only when closed, full labels when open
  - Toggle button using UIContext.toggleSidebar()
  - Bottom: user avatar + name, logout button

Create src/components/layout/TopBar.jsx:
  - "New Post" button (navigates to /compose)
  - Notification bell icon
  - User avatar dropdown (profile, settings, logout)

Create src/components/layout/MobileNav.jsx:
  - Fixed bottom bar, visible only on mobile (md:hidden)
  - 5 primary nav icons: Dashboard, Compose, Posts, Analytics, Accounts

Create src/components/layout/AppShell.jsx:
  - Sidebar + main content area layout
  - Respects sidebarOpen from UIContext
  - Renders MobileNav on mobile
  - Main content has TopBar at top
```

### Task 3.2 — Pages (Placeholder)
```
Create all 8 pages with correct layout but placeholder content:
  LoginPage.jsx — centered card, email/password inputs, submit button
  DashboardPage.jsx — "Dashboard" heading, EmptyState placeholder
  ComposePage.jsx — "Compose" heading, EmptyState placeholder
  CalendarPage.jsx — "Calendar" heading, EmptyState placeholder
  PostsPage.jsx — "Posts" heading, EmptyState placeholder
  AccountsPage.jsx — "Accounts" heading, EmptyState placeholder
  AnalyticsPage.jsx — "Analytics" heading, EmptyState placeholder
  SettingsPage.jsx — "Settings" heading, EmptyState placeholder
```

### Task 3.3 — App Router
```
Create src/App.jsx with React Router v6:
  - / → redirect to /dashboard
  - /login → LoginPage (no AppShell)
  - /dashboard, /compose, /posts, /calendar, /accounts, /analytics, /settings
    → wrapped in AppShell
  - ProtectedRoute component: redirects to /login if !isAuthenticated
  - All page imports via React.lazy() + Suspense with Spinner fallback
Create src/main.jsx with provider nesting:
  QueryClientProvider > AuthProvider > AccountsProvider > PostsProvider > UIProvider > App
```
**Verify:** All 8 routes navigate. Sidebar highlight updates. Mobile nav visible at 375px. Dark theme applied.

---

## Verification Checklist

- [ ] `npm run dev` — no console errors
- [ ] `npm run build` — no TypeScript or bundling errors  
- [ ] `/dashboard` loads without crash
- [ ] All 8 routes accessible via sidebar
- [ ] Sidebar collapses to icon-only on toggle
- [ ] Mobile (375px): sidebar hidden, bottom nav visible
- [ ] Dark background `#0d0d14` visible
- [ ] Syne font applied to headings
- [ ] `getPlatformConfig('twitter').charLimit` returns `280` in browser console
- [ ] All 4 contexts accessible in React DevTools
