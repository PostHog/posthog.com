# BlogLanding

Reusable building blocks for a blog "landing" page that keeps a category grid **and** surfaces
the most popular + most recent posts for a given folder. Built first for `/founders`, designed to
be reused for `/blog` and `/newsletter` by passing a different `folder`.

## Status

The **sidebar** layout (`variants/SidebarExplorer.tsx`) is live on `/founders` behind an A/B test.
`src/pages/founders.tsx` renders control (`Hub`) vs test (`SidebarExplorer`) via `RenderInClient` +
`posthog.getFeatureFlag('founders-hub-redesign')`. The experiment is
[Founders hub redesign](https://us.posthog.com/project/2/experiments/380435) (project 2, draft),
primary metric = founders-article click-through. `/founders-preview` always renders the test layout
for review. Once the test wins, drop the flag branch (keep `SidebarExplorer`) and reuse for `/blog`
and `/newsletter` by passing a different `folder`.

## Components

| File | Purpose |
|---|---|
| `useLandingPosts.ts` | Hook. Fetches `popular` (`score:desc`) and `recent` (`date:desc`) posts for a folder via the shared `usePosts` + `getParams`/`sortOptions` from `components/Edition/Posts`. Returns `{ hero, popular, recent, isLoading }` where `hero` is the top-scoring post and `popular` excludes it. |
| `useCategoryTags.ts` | Hook. Fetches a folder's `post-tags` from Squeak/Strapi. Shared source for `CategoryGrid` and `useCategoryMenu`. |
| `useCategoryMenu.tsx` | Hook. Builds a nested category tree for a folder: each category (`{ name, url, icon }`) with its articles as `children`, from the tag API + a one-shot posts fetch grouped by tag. Returns `{ items, loading }`. |
| `CategoryTree.tsx` | Handbook-styled category nav for the sidebar. Clicking a category row only toggles its collapsible (no navigation); article links inside navigate. Renders the category icon on every row (the shared `TreeMenu` only shows icons on leaf items, and navigates on parent click — which is why it wasn't reused here). |
| `CategoryGrid.tsx` | The category tiles as an auto-fit grid, sourced via `useCategoryTags`. Used by the founders `Hub`. Owns the `tagOptions` tag→icon map (re-exported from `components/Hub` for backwards compat). |
| `PostSection.tsx` | A labeled grid of `PostCard`s (reuses `components/Edition/PostCard`) with loading skeleton + empty state. Grid reflows via `@container` queries. Optional `action` slot (e.g. a sort toggle) and `columns` (2 or 3). |
| `Hero.tsx` | The featured slot. Self-contained (mirrors `FeaturedPost` but uses `@container` so it stacks on its column width, not the viewport) and crops the image to a standard 16:9. Falls back to `ImagePlaceholder`. `titleClassName` tunes the article-title size relative to the page title. |
| `ImagePlaceholder.tsx` | Neutral placeholder for an empty image slot (e.g. a post with no featured image). Fill the parent and set the aspect on the parent. |
| `SortToggle.tsx` | Accessible Recent/Popular segmented control. |
| `types.ts` | `LandingVariantProps` (`folder`, `title`, `intro`). |
| `variants/SidebarExplorer.tsx` | The landing layout. Built on the handbook's `ReaderView` shell (`components/ReaderView`) so it inherits the darker `secondary`-scheme sub-toolbar + nav rail and bright `primary`-scheme main content. Categories render via `CategoryTree` (collapsible, expand-in-place). Main column = hero + one 2-up feed toggled Recent/Popular. |

## Reused from elsewhere (not rebuilt here)

- `components/Edition/hooks/usePosts` — SWR fetch of `/api/posts`.
- `components/Edition/Posts` — `getParams`, `sortOptions`.
- `components/Edition/FeaturedPost`, `components/Edition/PostCard`.
- `components/ReaderView` — the handbook layout shell (SidebarExplorer). Its scheme treatment (dark `secondary` rail, bright `primary` content) is what `CategoryTree` visually matches.
- `components/NewsletterForm`.

## Conventions

- Only project color tokens (`bg-primary`, `bg-accent`, `text-primary`, `text-secondary`,
  `border-primary`) — no stock Tailwind colors.
- `@container` queries for responsiveness (windows are resizable), never `md:` media queries.
- Every section handles loading + empty states.
