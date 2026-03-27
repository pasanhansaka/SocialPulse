---
phase: 01-foundation
status: pending
---

# Phase 01 Context — Foundation + Shell

## What This Phase Is About

Set the entire foundation that all other phases build on. No shortcuts here — every decision made in this phase echoes through the whole project.

## Files To Create (in this order)

1. `src/constants/platforms.js` — platform enum strings
2. `src/utils/platformConfig.js` — the DNA, build first
3. `src/constants/routes.js` — route path constants
4. `src/constants/queryKeys.js` — React Query cache keys
5. `src/styles/tokens.css` — design tokens (colors, spacing, radius)
6. `src/styles/globals.css` — Tailwind directives + reset
7. `src/styles/animations.css` — keyframes
8. `src/context/AuthContext.jsx` — with mock user
9. `src/context/AccountsContext.jsx` — with 3 mock connected accounts
10. `src/context/PostsContext.jsx` — with mock draft and mock posts
11. `src/context/UIContext.jsx` — sidebar, modal state
12. `src/main.jsx` — provider nesting
13. `src/components/ui/Button.jsx`
14. `src/components/ui/Input.jsx`
15. `src/components/ui/Badge.jsx`
16. `src/components/ui/Modal.jsx`
17. `src/components/ui/Spinner.jsx`
18. `src/components/ui/Skeleton.jsx`
19. `src/components/ui/EmptyState.jsx`
20. `src/components/ui/Avatar.jsx`
21. `src/components/layout/Sidebar.jsx`
22. `src/components/layout/TopBar.jsx`
23. `src/components/layout/MobileNav.jsx`
24. `src/components/layout/AppShell.jsx`
25. All 8 page files (placeholder content)
26. `src/App.jsx` — router setup
27. `vite.config.js` — path aliases
28. `tailwind.config.js`

## Key Constraints

- **Never hardcode hex colors in components** — always use CSS variables from tokens.css
- **platformConfig.js must be complete** — all 5 platforms with charLimit, maxImages, maxVideoMB, color, oauthScopes
- **Mock data must be realistic** — fake usernames, avatars (use DiceBear API), real-looking post content
- **Sidebar must collapse** — isOpen state in UIContext, persisted to localStorage

## Mock Data Shape

```js
// AccountsContext mock accounts
[
  { id: '1', platform: 'twitter', username: '@johndoe', avatar: '...', accessToken: 'mock_token', isActive: true },
  { id: '2', platform: 'linkedin', username: 'John Doe', avatar: '...', accessToken: 'mock_token', isActive: true },
  { id: '3', platform: 'instagram', username: '@john.doe', avatar: '...', accessToken: 'mock_token', isActive: true },
]
```

## Design Tokens Required

```css
--bg-base, --bg-surface, --bg-elevated, --border, --border-focus
--text-primary, --text-secondary, --text-muted
--brand, --brand-dim
--success, --warning, --danger, --info
--twitter, --linkedin, --instagram, --facebook, --tiktok
```

## What Done Looks Like

Run `npm run dev` → App loads → Sidebar visible with all nav links → Click any link → Correct placeholder page renders → Sidebar collapses on mobile → Dark background, correct fonts from Google Fonts.
