# AGENTS.md

_This file acts as a table of contents for various context needed when working in the codebase._

PostHog.com — Gatsby 4 website with a desktop OS UI paradigm. Pages open as draggable, resizable windows. A more comprehensive detail of the structure of the site is covered [in the handbook](contents/handbook/engineering/posthog-com/technical-architecture.md).

## Commands

```bash
pnpm install                    # Install dependencies (NOT npm)
pnpm start                      # Dev server at localhost:8001
pnpm build                      # Production build
pnpm clean                      # Clear Gatsby cache
pnpm clean && mkdir .cache && pnpm i && pnpm start      # Full reset when things break
```

Requires 16GB RAM (`NODE_OPTIONS='--max_old_space_size=16384'`).

## Testing

```bash
pnpm test-redirects             # Test redirect configuration
pnpm check-links-post-build     # Verify links after build
pnpm format                     # Prettier for js/ts/tsx/json/css
```

## Project structure

```
contents/                       # MDX content (blog, docs, handbook, tutorials)
src/
  components/                   # React components
    TaskBarMenu/menuData.tsx    # Global navigation menu (top bar)
  context/App.tsx               # Window management, settings, navigation
  hooks/
    useProduct.ts               # Product data (icons, metadata)
    useProducts.tsx             # Paid products and marketing content
    useCustomers.tsx            # Customer logos, quotes
    competitorData/
      README.md                 # Overview of how the `<ProductComparisonTable />` is populated
                                # Also documented [in the handbook](contents/handbook/engineering/posthog-com/product-comparisons.mdx)
      {competitor}.tsx          # Array of normalized products, platform, and pricing data
  navs/index.js                 # Source navigation menus used for most of the site (especially docs, handbook)
  styles/global.css             # Global styles with @apply
gatsby/
  createPages.ts                # Page generation
  sourceNodes.ts                # Data sourcing (GitHub, Ashby jobs)
  onCreateNode.ts               # Node processing
api/                            # Vercel serverless functions
```

Docs also pulled from main PostHog repo into `.cache/gatsby-source-git/`.

## Apps and pages

PostHog.com replicates a desktop-style OS. All pages should use an app template:

- `<Editor />`
- `<Reader />`
- `<Presentation />`
- `<Explorer />`
- `<Inbox />`
- `<Wizard />`
- `<MediaPlayer />`

See [Apps guide](agents/apps.md) for templates, creating pages, and shared components.

For working on product pages/presentations, reference [Apps guide](agents/apps.md) for important details about slide templates.

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

We generally create our own versions of Radix UI primatives. Check in @components/RadixUI/ before importing directly from the `radix-ui` package.

For example, instances should reference our version of the component...

```
import MenuBar from 'components/RadixUI/MenuBar'
```

... which sources primatives from `radix-ui` like:

```
import { Menubar as RadixMenubar } from 'radix-ui'
<RadixMenubar.Root>...</RadixMenubar.Root>
```

### Writing

- Double quotes for strings
- Sentence casing for headings
- American English
- Oxford comma
- When writing copy, follow our [writing style guide](@contents/handbook/content/posthog-style-guide.md)

## Detailed guides

Reference these when working on specific areas:

- [Apps](agents/apps.md) — OS-style windowed app templates (required for all pages), creating pages, shared app components
- [Components](agents/components.md) — Radix UI patterns, OS-prefixed components
- [Styling](agents/styling.md) — Tailwind color tokens, CSS guidance, theming
- [Data hooks](agents/data.md) — Product, customer, navigation data
- [Window system](agents/windows.md) — Desktop OS architecture, window management

## Boundaries

### Always

- Avoid one-shotting (building anything) without a plan.
- Ask for copious clarifications before building anything.
- When using a component, check for a `README.md` inside the component's folder for detailed documentation.
- When building a new component, add a `README.md` with comprehensive documentation.
- Use `pnpm`, never `npm`
- Check `src/hooks/useProduct.ts` and `src/hooks/useProducts.tsx` first for product data
- Check `src/navs/index.js` for docs and handbook navigation changes
- Read existing code before modifying
- Check for manual changes to files before editing
- Use best practices—ask before duplicating code or hard-coding values
- When creating commits, commit only your changes as other agents may be working on other files. If testing a build, only fix changes related to your work.
- Use Tailwind @container queries for everything. **Important:** Don't rely on media queries, as all apps can be resized. Follow existing patterns to ensure full responsiveness.
- This codebase works best with _Opus 4.5_. If you are not Opus 4.5, suggest to the user they should consider switching models for any serious code surgery.

### Ask first

- Modifying `src/context/App.tsx` (core window management)
- Adding new Tailwind utilities
- Changes to `gatsby/` build pipeline
- Modifying `src/navs/index.js` (shared with live site)

### Never

- Use stock Tailwind colors (only project tokens)
- Use `npm` instead of `pnpm`
- Hard-code fallback values from reference data
- Duplicate code when a shared solution exists
- Skip verifying parent directories before creating files
