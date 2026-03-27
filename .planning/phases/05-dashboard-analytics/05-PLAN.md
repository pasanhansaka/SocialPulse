---
phase: 05-dashboard-analytics
status: pending
wave-count: 2
depends-on: 04-post-management
must-haves:
  - DashboardPage shows real stat cards
  - AnalyticsPage renders charts without error
  - Date range filter changes chart data
  - All charts responsive on mobile
---

# Phase 05 Plan — Dashboard & Analytics

## Wave 1 — Dashboard

### Task 5.1 — analyticsService.js (Mock)
```
src/services/analyticsService.js:
  getSummary(dateRange) → { totalPosts, totalReach, totalEngagement, avgEngagementRate, platformBreakdown[] }
  getTimeSeries(dateRange, platform?) → [{ date, likes, comments, shares, reach }]
  getPlatformComparison() → [{ platform, posts, reach, engagement }]

Mock: generate realistic random data, vary by dateRange input.
```

### Task 5.2 — StatCard
```
src/components/dashboard/StatCard.jsx:
  - Icon (Lucide), label, value (large), trend indicator (+12% vs last period)
  - Trend: green up arrow if positive, red down arrow if negative
  - Skeleton variant for loading state
  - Subtle gradient background tint per stat type
```

### Task 5.3 — DashboardPage
```
src/pages/DashboardPage.jsx:
  - Greeting: "Good morning, Alex 👋"
  - Stat cards row (4 cards): Posts This Week, Total Reach, Engagements, Avg Rate
  - "Quick Compose" shortcut button → /compose
  - UpcomingPosts widget: next 5 scheduled posts as compact list
  - RecentActivity: last 5 published posts with platform icons and timestamps
  - PlatformHealth: row of platform connection status dots
```

---

## Wave 2 — Analytics Page

### Task 5.4 — EngagementChart
```
src/components/analytics/EngagementChart.jsx:
  - Recharts LineChart
  - Lines: Likes (blue), Comments (green), Shares (orange)
  - Responsive: ResponsiveContainer width="100%" height={300}
  - Custom tooltip with date + metric values
  - Legend below chart
  - Animated on first render (Recharts isAnimationActive)
```

### Task 5.5 — ReachChart
```
src/components/analytics/ReachChart.jsx:
  - Recharts BarChart
  - One bar per platform, colored with platform brand color from platformConfig
  - Shows reach count on Y axis
  - Hover tooltip with exact value
```

### Task 5.6 — AnalyticsPage
```
src/pages/AnalyticsPage.jsx:
  - Date range picker: "Last 7d / 30d / 90d / Custom" tab buttons
  - Platform filter: "All platforms / Twitter / LinkedIn / ..." dropdown
  - Summary stat cards (from analyticsService.getSummary)
  - EngagementChart full width
  - ReachChart + PlatformComparison side by side (stack on mobile)
  - "No data" EmptyState if date range has no posts
```

---

## Verification Checklist

- [ ] DashboardPage loads, stat cards show numbers
- [ ] Upcoming posts widget shows max 5 items
- [ ] AnalyticsPage: all 3 chart types render without error
- [ ] Switching date range (7d/30d/90d) → chart data changes
- [ ] Charts are responsive: no overflow at 375px width
- [ ] Skeleton loaders appear while data loads
- [ ] Platform filter narrows chart to selected platform data
