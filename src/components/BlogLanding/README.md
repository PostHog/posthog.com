# BlogLanding

Reusable building blocks for a blog "landing" page that keeps a category grid **and** surfaces
the most popular + most recent posts for a given folder. Built first for `/founders`, designed to
be reused for `/blog` and `/newsletter` by passing a different `folder`.

## Status

The **sidebar** layout (`variants/SidebarExplorer.tsx`) is live on `/founders` at 100% rollout,
gated behind a boolean kill-switch flag rather than an A/B test. `src/pages/founders.tsx` renders
the new layout by default via `RenderInClient` + `posthog.isFeatureEnabled('founders-hub-redesign')`,
falling back to the old `Hub` only when that flag is explicitly disabled — see
[the flag](https://us.posthog.com/project/2/feature_flags/741153) (project 2). Disabling it reverts
`/founders` to the old hub instantly, no deploy needed. Next: reuse `SidebarExplorer` for `/blog`
and `/newsletter` by passing a different `folder`.

## Components

| File | Purpose |
|---|---|
| `useLandingPosts.ts` | Hook. Fetches `popular` (`score:desc`) and `recent` (`date:desc`) posts for a folder via the shared `usePosts` + `getParams`/`sortOptions` from `components/Edition/Posts`. Returns `{ hero, popular, recent, isLoading }` where `hero` is the top-scoring post and both feeds exclude it. |
| `useCategoryTags.ts` | Hook. Fetches a folder's `post-tags` from Squeak/Strapi. Shared source for `CategoryGrid` and `useCategoryMenu`. |
| `useCategoryMenu.ts` | Hook. Builds a nested category tree for a folder: each category (`{ name, url }`) with its articles as `children`, from the tag API + a one-shot posts fetch grouped by tag. Returns `{ items, loading }`, shaped for the shared `TreeMenu`. The rail is text-only — no icons. |
| `tagOptions.ts` | The category label → icon map, plus `getTagIcon()` (case-insensitive lookup) and `DEFAULT_TAG_ICON`. Used by `CategoryGrid` and `templates/Hub/Tag.tsx`. |
| `CategoryGrid.tsx` | The category tiles as an auto-fit grid, sourced via `useCategoryTags`. Used by the founders `Hub`. |
| `CategorySidebar.tsx` | The landing page's left rail: heading, intro, and the folder's categories as an expand-in-place `TreeMenu`. Owns its own data via `useCategoryMenu`. Wrapped in `React.memo` so main-column state (the sort toggle) doesn't re-render the category tree. |
| `PostSection.tsx` | A labeled grid of `PostCard`s (reuses `components/Edition/PostCard`) with loading skeleton + empty state. Grid reflows via `@container` queries. Optional `action` slot for a sort toggle. |
| `types.ts` | `LandingVariantProps` (`folder`, `title`, `intro`). |
| `variants/SidebarExplorer.tsx` | The landing layout. Built on the handbook's `ReaderView` shell (`components/ReaderView`) so it inherits the darker `secondary`-scheme sub-toolbar + nav rail and bright `primary`-scheme main content. Passes `CategorySidebar` as the `leftSidebar`. Main column = hero via shared `FeaturedPost` (`containerStack`) + one feed toggled Recent/Popular via shared `ToggleGroup`. |

## Reused from elsewhere (not rebuilt here)

- `components/Edition/hooks/usePosts` – SWR fetch of `/api/posts`.
- `components/Edition/Posts` – `getParams`, `sortOptions`.
- `components/Edition/FeaturedPost` – the hero slot. Opts into `containerStack` (@container stacking) + `isLoading`/`titleClassName` props (additive; the blog's default render is unchanged).
- `components/Edition/PostCard` – the feed cards (via `PostSection`).
- `components/TreeMenu` – the category rail, rendered in `expandOnly` mode (additive prop: parents toggle in place instead of navigating; existing nav is unchanged).
- `components/RadixUI/ToggleGroup` – the Recent/Popular segmented control.
- `components/ReaderView` – the handbook layout shell (SidebarExplorer). Its scheme treatment (dark `secondary` rail, bright `primary` content) is what the category rail visually matches.
- `components/NewsletterForm`.

## Conventions

- Only project color tokens (`bg-primary`, `bg-accent`, `text-primary`, `text-secondary`,
  `border-primary`) – no stock Tailwind colors.
- `@container` queries for responsiveness (windows are resizable), never `md:` media queries.
- Every section handles loading + empty states.
