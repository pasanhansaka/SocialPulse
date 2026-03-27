---
phase: 06-polish
status: pending
wave-count: 2
depends-on: 05-dashboard-analytics
must-haves:
  - Every async surface has skeleton loader
  - No unhandled React crashes (ErrorBoundary on all pages)
  - All pages lazy-loaded
  - Works on 375px mobile without horizontal scroll
  - Dark/light mode toggle
---

# Phase 06 Plan — Polish & Production Readiness

## Wave 1 — Reliability

### Task 6.1 — Error Boundaries
```
src/components/ui/ErrorBoundary.jsx:
  - Class component (required for componentDidCatch)
  - Props: children, fallback (optional custom fallback)
  - Default fallback: centered card with error icon, "Something went wrong",
    "Try refreshing the page" button (calls window.location.reload)
  - Logs error to console.error (swap for Sentry in production)

Wrap every page in App.jsx:
  <ErrorBoundary key={location.pathname}>
    <Suspense fallback={<PageSkeleton />}>
      <LazyPage />
    </Suspense>
  </ErrorBoundary>
```

### Task 6.2 — Skeleton Loaders Audit
```
Add Skeleton loaders to EVERY loading state:
  - DashboardPage: StatCard skeleton ×4, UpcomingPosts skeleton list
  - PostsPage: PostCard skeleton ×5
  - AccountsPage: AccountCard skeleton ×5
  - AnalyticsPage: Chart area skeleton (rect placeholder)
  - All skeletons use Skeleton.jsx with animated pulse
  - Remove any loading spinners that replace entire page content
```

### Task 6.3 — Lazy Loading Audit
```
Ensure ALL page imports in App.jsx use React.lazy():
  const DashboardPage = lazy(() => import('./pages/DashboardPage'))
  [etc. for all 8 pages]
Run: npm run build -- --analyze (vite-bundle-visualizer)
Confirm: each page chunk < 150kb gzipped.
```

---

## Wave 2 — UX Polish

### Task 6.4 — Dark/Light Mode
```
Add to UIContext: theme ('dark'|'light'), toggleTheme()
Persist to localStorage: 'sp_theme'
In AppShell: apply data-theme={theme} to <html> element
In tokens.css: add [data-theme="light"] overrides:
  --bg-base: #f8f8fc
  --bg-surface: #ffffff
  --bg-elevated: #f0f0f8
  --text-primary: #0d0d14
  --text-secondary: #4a4a5e
  --border: #e0e0ec
TopBar: theme toggle button (Moon/Sun icon from Lucide)
```

### Task 6.5 — Keyboard Shortcuts
```
Global keyboard shortcuts (useEffect on document):
  ⌘/Ctrl + K → focus global search (or open command palette)
  ⌘/Ctrl + N → navigate to /compose
  ⌘/Ctrl + Enter → submit compose form (if on /compose)
  Escape → close any open modal

Add KeyboardShortcutsModal accessible via ? key:
  Shows table of all shortcuts.
```

### Task 6.6 — Accessibility Audit
```
Check every icon-only button has aria-label.
Check all form inputs have associated <label>.
Check modal: focus trap, Escape closes, aria-modal, aria-labelledby.
Check color contrast: text on backgrounds must pass WCAG AA (4.5:1).
Check tab order is logical on compose page.
```

### Task 6.7 — Mobile Polish
```
Test at 375px, 390px, 430px (common iPhone sizes):
  - Compose page: editor and preview stacked, no horizontal scroll
  - PostsPage: PostCard doesn't overflow
  - AccountsPage: cards full-width
  - AnalyticsPage: charts don't overflow (ResponsiveContainer handles this)
  - Bottom MobileNav: safe area inset (padding-bottom: env(safe-area-inset-bottom))
  - Modals: full-screen on mobile (max-h: 100dvh)
```

### Task 6.8 — Performance Final Pass
```
- Verify all images have loading="lazy"
- Verify no synchronous localStorage reads blocking render
- Add React.memo to PostCard (renders many times in list)
- Add useMemo to platformConfig lookups in CharacterCounter
- Run Lighthouse in Chrome DevTools — target LCP < 2.5s
```

---

## Verification Checklist

- [ ] Trigger an error: wrap a component to throw — ErrorBoundary catches it
- [ ] Network tab: page chunk JS < 150kb on initial load
- [ ] Every tab/page transition shows skeleton before data
- [ ] Toggle dark/light mode → persists after page refresh
- [ ] ⌘+N navigates to /compose
- [ ] At 375px: no horizontal scroll on any page
- [ ] Chrome Lighthouse: Performance > 75, Accessibility > 90
- [ ] All modals closeable with Escape key
- [ ] Tab through compose page — all inputs reachable, focus rings visible
