# SocialPulse — GSD Quick Start

## What Is This?

This `.planning/` folder is your **GSD project brain**. It contains all the context, plans, and state that Claude Code needs to build SocialPulse systematically — without losing track of the big picture.

---

## 1. Install GSD (one command)

```bash
# Install GSD for Claude Code globally
npx get-shit-done-cc --claude --global
```

Then open Claude Code in your project root.

---

## 2. Initialize The Project

The `.planning/` folder is already set up. Tell Claude Code:

```
/gsd:resume
```

GSD will read STATE.md, understand where you are, and tell you the next step.

---

## 3. Start Phase 01

```bash
/gsd:discuss-phase 01-foundation
```
GSD will review the CONTEXT file, ask any clarifying questions, then:

```bash
/gsd:execute-phase 01-foundation
```

GSD reads the PLAN.md, executes tasks in waves, commits each task, and verifies at the end.

---

## 4. Workflow Per Phase

```
discuss → plan → execute → verify → commit → next phase
```

| Command | What It Does |
|---|---|
| `/gsd:resume` | Resume from wherever you left off |
| `/gsd:discuss-phase 01-foundation` | Clarify scope for a phase |
| `/gsd:plan-phase 01-foundation` | Generate/review execution plan |
| `/gsd:execute-phase 01-foundation` | Run the plan, build the code |
| `/gsd:verify-phase 01-foundation` | Run verification checklist |
| `/gsd:progress` | See overall milestone progress |
| `/gsd:quick "fix the mobile nav overflow"` | Ad-hoc task, no full workflow |

---

## 5. Key Files To Know

| File | Purpose |
|---|---|
| `.planning/PROJECT.md` | Vision, tech stack, architecture decisions |
| `.planning/REQUIREMENTS.md` | Functional + non-functional requirements |
| `.planning/ROADMAP.md` | All 6 phases + done criteria |
| `.planning/STATE.md` | Live state — what's done, what's next, decisions |
| `.planning/phases/XX/XX-PLAN.md` | Execution plan per phase (tasks + waves) |
| `.planning/phases/XX/XX-CONTEXT.md` | Extra context Claude needs for that phase |
| `.planning/phases/XX/XX-VERIFICATION.md` | Checklist to confirm phase is done |
| `.planning/research/platform-apis.md` | Platform API reference + architecture decisions |
| `.planning/codebase/CONVENTIONS.md` | Code style, naming, patterns to follow |

---

## 6. Phase Order

```
01-foundation       (~2 days)   → App shell, design system, contexts
02-accounts         (~1.5 days) → Connect social accounts
03-compose-publish  (~3.5 days) → ⚡ CORE — write once, publish everywhere
04-post-management  (~1.5 days) → Post history, calendar
05-dashboard-analytics (~2 days) → Stats, charts
06-polish           (~1.5 days) → Skeletons, a11y, mobile, dark mode
```

**Total: ~12–14 focused days for a solo developer.**

---

## 7. Critical Rules (Don't Break These)

1. **Build `platformConfig.js` first** — everything imports from it
2. **Never hardcode hex colors** — use CSS variables from tokens.css
3. **Mock-first** — all services use mock data until Phase 06 (set `VITE_USE_MOCK=true`)
4. **`Promise.allSettled` always** — one platform failure must never block others
5. **Update `STATE.md`** at end of every session — "what I did, what's next"

---

## 8. Context Always In Scope

GSD is configured (in config.json) to always inject these files into every agent:
- `.planning/PROJECT.md`
- `.planning/STATE.md`  
- `src/utils/platformConfig.js` (once it exists)

This means every agent always knows the vision, current state, and platform constraints.
