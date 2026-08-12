# BuildMode

The building blocks for `/build-mode` (`src/pages/build-mode/index.tsx`) — the newsletter's rebranded
home. The page itself is only the `ReaderView` shell, the layout, and the GraphQL query; everything it
renders lives here.

These components live under `src/components/` rather than beside the page because **every file under
`src/pages/` becomes a route in Gatsby** — a colocated `FeaturedPost.tsx` would ship as
`/build-mode/FeaturedPost`.

## The page, top to bottom

| Section | Components |
| --- | --- |
| Header | `HeroHeader` (wordmark; also repeated as the page footer with subscribe), `Hero` (the statement: tagline as display type + pitch + subscribe), and `FeaturedPost` (the newest post, taped up) |
| All posts | `PostsGallery` — Recent/Popular dropdown + expanding search + `TagFilter` over a paginated grid of `GalleryCard`s (12 per page). |
| Footer | A second `HeroHeader` (`placement="build-mode-footer"`) after the gallery |

## Files

| File | Purpose |
| --- | --- |
| `types.ts` | `BuildModePost` — a `/newsletter/*` MDX node as shaped by the page query. |
| `utils.ts` | `rand` (SSR-stable pseudo-random, used by the unused pinboard), `getSubtitle` (first sentence of the meta description/excerpt — a boundary is `.`/`!`/`?` followed by the end or by whitespace and a non-lowercase character, so `?` openers end the dek and `e.g.` doesn't), `getAuthorName`, `getByline`. |
| `Masthead.tsx` | The build mode wordmark and standing tagline (also exports `LOGO_SRC`). Currently unused by the page — superseded by `Hero` unless a variant brings it back. |
| `Hero.tsx` | `HeroHeader` — wordmark, plus an optional subscribe row when given `placement` (used as the footer). `SubscribeForm` fires `newsletter_subscribed` with a per-instance `placement`, and carries the same "we'll share your email with Substack" disclosure as `NewsletterForm`, since that event is what subscribes the reader. `Hero` is the statement headline (static `bg-highlight` on "product builders") with the pitch as its deck and subscribe below. |
| `FeaturedPost.tsx` | The newest post: a "Hot off the press" annotation pointing down at it, image with `Tape` corners on the left, title, dek, and byline on the right. |
| `Tape.tsx` | Inline SVG strip of masking tape with torn ends. |
| `PostImage.tsx` | A post's featured image, degrading through the shapes it can arrive in: processed Gatsby image → Cloudinary URL → raw URL → `IconNewspaper` placeholder. Shared by the featured post, gallery, and unused pinboard. |
| `RecentPosts.tsx` | The scrollable pinboard row of swinging `PinnedPostCard`s. Currently unused by the page. |
| `PinnedPostCard.tsx` | One pinned card — pushpin, square thumbnail, resting angle, caption. Currently unused by the page. |
| `usePinnedCardSwing.ts` | The swing physics (see below). Currently unused by the page. |
| `useScrollEdges.ts` | Tracks whether a scroller has content off either edge; also exposes `scrollByPage`. Currently unused by the page. |
| `PostsGallery.tsx` | The all-posts section: heading with counts, Recent/Popular dropdown, search that expands from an icon into an `OSInput`, `TagFilter`, paginated grid (12 per page, resets on filter or sort change), empty state. |
| `GalleryCard.tsx` | One gallery tile. |
| `TagFilter.tsx` | A single measured row of tag pills with an "All" reset (clicking the active tag clears it); pills that don't fit collapse into a "+N more" popover. Re-measures on resize and once `document.fonts.ready` resolves — the row's own box doesn't change when only the pills reflow under a font swap. |
| `usePostFilters.ts` | Search + single-tag filter + Recent/Popular sort over a post list. Popularity is `fields.pageViews` (PostHog at build time; falls back to recency when the build has no `POSTHOG_APP_API_KEY`). Returns `tags` (most common first), `filteredPosts`, `isFiltered`, and `clear`. |

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

The motion is decorative, so `usePinnedCardSwing` gates it on `usePrefersReducedMotion` and never
starts the loop when the preference is set. It has to be gated in JS: the angles are written as inline
custom properties rather than a CSS animation, so `motion-reduce:` can't reach them.

## Conventions

- Only project color tokens (`bg-primary`, `bg-accent`, `text-primary`, `text-secondary`,
  `text-muted`, `border-primary`, `border-input`, `text-red`) — no stock Tailwind colors.
- `@container` queries for responsiveness (the window is resizable), never `md:` media queries.
- Post links pass `state={{ newWindow: true }}` so posts open in their own window.
