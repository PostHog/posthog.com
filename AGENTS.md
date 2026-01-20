# AGENTS.md

PostHog.com — Gatsby 4 website with a desktop OS UI paradigm. Pages open as draggable, resizable windows.

## Commands

```bash
pnpm install                    # Install dependencies (NOT npm)
pnpm start                      # Dev server at localhost:8001
pnpm build                      # Production build
pnpm clean                      # Clear Gatsby cache
gatsby clean && pnpm start      # Full reset when things break
```

Requires 16GB RAM (`NODE_OPTIONS='--max_old_space_size=16384'`).

## Testing

```bash
pnpm test-redirects             # Test redirect configuration
pnpm check-links-post-build     # Verify links after build
```

Lint and format before committing:
```bash
pnpm format                     # Prettier for js/ts/tsx/json/css
```

## Project structure

```
contents/                       # MDX content (blog, docs, handbook, tutorials)
src/
  components/                   # 278 React components
  context/App.tsx               # Window management, settings, navigation
  hooks/
    useProduct.ts               # Product data (icons, metadata)
    useCustomers.tsx            # Customer logos, quotes
  navs/index.js                 # All navigation menus
  templates/                    # Page templates (BlogPost, Handbook, etc.)
  styles/global.css             # Global styles with @apply
gatsby/
  createPages.ts                # Page generation
  sourceNodes.ts                # Data sourcing (GitHub, Ashby jobs)
  onCreateNode.ts               # Node processing
api/                            # Vercel serverless functions
```

Docs also pulled from main PostHog repo into `.cache/gatsby-source-git/`.

## Code style

### TypeScript/React

```tsx
// Radix UI: import with prefix, use simple name
import { Tabs as RadixTabs } from "radix-ui"
<Tabs />

// Custom components use OS prefix
<OSButton />
<OSTable />
```

### Tailwind

Use only project color tokens:
```tsx
// ✅ Correct
<div className="bg-primary text-secondary border-input" />

// 🚫 Wrong - no stock Tailwind colors
<div className="bg-blue-500 text-gray-700" />
```

Available tokens: `bg-primary`, `bg-accent`, `text-primary`, `text-secondary`, `text-muted`, `border-primary`, `border-input`

### Writing

- Double quotes for strings
- Sentence casing for headings
- American English
- Oxford comma

## Window system

Open new windows with:
```tsx
navigate("/path", { state: { newWindow: true } })
```

Window settings defined in `src/context/App.tsx` → `appSettings` object.

## Boundaries

### ✅ Always

- Use `pnpm`, never `npm`
- Check `src/hooks/useProduct.ts` first for product data
- Check `src/navs/index.js` for navigation changes
- Read existing code before modifying

### ⚠️ Ask first

- Modifying `src/context/App.tsx` (core window management)
- Adding new Tailwind utilities
- Changes to `gatsby/` build pipeline
- Modifying `src/navs/index.js` (shared with live site)

### 🚫 Never

- Use stock Tailwind colors
- Use `npm` instead of `pnpm`
- Hard-code fallback values from reference data
- Duplicate code when a shared solution exists
- Skip verifying parent directories before creating files
