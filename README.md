# SocialPulse 🚀

> **Compose once. Publish everywhere.**  
> A centralized social media management platform built with React + TypeScript. Connect your social accounts, write one post, and auto-publish to all selected platforms simultaneously.

![TypeScript](https://img.shields.io/badge/TypeScript-91.7%25-3178C6?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

- **Multi-Platform Publishing** — Post to Twitter/X, LinkedIn, Instagram, Facebook, TikTok, and Bluesky in one click
- **Live Preview** — See exactly how your post will look on each platform before publishing
- **Smart Character Counter** — Per-platform character limits with real-time warning states
- **Media Upload** — Drag-and-drop images and videos with per-platform validation
- **Post Scheduler** — Schedule posts for any future date and time; background queue fires them automatically
- **Post History** — Published, Scheduled, Drafts, and Failed tabs with filters and bulk actions
- **Calendar View** — Visual timeline of scheduled posts with drag-to-reschedule
- **Analytics Dashboard** — Engagement, reach, and performance metrics per platform
- **Dark / Light Mode** — Full theme support with persistent preference

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 18 + Vite | UI framework + build tool |
| TypeScript | Type safety throughout |
| React Router v6 | Client-side routing |
| TanStack Query v5 | Server state, caching, background refetch |
| Tailwind CSS | Utility-first styling |
| Tiptap | Rich text post editor |
| Framer Motion | Animations and transitions |
| Recharts | Analytics charts |
| FullCalendar | Scheduled posts calendar |
| Sonner | Toast notifications |
| Lucide React | Icon library |

### Backend
| Tech | Purpose |
|---|---|
| Node.js + Express | REST API server |
| Supabase (PostgreSQL) | Database + auth |
| BullMQ + Redis | Scheduled post job queue |
| Cloudflare R2 / S3 | Media storage |
| JWT + Refresh Tokens | Secure authentication |

---

## 📁 Project Structure

```
SocialPulse/
├── frontend/                  # React + TypeScript app
│   ├── src/
│   │   ├── context/           # AuthContext, AccountsContext, PostsContext, UIContext
│   │   ├── hooks/             # usePublisher, useAccounts, useScheduler, etc.
│   │   ├── pages/             # Dashboard, Compose, Posts, Calendar, Analytics, Accounts
│   │   ├── components/
│   │   │   ├── compose/       # ComposeEditor, PlatformSelector, PostPreview, MediaUploader
│   │   │   ├── accounts/      # AccountCard, ConnectModal, PlatformBadge
│   │   │   ├── posts/         # PostCard, PostFilters, BulkActions
│   │   │   ├── analytics/     # EngagementChart, ReachChart, PlatformComparison
│   │   │   ├── layout/        # AppShell, Sidebar, TopBar, MobileNav
│   │   │   └── ui/            # Button, Input, Modal, Badge, Skeleton, EmptyState
│   │   ├── services/          # API layer + platform adapters
│   │   ├── utils/             # platformConfig.js, dateUtils, validators
│   │   └── styles/            # tokens.css, globals.css, animations.css
│   └── package.json
│
├── backend/                   # Node.js API server
│   ├── src/
│   │   ├── routes/            # auth, accounts, posts, analytics, media
│   │   ├── services/          # publisherService, schedulerService, mediaService
│   │   ├── adapters/          # Per-platform publish adapters
│   │   ├── queue/             # BullMQ workers for scheduled posts
│   │   └── middleware/        # auth, validation, error handling
│   └── package.json
│
├── .planning/                 # GSD project planning files
├── GSD-QUICKSTART.md
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Redis (local or [Upstash](https://upstash.com) cloud — free tier)
- [Supabase](https://supabase.com) account (free tier)

### 1. Clone the Repository

```bash
git clone https://github.com/pasanhansaka/SocialPulse.git
cd SocialPulse
```

### 2. Set Up the Backend

```bash
cd backend
npm install
cp .env.example .env
```

Fill in your `.env` file — see the [Environment Variables Guide](#-environment-variables) below.

```bash
npm run dev
# Server starts at http://localhost:3000
```

### 3. Set Up the Frontend

```bash
cd ../frontend
npm install
cp .env.example .env
# Set VITE_API_URL=http://localhost:3000
npm run dev
# App starts at http://localhost:5173
```

---

## 🔑 Environment Variables

Create `backend/.env` from the example:

```env
# Server
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Security
JWT_SECRET=your_random_32_char_secret

# Supabase
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Redis (BullMQ scheduler)
REDIS_URL=redis://localhost:6379

# Twitter / X
TWITTER_CLIENT_ID=your_client_id
TWITTER_CLIENT_SECRET=your_client_secret

# Facebook + Instagram (same Meta app)
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
INSTAGRAM_APP_ID=your_app_id
INSTAGRAM_APP_SECRET=your_app_secret

# LinkedIn
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret

# TikTok
TIKTOK_CLIENT_KEY=your_client_key
TIKTOK_CLIENT_SECRET=your_client_secret

# Bluesky
BLUESKY_HANDLE=yourhandle.bsky.social
BLUESKY_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

> See the full [API Setup Guide](./docs/API_SETUP.md) for step-by-step instructions on getting credentials from each platform's developer portal.

---

## 🌐 Supported Platforms

| Platform | Auth | Char Limit | Media |
|---|---|---|---|
| Twitter / X | OAuth 2.0 | 280 | 4 images / 512MB video |
| LinkedIn | OAuth 2.0 | 3,000 | 9 images / 5GB video |
| Instagram | Meta OAuth | 2,200 | 10 images / 100MB video |
| Facebook | Meta OAuth | 63,206 | 10 images / 4GB video |
| TikTok | OAuth 2.0 | 2,200 | Video only / 4GB |
| Bluesky | App Password | 300 | 4 images |

---

## 📸 Screenshots

> Coming soon — app is actively being built.

---

## 🗺️ Roadmap

- [x] Project architecture and planning
- [x] Design system and component library
- [ ] Multi-account OAuth connection
- [ ] Compose editor with live platform preview
- [ ] Multi-platform parallel publisher
- [ ] Post scheduler with BullMQ queue
- [ ] Post history and calendar view
- [ ] Analytics dashboard
- [ ] Mobile responsive design
- [ ] Dark / light mode
- [ ] Real OAuth integrations (replacing mocks)

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m 'feat: add your feature'`
4. Push: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT © [Pasan Hansaka](https://github.com/pasanhansaka)

---

<p align="center">Built with ❤️ by Pasan Hansaka</p>
