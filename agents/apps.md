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
- Set default (or min/max) dimensions via `src/context/App.tsx` in `appSettings`

**`<Reader />`** for a collection of pages with shared navigation
- Example: `/data-stack` which populates `LeftSidebarContent` with `<TreeMenu />` (`src/components/TreeMenu/index.tsx`)

**Checklist:**
- Link new pages from a relevant menu in `<TaskBarMenu />` (`src/components/TaskBarMenu/index.tsx`) via `src/components/TaskBarMenu/menuData.tsx`

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

Product pages (`/llm-analytics`, `/product-analytics`) use slide templates. The various templates (and details for creating custom templates) are documented [in the component's README](src/components/Products/Slides/README.md).

Landing pages (/for/product-engineers, etc) use a variation of slide templates and are documented [in the handbook](@contents/handbook/engineering/posthog-com/presentations.mdx).

**Important:** Slide templates use the `@2xl` container query breakpoint to toggle between portrait-oriented mobile-formatted slides and landscape-oriented desktop-formatted slides. Follow existing patterns, including layout and font size to ensure compatibility and consistency.