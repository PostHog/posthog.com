# BuildMode

The building blocks for `/build-mode` (`src/pages/build-mode/index.tsx`) — the newsletter's rebranded
home. The page itself is only the `Editor` shell, the layout, and the GraphQL query; everything it
renders lives here.

These components live under `src/components/` rather than beside the page because **every file under
`src/pages/` becomes a route in Gatsby** — a colocated `FeaturedPost.tsx` would ship as
`/build-mode/FeaturedPost`.

## The page, top to bottom

| Section | Components |
| --- | --- |
| Header | `Masthead` (wordmark + tagline) and `FeaturedPost` (the newest post, taped up) |
| Pinboard | `RecentPosts` — a horizontally scrollable row of `PinnedPostCard`s that swing on their pins |
| All posts | `PostsGallery` — search + `TagFilter` over a grid of `GalleryCard`s |

## Files

| File | Purpose |
| --- | --- |
| `types.ts` | `BuildModePost` — a `/newsletter/*` MDX node as shaped by the page query. |
| `utils.ts` | `rand` (SSR-stable pseudo-random), `getSubtitle` (first sentence of the meta description/excerpt), `getAuthorName`, `getByline`. |
| `Masthead.tsx` | The build mode wordmark and standing tagline. |
| `FeaturedPost.tsx` | The newest post: large image with `Tape` corners, title, dek, byline. |
| `Tape.tsx` | Inline SVG strip of masking tape with torn ends. |
| `PostImage.tsx` | A post's featured image, degrading through the shapes it can arrive in: processed Gatsby image → Cloudinary URL → raw URL → `IconNewspaper` placeholder. Shared by all three sections. |
| `RecentPosts.tsx` | The scrollable pinboard row: edge fade mask, arrow buttons, and the two hooks below. |
| `PinnedPostCard.tsx` | One pinned card — pushpin, square thumbnail, resting angle, caption. |
| `usePinnedCardSwing.ts` | The swing physics (see below). |
| `useScrollEdges.ts` | Tracks whether a scroller has content off either edge; also exposes `scrollByPage`. Drives the fade mask and the arrow buttons. |
| `PostsGallery.tsx` | The all-posts section: heading with counts, search input, `TagFilter`, grid, empty state. |
| `GalleryCard.tsx` | One gallery tile. |
| `TagFilter.tsx` | Tag pills with an "All" reset. Clicking the active tag clears it. |
| `usePostFilters.ts` | Search + single-tag filter state over a post list. Returns `tags` (most common first), `filteredPosts`, `isFiltered`, and `clear`. |

## How the swing works

Each pinned card is a pendulum hanging inside an accelerating frame (the scroll container). Torque
comes mostly from scroll _acceleration_ — cards lean back as the row speeds up and swing forward as a
smooth scroll brakes — plus a small velocity term so steady scrolling gives a slight lean. Measured
velocity is low-passed so discrete wheel steps read as one continuous motion. Constants are derived
per index from `rand`, so cards drift out of phase; moving the cursor onto a card adds a small kick.

`usePinnedCardSwing` writes the resulting angles to the **container** as `--tilt-{index}` custom
properties, and each card composes its own into a `rotate(calc(...))`. Nothing re-renders while the
row is in motion, and because the angles are derived from a deterministic `rand`, SSR and hydration
agree. The rAF loop stops once every pendulum settles and input has been quiet for 200ms.

## Conventions

- Only project color tokens (`bg-primary`, `bg-accent`, `text-primary`, `text-secondary`,
  `text-muted`, `border-primary`, `border-input`, `text-red`) — no stock Tailwind colors.
- `@container` queries for responsiveness (the window is resizable), never `md:` media queries.
- Post links pass `state={{ newWindow: true }}` so posts open in their own window.
