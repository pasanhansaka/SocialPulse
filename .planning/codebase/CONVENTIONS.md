# Codebase Conventions

## File Naming

- Components: `PascalCase.jsx` (e.g., `PostCard.jsx`)
- Hooks: `camelCase.js` with `use` prefix (e.g., `usePublisher.js`)
- Services: `camelCaseService.js` (e.g., `postsService.js`)
- Utils: `camelCaseUtils.js` (e.g., `dateUtils.js`)
- Constants: `SCREAMING_SNAKE_CASE` for values, `camelCase` for the file

## Component Structure

```jsx
// 1. Imports (external → internal → styles)
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAccounts } from '@/hooks/useAccounts'
import { AccountCard } from '@/components/accounts/AccountCard'

// 2. PropTypes or JSDoc (no TypeScript in this project)
/**
 * @param {{ platform: string, onConnect: () => void }} props
 */

// 3. Component (named export, not default for most components)
export function AccountCard({ platform, onConnect }) {
  // a. hooks at top
  // b. derived state
  // c. handlers
  // d. return JSX
}
```

## Import Aliases

All imports use `@/` alias pointing to `src/`:
```js
import { getPlatformConfig } from '@/utils/platformConfig'
import { useAccounts } from '@/hooks/useAccounts'
import { Button } from '@/components/ui/Button'
```

## CSS / Styling Rules

- **Never hardcode hex colors** in component files
- Always use CSS variables: `var(--brand)`, `var(--text-primary)`, `var(--twitter)`
- Tailwind utility classes for layout/spacing
- Custom styles via CSS variables for brand colors and theme values
- No inline `style` objects except for dynamic values (e.g., platform color from config)

```jsx
// ✅ Correct
<div className="rounded-lg border p-4" style={{ borderColor: `var(--${platform})` }}>

// ❌ Wrong
<div style={{ backgroundColor: '#6c63ff', borderRadius: '8px', padding: '16px' }}>
```

## State Management Rules

- **Component state** (`useState`): local, ephemeral UI state (hover, open/closed)
- **Context** (`useContext`): global client state shared across pages
- **React Query** (`useQuery`): server data — lists, details, user profile
- **Ref** (`useRef`): DOM references, values that shouldn't trigger re-render

**Never put server data in Context.** Use React Query for anything that comes from the API.

## Error Handling Pattern

```js
// Services: never throw raw errors to components
export async function publishPost(data) {
  try {
    const result = await api.post('/posts/publish', data)
    return { success: true, data: result.data }
  } catch (error) {
    return { success: false, error: error.response?.data?.message ?? 'Publish failed' }
  }
}

// Components: check success, show toast
const result = await publishPost(data)
if (!result.success) {
  toast.error(result.error)
  return
}
toast.success('Published!')
```

## Commit Convention (Conventional Commits)

```
feat(compose): add hashtag highlighting in editor
fix(publisher): handle token expiry gracefully
style(sidebar): fix active state highlight on mobile
refactor(accounts): extract ConnectModal from AccountsPage
test(platformConfig): add isOverLimit unit tests
chore(deps): upgrade tiptap to 2.4.0
```

## Environment Variables

```bash
# .env.development
VITE_USE_MOCK=true
VITE_API_URL=http://localhost:3001

# .env.production
VITE_USE_MOCK=false
VITE_API_URL=https://api.socialpulse.app
```

## Testing Conventions

- Unit tests: `src/utils/*.test.js`, `src/services/*.test.js`
- Component tests: `src/components/**/*.test.jsx`
- Test file co-located with the file it tests
- Use `describe` + `it` (not `test`)
- Mock service calls with `vi.mock()`

```js
// platformConfig.test.js
describe('isOverLimit', () => {
  it('returns false when under twitter limit', () => {
    expect(isOverLimit('hello', 'twitter')).toBe(false)
  })
  it('returns true when over twitter limit', () => {
    expect(isOverLimit('x'.repeat(281), 'twitter')).toBe(true)
  })
})
```
