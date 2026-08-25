# PostsIndex

The shared building blocks of a posts index page — a featured newest post plus a searchable,
sortable, tag-filterable gallery. Used by `/newsletter` (`src/pages/newsletter.tsx`) and `/blog`
(`src/pages/blog.tsx`). Everything here is data-driven: components take a `PostSummary[]` and carry
no page-specific branding beyond defaults the pages can override.

These components live under `src/components/` rather than beside the pages because **every file
under `src/pages/` becomes a route in Gatsby** — a colocated `FeaturedPost.tsx` would ship as
`/newsletter/FeaturedPost`.

The newsletter-specific pieces (hero, subscribe form, wordmark and its easter eggs) live in
`src/components/BuildMode/`, which documents the history of this split.

## Files

| File | Purpose |
| --- | --- |
| `types.ts` | `PostSummary` — an MDX post node as shaped by the pages' queries. |
| `accents.ts` | `Accent` (`'red'` for `/newsletter`, `'blue'` for `/blog`) and the class strings each accent resolves to. Full literals so Tailwind's scanner sees them. Components default to `'red'`. |
| `utils.ts` | `rand` (SSR-stable pseudo-random, used by BuildMode's unused pinboard), `getSubtitle` (first sentence of the meta description/excerpt — a boundary is `.`/`!`/`?` followed by the end or by whitespace and a non-lowercase character, so `?` openers end the dek and `e.g.` doesn't), `getAuthorName`, `getByline`. |
| `FeaturedPost.tsx` | The newest post: an annotation pointing down at it (`annotation`, default "Hot off the press"; colored by `accent`), image with `Tape` corners on the left, title, dek, and byline on the right. |
| `Tape.tsx` | Inline SVG strip of masking tape with torn ends. |
| `PostImage.tsx` | A post's featured image, degrading through the shapes it can arrive in: processed Gatsby image → Cloudinary URL → raw URL → `IconNewspaper` placeholder. Shared by the featured post, gallery, and BuildMode's unused pinboard. |
| `PostsGallery.tsx` | The gallery section: heading with counts (`heading`, default "Everything else"), Recent/Popular dropdown, search that expands from an icon into an `OSInput` (`searchName` sets the input's `name`; `/newsletter` passes `build-mode-search` to keep autocapture stable), `TagFilter` (takes `accent`), paginated grid (12 per page, resets on filter or sort change), empty state. |
| `GalleryCard.tsx` | One gallery tile. |
| `TagFilter.tsx` | A single measured row of tag pills with an "All" reset (clicking the active tag clears it); pills that don't fit collapse into a "+N more" popover. Re-measures on resize and once `document.fonts.ready` resolves — the row's own box doesn't change when only the pills reflow under a font swap. |
| `usePostFilters.ts` | Search + single-tag filter + Recent/Popular sort over a post list. Popularity is `fields.pageViews` (PostHog at build time; falls back to recency when the build has no `POSTHOG_APP_API_KEY`). Returns `tags` (most common first), `filteredPosts`, `isFiltered`, and `clear`. |

## Conventions

- Only project color tokens (`bg-primary`, `bg-accent`, `text-primary`, `text-secondary`,
  `text-muted`, `border-primary`, `border-input`, `text-red`, `text-blue`) — no stock Tailwind
  colors.
- `@container` queries for responsiveness (the window is resizable), never `md:` media queries.
- Post links pass `state={{ newWindow: true }}` so posts open in their own window.
