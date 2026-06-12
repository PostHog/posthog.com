# SpotlightSearch

The site-wide search overlay, opened with `Cmd/Ctrl+K` or `/` (via `openSearch()` in `src/context/App.tsx`). A macOS Spotlight-style rounded glass searchbar, fixed in the upper third of the viewport — it replaced the old draggable `WindowSearchUI` floating window on the searchinator-9000 branch.

## Data

Results come from `useHybridSearch` (`components/Search/useHybridSearch.ts` — see `components/Search/README.md` for the engine architecture). The engine follows `useSearchMode` (localStorage `search-mode`, window-event-synced, persists across sessions):

- **Keyword (default):** `{ semantic: false }` — Algolia-only, instant, no Inkeep proxy calls or cost.
- **Semantic:** `{ keyword: false }` — Inkeep RAG only, switched on via the "Switch to semantic search" action (see Actions). Requires the `INKEEP_RAG_API_KEY` env var for the `/api/search` proxy.
  - While a semantic query is in flight (~1.5–2s) the hook returns empty results; the panel shows pulsing skeleton rows and the search icon becomes a spinner.

Result `type` comes from the shared `typeForPath.ts` taxonomy; `typeConfig` here covers all of its types (labels mirror the `categories` export in `components/Search/SearchResults.tsx`) and falls back to a generic config for unknown types. Results render grouped by category: Products always first when present, the remaining groups ordered by their best member's RRF `score` (exposed on `HybridSearchResult`) so the strongest match's group sits highest, with `typeOrder` as the tiebreaker. Rank order is preserved within groups.

Clicks fire `web search result clicked` (title, slug, category, query, type, `searchEngine: 'hybrid' | 'algolia'`, `searchSources`) for engine comparison, mirroring `SemanticSearchResults.tsx`.

## Behavior

- Rendered by `AppProvider` (after `{children}`) in desktop mode only; `websiteMode` keeps its taskbar search dropdown (`components/SearchUI`).
- `openSearch(initialFilter?)` seeds the category filter (e.g. open pre-scoped to docs).
- `Cmd/Ctrl+K` toggles, `Esc` clears the query, then the filter, then closes. Click outside closes.
- `↑`/`↓` move the selection (wraps), `↵` opens the selected result in a new window (with `#fragment` when the result has one), `⇧↵` hands the query to Max chat.
- Collapsed (empty query, no filter) it's just the bar, Spotlight-style; results expand the same glass panel below a divider with a keyboard-hint footer.
- The expanding section slides open/closed and between content sizes: a `ResizeObserver` (`measureContent`) feeds the content's measured height to a `motion.div` wrapper that animates `height` to it (180ms; `AnimatePresence` keeps content mounted while sliding shut). `initial={false}` skips the slide when the overlay mounts already-expanded via `initialFilter`, since the panel's scale-in covers that.

### Actions

- `actions.tsx` defines command-palette actions (`useSpotlightActions` — a hook because they close over app context and toasts). Mode toggles: theme, wallpaper cycle, hedgehog mode (via `useHedgehogMode`, now window-event-synced across instances), retro mode (classic skin), heater mode, performance boost, cursor cycle (default/xl/james), click behavior, search mode (keyword ↔ semantic via `useSearchMode` — see Data), boring mode (one-way — it unmounts the desktop and the palette). One-shots: copy desktop link, close all windows, screensaver, confetti.
- Actions are for things search can't do — plain navigations don't belong here (pages are what search results are for). Also not included: dance mode and the hedgehog generator have no routes (TapePlayer-internal / addWindow-only), and enterprise/theo modes live in the Layout context, which isn't an ancestor of the overlay.
- An action row surfaces at the very top (above Ask AI/filter suggestions) when a short query (≤3 words, ≥3 chars) matches an action's `keywords` — prefix, substring, or query-contains-keyword. Capped at 2 rows.
- Selecting one runs `perform()` and fires `spotlight action used`. One-shots close the palette; `keepOpen` actions (theme, wallpaper) keep it open with the query intact so Enter re-runs them. `clearQuery` (search mode) keeps the palette open but wipes the trigger query — re-running it makes no sense and would fire the trigger words at the newly selected engine.
- To add an action: append to the array in `actions.tsx` — id, label, icon, keywords, `perform`, optional `keepOpen`/`clearQuery`.

### Ask AI suggestion

- Queries of 4+ words read like questions, so an "Ask AI" row is promoted to the top result (pre-selected); Enter hands the query to Max chat, same as `⇧↵`.
- Zero-result queries (after loading settles) get the same Ask AI row as their only result instead of a dead-end "no results" state.

### Category filters

- Typing something close to a category name (≥3-char prefix or ≥4-char substring of an alias in `categoryAliases` — the stand-in for semantic matching) surfaces a "Filter by category" row as the top result.
- Selecting it clears the query and pins a filter token between the search icon and the input; results are then scoped to that category client-side.
- Clicking a group header applies that category as the filter while keeping the query.
- With a filter active and no query, the panel shows a "Type to search…" hint (real search can't browse a category without a query).
- Remove the filter with backspace at the start of the input, `Esc` (once the query is empty), or by clicking the token. Group headers are hidden while a filter is active since there's only one group.

### Filter picker (`Cmd/Ctrl+F`)

- A filter icon sits at the right edge of the bar whenever the `esc` hint isn't shown (i.e. there's a query, or the picker is open). Clicking it — or `Cmd/Ctrl+F` anytime the overlay is open (find-in-page is useless here anyway) — toggles a picker listing every category plus "All categories" (clears the filter); the current selection gets a check.
- Entering the picker parks the search query (`savedQueryRef`) and clears the input, which becomes a type-to-filter box: typed text narrows the list by label/alias match (`visibleFilterOptions`), selection pinned to the first match. Searches are suspended while the picker is open (`useHybridSearch` gets `''`).
- Focus stays on the input throughout — `↑`/`↓` move the picker selection (wraps), `↵` applies the highlighted category, `Esc` or `Cmd/Ctrl+F` cancels, and backspace on empty filter text backs out too (clearing the active filter, if any, on the way). Every exit restores the parked query; the footer hints switch to picker mode.

## Styling notes

- Glass: `bg-primary/60 backdrop-blur-2xl` — scheme tokens are defined with `<alpha-value>` so the translucency adapts to light/dark automatically; the `ring-white/10` inset ring is the macOS-style inner edge highlight.
- Selected rows: translucent `bg-accent/60` fill plus a subtle `ring-border/40` inset ring (rings avoid 1px layout shift).
- No `text-muted` anywhere: dark mode's muted token (rgb(98 102 116)) was tuned for opaque window backgrounds and vanishes against the translucent glass over bright wallpapers — de-emphasized text here uses `text-secondary` instead.
- The panel is a `@container`; the per-result URL column hides below `@md`.
- No backdrop dim, matching macOS Spotlight.
