---
phase: 02-accounts
status: pending
wave-count: 2
depends-on: 01-foundation
must-haves:
  - AccountsPage shows all 5 platforms
  - User can mock-connect an account (simulated OAuth popup)
  - Connected accounts persist in AccountsContext
  - User can disconnect an account
  - Connected state reflected in PlatformSelector (Phase 03 prep)
---

# Phase 02 Plan — Account Connection

## Goal

Users can connect and manage their social platform accounts. All OAuth is mocked — real OAuth comes in Phase 06.

---

## Wave 1 — Account Services + Components

### Task 2.1 — accountsService.js (Mock)
```
src/services/accountsService.js:
  getAccounts() → returns mock accounts array (same as context mock)
  connectAccount(platform) → simulates OAuth, returns new mock account after 1.2s delay
  disconnectAccount(accountId) → resolves after 300ms
  refreshToken(accountId) → resolves after 500ms

Mock account shape:
  { id, platform, username, displayName, avatar, accessToken: 'mock_token_xxx',
    tokenExpiry: Date.now() + 3600000, isActive: true, connectedAt }

Avatar: use DiceBear `https://api.dicebear.com/7.x/avataaars/svg?seed={username}`
```

### Task 2.2 — PlatformBadge
```
src/components/accounts/PlatformBadge.jsx:
  - Takes: platformId, size (sm/md/lg)
  - Renders colored circle with platform initial or SVG icon
  - Colors from platformConfig[platform].color
  - Used as overlay on avatars and in selectors
```

### Task 2.3 — AccountCard
```
src/components/accounts/AccountCard.jsx:
  - Connected state: avatar + PlatformBadge overlay, username, display name,
    "Connected" green badge, "Disconnect" danger ghost button
  - Connecting state: spinner, "Connecting..."
  - Disconnected state: platform icon large, platform name, "Connect" primary button
  - Token expired: amber warning badge, "Reconnect" button
  - Subtle hover lift (Framer Motion whileHover)
```

### Task 2.4 — ConnectModal
```
src/components/accounts/ConnectModal.jsx:
  - Triggered when user clicks "Connect" on AccountCard
  - Step 1: "Connecting to {Platform}" — shows platform logo + loading dots (1.2s)
  - Step 2: "Authorize SocialPulse" — mock OAuth screen with "Allow" / "Cancel" buttons
  - Step 3 (on Allow): success animation → account added → modal closes
  - Step 3 (on Cancel): modal closes, no account added
  - In real app: Step 1 opens actual OAuth popup window
```

---

## Wave 2 — AccountsPage

### Task 2.5 — AccountsPage
```
src/pages/AccountsPage.jsx:
  - Page heading: "Connected Accounts"
  - Subheading: "Connect your social media accounts to start posting"
  - Grid: 2 columns desktop, 1 column mobile
  - One AccountCard per platform (5 total)
  - If platform has connected account: show connected state
  - If platform has multiple accounts: show all + "Add another" button
  - Summary bar at top: "3 of 5 platforms connected"
  - Uses useAccounts() hook + accountsService via React Query (useQuery)
```

---

## Verification Checklist

- [ ] AccountsPage shows all 5 platform cards
- [ ] Summary bar count is correct
- [ ] Click "Connect" → ConnectModal opens with platform name
- [ ] Click "Allow" → card transitions to connected state with username
- [ ] AccountsContext updated — new account visible in context
- [ ] Click "Disconnect" → card returns to disconnected state
- [ ] AccountsContext updated — account removed
- [ ] Connecting state shows spinner (can't double-click during connect)
- [ ] Page works on mobile (single column, cards full-width)
