# Getting started / tech stack

## Commands

```bash
pnpm install                    # Install dependencies (NOT npm)
pnpm start                      # Dev server at localhost:8001
pnpm build                      # Production build (to dist/)
pnpm serve                      # Serve the production build
pnpm clean                      # Clear the build output and the data layer cache
pnpm clean && pnpm i && pnpm start      # Full reset when things break
```

Requires 16GB RAM (`NODE_OPTIONS='--max_old_space_size=16384'`, set by `pnpm build` and `pnpm start`).

## Testing

```bash
pnpm test-redirects             # Test redirect configuration
pnpm check-links-post-build     # Verify links after build
pnpm format                     # Prettier for astro/js/ts/tsx/json/css
pnpm lint                       # ESLint
pnpm typecheck                  # astro check (TypeScript)
```

## GitHub CLI

PR work needs [`gh`](https://cli.github.com/) v2.0+, authenticated (`gh auth status`).

For stacked PRs, add the `gh stack` extension:

```bash
gh extension install github/gh-stack
```

Use it to create and manage [stacked PRs](https://docs.github.com/en/pull-requests/get-started/about-stacked-prs). Note that `gh pr merge` does not work on a stacked PR; use `gh stack merge --yes`. Run every command non-interactively: `gh stack view --json`, `gh stack submit --auto`, and always pass branch names to `init`, `add`, and `checkout`.

`gh` has no command for attaching an image to a PR body, which every visual PR needs. If you have your own skill or tooling for that, use it. Otherwise see the `curl` fallback in [browser screenshots](browser-screenshots.md#putting-the-images-in-the-pr) – no extension required.

## Project structure

```
contents/                       # MDX content (blog, docs, handbook, tutorials)
astro.config.mjs                # Astro config: integrations, aliases
src/
  content.config.ts             # Content collections (one per content type)
  content/schemas.ts            # Typed frontmatter schemas
  pages/                        # Astro routes (getStaticPaths per content type)
  layouts/Site.astro            # Desktop shell: taskbar, desktop, page window
  islands/                      # React islands (Chrome, Desktop, Page)
  views/                        # Page components for fixed URLs (served by pages/[...page].astro)
  templates/                    # Page components for content (blog post, docs, handbook, ...)
  data-layer/                   # Build-time data: sources, cache, typed queries (@data/*)
  integrations/seoOutputs.ts    # .md copies, llms.txt, llms-full.txt, sitemap, Algolia
  lib/mdx/                      # MDX compiler setup
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
api/                            # Vercel serverless functions
```

Docs are also pulled from the [PostHog monorepo](https://github.com/PostHog/posthog) (`docs/published/` and `docs/onboarding/`) into `.cache/posthog-main-repo/` at build time (a sparse git clone, `src/data-layer/posthogRepo.ts`).

### Where docs content lives

Most product documentation lives in this repo under `contents/docs/`. Some content that is tightly coupled to the monorepo codebase lives in the monorepo's `docs/published/` folder instead and gets pulled in automatically. Today that's mostly handbook/engineering pages (coding conventions, database guides, local dev setup) plus a few product docs like surveys SDK feature support.

**This repo (posthog.com):** blog posts, tutorials, handbook (non-engineering), marketing pages, product landing pages, and the majority of product docs.

**Monorepo (`docs/published/`):** engineering handbook pages and product docs that are tightly coupled to the monorepo codebase. URL mapping: `docs/published/docs/foo/bar.md` becomes `/docs/foo/bar` on the site.

When writing new docs, ask: does this content describe something internal to the monorepo codebase? If yes, it likely belongs in the monorepo's `docs/published/` folder, not here.

## Apps and pages

PostHog.com replicates a desktop-style OS. All pages should use an app template:

- `<Editor />`
- `<Reader />`
- `<Presentation />`
- `<Explorer />`
- `<Inbox />`
- `<Wizard />`
- `<MediaPlayer />`

See [Apps guide](apps.md) for templates, creating pages, and shared components.

For working on product pages/presentations, reference [Apps guide](apps.md) for important details about slide templates.

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

We generally create our own versions of Radix UI primitives. Check in @components/RadixUI/ before importing directly from the `radix-ui` package.

For example, instances should reference our version of the component...

```
import MenuBar from 'components/RadixUI/MenuBar'
```

... which sources primitives from `radix-ui` like:

```
import { Menubar as RadixMenubar } from 'radix-ui'
<RadixMenubar.Root>...</RadixMenubar.Root>
```