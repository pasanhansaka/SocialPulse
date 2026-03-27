---
phase: 01-foundation
status: pending
---

# Phase 01 Verification

## Manual Checks

### Routing
- [ ] Navigate to every route via sidebar — no crashes
- [ ] Direct URL entry (e.g., /compose) works
- [ ] Unauthenticated user on /dashboard → redirected to /login

### Layout
- [ ] Sidebar shows all 7 nav items with icons
- [ ] Active route highlighted in sidebar
- [ ] Sidebar toggle button collapses to icon-only mode
- [ ] sidebarOpen state persists across page refreshes (localStorage)
- [ ] TopBar "New Post" button navigates to /compose

### Mobile (resize to 375px)
- [ ] Sidebar is hidden
- [ ] Bottom MobileNav bar is visible with 5 icons
- [ ] No horizontal scroll overflow
- [ ] Font sizes readable

### Design System
- [ ] Background is dark (`#0d0d14` or near)
- [ ] Syne font visible on any heading
- [ ] DM Sans visible on body text
- [ ] Button variants all render: primary (filled), secondary (border), ghost (text only)
- [ ] Badge variants: green success, amber warning, red danger

### Context
- [ ] Open React DevTools → confirm AuthContext, AccountsContext, PostsContext, UIContext all present
- [ ] AccountsContext mock has 3 accounts
- [ ] PostsContext mock draft is empty object

### Platform Config
- [ ] Open browser console: `window.__platformConfig = getPlatformConfig` (add temp debug)
- [ ] twitter charLimit = 280 ✓
- [ ] linkedin charLimit = 3000 ✓
- [ ] All 5 platforms have color, bgColor, oauthScopes defined

## Automated Tests

```bash
npm run test
```

Expected: All unit tests pass (Button renders, Badge variants render, platformConfig returns correct values).

## Build Check

```bash
npm run build
```

Expected: No errors. Bundle generated in dist/. Check dist/index.html exists.
