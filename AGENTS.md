# AGENTS.md

PostHog.com — Gatsby 4 website with a desktop OS UI paradigm. Pages open as draggable, resizable windows.

## Agent rules

- Avoid one-shotting (building anything) without a plan.
- Ask for copious clarifications before building anything.
- When using a component, check for a `README.md` inside the component's folder for detailed documentation.
- When building a new component, add a `README.md` with comprehensive documentation.

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
  context/App.tsx               # Window management, settings, navigation
  hooks/
    useProduct.ts               # Product data (icons, metadata)
    useProducts.tsx             # Paid products and marketing content
    useCustomers.tsx            # Customer logos, quotes
    competitorData/
      README.md                 # Overview of how the `<ProductComparisonTable />` is populated
      {competitor}.tsx          # Array of normalized products, platform, and pricing data
  navs/index.js                 # All navigation menus
  styles/global.css             # Global styles with @apply
gatsby/
  createPages.ts                # Page generation
  sourceNodes.ts                # Data sourcing (GitHub, Ashby jobs)
  onCreateNode.ts               # Node processing
api/                            # Vercel serverless functions
```

Docs also pulled from main PostHog repo into `.cache/gatsby-source-git/`.

## Apps

PostHog.com replicates a desktop-style OS. All pages should use one of these templates.

| Name 	| Example(s) 	| Source 	| Notes 	|  	|  	|
|---	|---	|---	|---	|---	|---	|
| `<Editor />` 	| `/customers` 	| @src/components/Editor/index.tsx 	| Google Docs-style page editor. Use `<MDXEditor />` inside to render Markdown content. 	|  	|  	|
| `<Reader />` 	| `/docs/getting-started/send-events`<br />`/handbook/why-does-posthog-exist`<br />`/blog/why-os`<br />`/tutorials/cookieless-tracking` 	| @src/components/ReaderView/index.tsx 	| Up to 3 columns (nav, main, on-page nav) - optional 	|  	|  	|
| `<Presentation />` 	| `/llm-analytics` 	| @src/components/Presentation/index.tsx 	| - Sources data from product hooks - Uses slide templates inside presentations 	|  	|  	|
| `<Explorer />` 	| `/products` 	| @src/components/Explorer/index.tsx 	|  	|  	|  	|
| `<Inbox />` 	| `/questions` 	| @src/components/Inbox/index.tsx 	| Outlook-style panes 	|  	|  	|
| `<Wizard />` 	| `/vibe-check` 	| src/pages/vibe-check/index.tsx 	| Slides with navigation and a final screen 	|  	|  	|
| `<MediaPlayer />` 	| `/demo` 	| @src/components/MediaPlayer/index.tsx 	| Quicktime clone, supports YouTube (nocookie), Wistia 	|  	|  	|

When adding an internal link to another page that will open a different app, include `state={{ newWindow: true }}` to the previous window doesn't disappear from view.

When creating a new page...
  - Use the following app templates unless explicitly instructed otherwise:
    - `<Editor />` for basic pages
      - Example: `/discounts`
      - Note: Set an app's default (or min/max) dimensions via @src/context/App.tsx in `appSettings`.
    - `<Reader />` for a collection of pages that need a shared menu
      - Example `/data-stack` which populates `LeftSidebarContent` for navigation with `<TreeMenu />` (@src/components/TreeMenu/index.tsx)
  - Make sure the new page is linked from a relevant menu in `<TaskBarMenu />` (@src/components/TaskBarMenu/index.tsx) via `@src/components/TaskBarMenu/menuData.tsx

### App-less windows

In rare cases should an "app" not use one of the templates above. Here are examples of some exceptions:

- `/talk-to-a-human` (@src/pages/talk-to-a-human.tsx) - acts more like a modal
- `/kbd` page is one example (@src/pages/kbd/index.tsx) - custom form design

### App components

1. `<HeaderBar />` (@src/components/OSChrome/HeaderBar.tsx) is used in `Explorer`, `Inbox`, `Presentation`, `ReaderView`, merch store collections, community profiles, and bookmarks. Custom menu options are passed into it as needed.
1. `<OSTable />` (@src/components/OSTable/index.tsx) accepts arrays of rows and columns
1. `<OSTabs />` (@src/components/OSTabs/index.tsx) is useful for tabbing content.
  Examples: Stacked tabs on homepage (@src/pages/index.tsx), Horizontal tabs on `/about` (@src/pages/about.tsx)
1. `<MDXEditor />` (@src/components/MDXEditor/index.tsx) is used for parsing Markdown/MDX content

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

- [Components](agents/components.md) — Radix UI patterns, OS-prefixed components
- [Styling](agents/styling.md) — Tailwind color tokens, CSS guidance
- [Data hooks](agents/data.md) — Product, customer, navigation data
- [Window system](agents/windows.md) — Desktop OS paradigm, app templates

## Boundaries

### Always

- Use `pnpm`, never `npm`
- Check `src/hooks/useProduct.ts` and `src/hooks/useProducts.tsx` first for product data
- Check `src/navs/index.js` for navigation changes
- Read existing code before modifying
- Check for manual changes to files before editing
- Use best practices—ask before duplicating code or hard-coding values
- When creating commits, commit only your changes as other agents may be working on other files. If testing a build, only fix changes related to your work.
- Use Tailwind @container queries for everything. **Important:** Don't rely on media queries, as all apps can be resized. Follow existing patterns to ensure full responsiveness.

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
