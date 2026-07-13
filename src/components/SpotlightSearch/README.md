# SpotlightSearch

The site-wide search overlay, opened with `Cmd/Ctrl+K` or `/` through `openSearch()` in `src/context/App.tsx`. It presents the existing Algolia search as a macOS Spotlight-style glass panel and replaces the old global search overlay without changing embedded search surfaces.

## Data

Spotlight uses the same Algolia application, search key, index, and `react-instantsearch-hooks-web` integration as `components/SearchUI`. It does not call Inkeep or another vector-search service.

Results use the existing Algolia fields: `title`, `excerpt`, `type`, and `fields.slug` (falling back to `slug`). They remain in Algolia rank order and are grouped by category for display. Clicking a result fires `web search result clicked` and opens the page in a new window.

## Behavior

- Rendered by `SearchOverlay` in `components/SearchUI`, which is mounted by the desktop wrappers and controlled by the app-level `searchOpen` state.
- `openSearch(initialFilter?)` seeds the category filter.
- `Cmd/Ctrl+K` toggles the overlay. `Esc` clears the query, clears the filter, and then closes it.
- Arrow keys move the selection, Enter opens it, and Shift+Enter sends the query to Max chat.
- An empty search is only the glass bar; results expand beneath it with a keyboard-hint footer.
- A `ResizeObserver` measures the expanding content so state changes animate smoothly.

### Actions

`actions.tsx` defines command-palette actions through `useSpotlightActions`. It includes theme, wallpaper, hedgehog, retro, heater, performance, cursor, click behavior, and boring-mode toggles, plus copy-desktop-link, close-windows, screensaver, and confetti actions.

Actions appear for short matching queries. One-shot actions close the palette, while actions with `keepOpen` can be repeated. Add an action by providing an id, label, icon, keywords, `perform`, and optional `keepOpen` value.

### Ask AI suggestion

Queries of four or more words promote an Ask AI row. A settled query with no Algolia results does the same, so users can hand the question to Max chat. This handoff does not use Inkeep vector search.

### Category filters

- Category-like queries can surface a filter suggestion.
- Selecting a category pins a filter token and scopes the already ranked Algolia results client-side.
- Clicking a group heading applies its category while preserving the query.
- Backspace at the beginning of an empty input, Esc, or the filter token removes the filter.
- `Cmd/Ctrl+F` opens the category picker. While open, the input filters category names and the Algolia query is temporarily cleared.

## Styling notes

- The panel uses project color tokens and translucent backgrounds so it adapts to light and dark mode.
- The panel is an `@container`; result URLs hide below `@md` as the window narrows.
- De-emphasized text uses `text-secondary` for contrast against translucent wallpaper backgrounds.
- There is no backdrop dim, matching macOS Spotlight.
