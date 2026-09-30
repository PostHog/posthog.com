# Museum

Components for [/museum](/museum), a public archive of PostHog marketing: ads, social, email, out of home, video, merch, and misc. Exhibits live in Strapi (`museum-exhibit`, `museum-category`, `museum-type`, `museum-collection` in `PostHog/squeak-strapi`), so team members add and edit them in the site with no code change. The architecture follows `/side-projects`.

## Data

`src/hooks/useMuseum.ts` has everything that talks to Strapi:

- `useMuseumExhibits()` – every exhibit with the grid fields (hero image, category, type, collections). Filtering and sorting happen on the client.
- `useMuseumExhibit(slug)` – one exhibit with its gallery, credits, and related exhibits.
- `useMuseumTaxonomy()` – categories (sorted by `order`), types (with their category), and collections.
- `getRelatedExhibits(exhibit)` – related exhibits in both directions (see below).
- `museumRequest(path, jwt, method, data)` – authenticated writes. Strapi rejects them unless the JWT belongs to the `moderator` role.

### Related exhibits

A link is stored on one exhibit (`relatedExhibits`) and Strapi exposes the reverse side as `relatedBy`. Always show `getRelatedExhibits()`, the deduped union, so a link shows on both exhibits. `ExhibitForm` keeps an existing link on the side that already stores it. When a link is removed, it disconnects the link on whichever exhibit stores it.

### Taxonomy

- **Category**: the main filter. It is curated in the Strapi admin, and the site can't create categories.
- **Type**: optional, belongs to one category (Reddit Ads → Digital Ads). Team members can add types from the form.
- **Collection**: an optional grouping across categories ("Do more weird", "Self-driving launch"). Team members can add collections from the form. A campaign is a collection plus related links, so there is no separate campaign entity.

## Components

### `ExhibitCard`

A grid tile: `ExhibitFrame` + `ExhibitPlaque`, linking to `/museum/[slug]` in a new window.

```tsx
<ExhibitCard exhibit={exhibit} />
```

### `ExhibitFrame`

An artwork frame (thick border, mat, shadow). It renders `image` or a placeholder icon, or `children` if you pass them (for example, a zoomable image or a video).

| Prop | Type | Notes |
| --- | --- | --- |
| `image` | `MuseumMedia \| null` | Ignored when `children` is set |
| `alt` | `string` | Fallback alt text |
| `className` | `string` | Frame classes |
| `imageClassName` | `string` | Defaults to `aspect-[4/3] object-contain` |

### `ExhibitPlaque`

The small placard: title, date (at its precision), and type or category.

### `MuseumFilters`

The category, type, and sort dropdowns, plus the collection chip row. Controlled by `filters`/`onChange`. `filtersFromSearch()` and `filtersToSearch()` convert the state to and from the URL (`?category=&type=&collection=&sort=oldest`). The page syncs the URL through `useWindow().appWindow.location`, the same way `/side-projects` does.

### `ExhibitGallery`

Extra images (click to zoom via `ZoomImage`) and videos (YouTube via a `youtube-nocookie` embed, Wistia via `WistiaEmbed`, anything else as a link).

### `ExhibitForm` / `useExhibitForm`

The add/edit form, opened as a fixed window. The window size comes from the `museum-exhibit-form` entry in `src/context/App.tsx` `appSettings`.

```tsx
const openExhibitForm = useExhibitForm()
openExhibitForm(exhibit /* or undefined */, (savedSlug) => refresh())
```

Only render the triggers for `useUser().isModerator`.

## Utils

`utils.ts`: `formatExhibitDate(date, precision)`, `uniqueSlug(value, taken)`, `parseVideo(video)`, `isValidUrl(url)`, and `parseLinks`/`formatLinks` (the form edits links as `Label | URL` lines).
