# SpotlightSearch

The site-wide search overlay, opened with `Cmd/Ctrl+K` or `/` through `openSearch()` in `src/context/App.tsx`. It presents the existing Algolia search as a Spotlight-style panel and replaces the old global search overlay without changing embedded search surfaces.

## Data

Spotlight uses the same Algolia application, search key, index, and `react-instantsearch-hooks-web` integration as `components/SearchUI`. It does not call Inkeep or another vector-search service.

Results use the existing Algolia fields: `title`, `excerpt`, `type`, and `fields.slug` (falling back to `slug`). They remain in Algolia rank order and are grouped by category for display. Active category filters are sent to Algolia as facet filters, so filtering is applied before results are limited and returned. Clicking a result fires `web search result clicked` and opens the page in a new window.

## Structure

`index.tsx` is the search coordinator. It owns the Algolia hooks, query and filter state, keyboard navigation, analytics, actions, and the refs shared across selectable rows. The surrounding files keep configuration and rendering concerns separate without introducing another state layer:

- `categories.tsx` contains the ordered category configuration, aliases, fallback presentation, and matching helpers.
- `types.ts` defines raw Algolia hits, normalized results, groups, and navigation items.
- `SearchInput.tsx` renders the query input and active-filter token.
- `FilterMenu.tsx` renders the category picker.
- `SuggestionList.tsx` renders matching actions, Ask AI, and category suggestions.
- `ResultList.tsx` renders loading placeholders, grouped Algolia results, and the filtered empty state.
- `SearchFooter.tsx` renders context-sensitive keyboard hints.
- `SpotlightRow.tsx` provides shared option semantics, selection styling, and icon layout for every selectable row.
- `actions.tsx` defines command-palette actions and connects them to app state.

Keep search behavior and selection ordering in `index.tsx`. Extracted components should remain presentational and communicate through callbacks and refs supplied by the coordinator.

## Behavior

- Rendered by `SearchOverlay` in `components/SearchUI`, which is mounted by the desktop wrappers and controlled by the app-level `searchOpen` state.
- `openSearch(initialFilter?)` seeds the category filter.
- `Cmd/Ctrl+K` toggles the overlay. `Esc` clears the query, clears the filter, and then closes it.
- Arrow keys move the selection, Enter opens it, and Shift+Enter sends the query to Max chat.
- An empty search is only the search bar; results expand beneath it with a keyboard-hint footer.
- A `ResizeObserver` measures the expanding content so state changes animate smoothly.

### Actions

`actions.tsx` defines command-palette actions through `useSpotlightActions`. It includes theme, wallpaper, hedgehog, retro, reduce transparency, performance, cursor, click behavior, and boring-mode toggles, plus copy-desktop-link, close-windows, screensaver, and confetti actions.

Actions appear for short matching queries. One-shot actions close the palette, while actions with `keepOpen` can be repeated. Add an action by providing an id, label, icon, keywords, `perform`, and optional `keepOpen` value.

### Ask AI suggestion

Queries of four or more words promote an Ask AI row. A settled query with no Algolia results does the same, so users can hand the question to Max chat. This handoff does not use Inkeep vector search.

### Category filters

- Category-like queries can surface a filter suggestion.
- Selecting a category pins a filter token and scopes the Algolia request while preserving ranking within that category.
- Clicking a group heading applies its category while preserving the query.
- Backspace at the beginning of an empty input, Esc, or the filter token removes the filter.
- `Cmd/Ctrl+F` opens the category picker. While open, the input filters category names without changing the current Algolia query.
- The category picker is intentionally curated: its array order controls which filters are promoted and how they are ordered, while unlisted Algolia types can still appear as ordinary results.

### Accessibility

The overlay exposes dialog and combobox semantics, keeps focus inside the open dialog, restores focus to the previously active control when it closes, and connects keyboard selection to options with `aria-activedescendant`.

## Styling notes

- The panel and its nested surfaces use opaque project color tokens that switch automatically with light and dark mode.
- Selected rows use a subtle translucent yellow accent over the panel's opaque surface.
- The panel is an `@container`; result URLs hide below `@md` as the window narrows.
- Keyboard hints are hidden below `@sm` to keep the mobile layout uncluttered.
- De-emphasized text uses `text-secondary` for consistent readable contrast in both color modes.
- There is no backdrop dim, matching macOS Spotlight.
