# PocketGuidesList

Pocket guide use cases grouped by volume. Built for the docs landing page (`/docs`), where it is
the last section – after Surfaces and Tools, which orient you before the use cases go deep.

```tsx
import PocketGuidesList from 'components/Docs/PocketGuidesList'
;<PocketGuidesList />
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `perVolume` | `number` | `3` | Rows shown per volume. Above this, an "All N →" link appears in the volume header. |
| `className` | `string` | `''` | Appended to the wrapper. |

Returns `null` when no volume has any guides, so a caller can render it unconditionally.

## Where the data comes from

`usePocketGuides()` in `src/hooks/usePocketGuides.ts`. That hook is **volume-agnostic** by
design: it globs `/pocket-guides/*` and derives the volume from the slug.

Do not swap it for `useSelfDrivingTemplates()` (`src/components/SelfDrivingInbox`). That hook
hardcodes the self-driving volume in both its slug regex and a `filters.type` check, so guides
from any other volume would silently never appear here. Nothing would error – the list would
just be quietly incomplete.

Volume names, colors, numbers, and ordering come from `POCKET_GUIDE_VOLUMES` in
`src/constants/pocketGuides.ts`. A new volume needs an entry there **and** at least one guide
on disk before it shows up.

## Editorial rules

Deliberate, not oversights:

- **Guide rows have a subtitle; nothing else does.** Recognizing your own problem in the list is
  the entire point of the section, so a guide title earns its line of prose. The subtitle comes
  from the guide's `subtitle` frontmatter, which is also its page meta description – so it has to
  read as a sentence, not a label. There is no separate blurb field.
- **No per-guide icons.** Guide frontmatter has no icon field, and a repeated per-volume mark down
  every row is decoration rather than navigation. The cards' colored left edges carry the grouping
  instead. (`frontmatter.icon` is also already taken: it is an inferred `File` field queried as
  `icon { publicURL }` in several places, so it cannot be reused for a string.)
- **"All N →" only appears when `count > perVolume`.** With three guides and three rows shown,
  "All 3 →" is noise. It turns itself on as a volume grows.
- **Volumes with zero guides are filtered out**, even when registered as `comingSoon`. A
  header with no rows under it costs a click to discover it is empty. Forthcoming volumes are
  sold on the shelf at `/pocket-guides`, which renders them as a cover with a sash.

## Gotchas

- **The volume color is a dynamic Tailwind class.** The component builds
  `border-${volume.token}` for each card's left edge, so every token used by a volume needs a
  matching entry in `safelist.txt`. `orange` and `blue` are already covered. A new token ships
  **uncolored and silent** – no build error – so check a new volume by eye. Stick to the
  `text-`/`border-`/`bg-` families that are already safelisted; variants like `ring-<token>`
  and `border-<token>/20` are not.
- **The volume label is `text-secondary`, not the volume's token.** The token colors read badly
  against the window's frosted background at that size. The card edges carry the volume's
  identity instead, which is why only one dynamic color class is left in this component.
- **The colored edge is `border-l-4 border-<token>`, not `border-l-<token>`.** `border-l-4` sets
  only the left edge's *width*, so the bare `border-<token>` color class is all that's needed –
  and it's the one that's actually safelisted. `border-l-orange` is not, and would render
  colorless.
- **Links pass `state={{ newWindow: true }}`**, matching every other pocket-guide link in the
  repo. Pocket guides open as their own `Explorer` window rather than in place.
- **The card grid is `auto-fill`, not breakpoints.** Widening the window adds a column rather than
  stretching each card, and the row fills itself as a volume gains guides. Same construction as
  `components/Products/InstallFrameworkGrid`. Anything here that does need a breakpoint must use a
  container query – the docs window is resizable, so media queries would not respond to it.
