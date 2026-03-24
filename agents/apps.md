# Apps

Reference this guide when creating pages or working with app templates.

PostHog.com replicates a desktop-style OS. All pages should use one of these templates.

## App templates

| Name | Example(s) | Source | Notes |
|------|------------|--------|-------|
| `<Editor />` | `/customers` | `src/components/Editor/index.tsx` | Google Docs-style page editor. Use `<MDXEditor />` inside to render Markdown content. |
| `<Reader />` | `/docs/getting-started/send-events`, `/handbook/why-does-posthog-exist`, `/blog/why-os`, `/tutorials/cookieless-tracking` | `src/components/ReaderView/index.tsx` | Up to 3 columns (nav, main, on-page nav) - optional |
| `<Presentation />` | `/llm-analytics` | `src/components/Presentation/index.tsx` | Sources data from product hooks. Uses slide templates inside presentations. |
| `<Explorer />` | `/products` | `src/components/Explorer/index.tsx` | Grid/list view for browsing items |
| `<Inbox />` | `/questions` | `src/components/Inbox/index.tsx` | Outlook-style panes |
| `<Wizard />` | `/vibe-check` | `src/pages/vibe-check/index.tsx` | Slides with navigation and a final screen |
| `<MediaPlayer />` | `/demo` | `src/components/MediaPlayer/index.tsx` | QuickTime clone, supports YouTube (nocookie), Wistia |

## Creating new pages

Use these templates unless explicitly instructed otherwise:

**`<Editor />`** for basic pages
- Example: `/discounts`
- Set default (or min/max) dimensions via `src/context/App.tsx` in `appSettings`. Use defaults set for the homepage (`/`) for new pages so they're not arbitrarily wide.

**`<Reader />`** for a collection of pages with shared navigation
- Example: `/data-stack` which populates `LeftSidebarContent` with `<TreeMenu />` (`src/components/TreeMenu/index.tsx`)

**Checklist:**
- Link new pages from a relevant menu in `<TaskBarMenu />` (`src/components/TaskBarMenu/index.tsx`) via `src/components/TaskBarMenu/menuData.tsx`

### Style

PostHog.com is intentionally designed to be information-dense, focused on the power user who wants less fluff and more substance. When creating a new page, it should look more like a Notion doc or research paper and less like a typical AI-generated landing page with copious whitespace. This means:

- More text-based content with lists and tables. Use emphasis (bold and italics) to accentuate important information.
- Short paragraphs so content is more scannable 
- Use images and illustrations sparingly – _only_ for making content more consummable. Images should enhance a story, never be distracting.
- Less whitespace
- On _rare_ occasions should there ever be a section on a page with alternating blocks containing a title and description on one side, across from an image or illustration. We are not building landing pages. We are building an information-rich resource intended for a technical audience who do _not_ appreciate typical marketing-style pages.

## Opening windows

When linking to a page that opens a different app, include `state={{ newWindow: true }}` so the previous window doesn't disappear:

```tsx
navigate("/path", { state: { newWindow: true } })
```

## App-less windows

Rarely should a page skip templates. Exceptions:

- `/talk-to-a-human` (`src/pages/talk-to-a-human.tsx`) - acts like a modal
- `/kbd` (`src/pages/kbd/index.tsx`) - custom form design

## App components

Shared components used across apps:

| Component | Location | Notes |
|-----------|----------|-------|
| `<HeaderBar />` | `src/components/OSChrome/HeaderBar.tsx` | Used in Explorer, Inbox, Presentation, ReaderView, merch store collections, community profiles, bookmarks. Custom menu options passed as needed. |
| `<OSTable />` | `src/components/OSTable/index.tsx` | Accepts arrays of rows and columns |
| `<OSTabs />` | `src/components/OSTabs/index.tsx` | Stacked tabs (homepage `src/pages/index.tsx`), horizontal tabs (`/about` `src/pages/about.tsx`) |
| `<MDXEditor />` | `src/components/MDXEditor/index.tsx` | Parses Markdown/MDX content |

## Product presentation slide templates

**Product pages** (`/llm-analytics`, `/product-analytics`) use slide templates. The various templates (and details for creating custom templates) are documented [in the component's README](src/components/Products/Slides/README.md).

When creating a new slide, look for (or ask the prompter) for an existing template to use as a base instead of generating custom slides by default.

**Landing pages** (/for/product-engineers, etc) use a variation of slide templates and are documented [in the handbook](@contents/handbook/engineering/posthog-com/presentations.mdx).

**Important:** All slide templates use the `@2xl` container query breakpoint to toggle between portrait-oriented mobile-formatted slides and landscape-oriented desktop-formatted slides. Follow existing patterns, including layout and font size to ensure compatibility and consistency.

Slide templates are intended to be kept DRY, with content being sourced from relevant [JSON](src/hooks/useProduct.ts) [files](src/hooks/useProducts.tsx).