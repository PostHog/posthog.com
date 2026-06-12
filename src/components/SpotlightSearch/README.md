# SpotlightSearch

The site-wide search overlay, opened with `Cmd/Ctrl+K` or `/` (via `openSearch()` in `src/context/App.tsx`). A macOS Spotlight-style rounded glass searchbar, fixed in the upper third of the viewport — it replaced the old draggable `WindowSearchUI` floating window on the searchinator-9000 branch.

## Data

Results come from `useHybridSearch` (`components/Search/useHybridSearch.ts` — see `components/Search/README.md` for the engine architecture), gated by `useSemanticSearchEnabled` (the `website-semantic-search` flag, with a `localStorage.setItem('website-semantic-search', 'true')` escape hatch for local dev):

- **Flag off:** `useHybridSearch(query, { semantic: false })` — Algolia-only, instant, no Inkeep proxy calls or cost.
- **Flag on:** the engines are query-shaped to avoid paying semantic latency/cost on navigational lookups:
  - **1–2 words:** Algolia-only (instant). Most search volume lands here.
  - **3+ words or a question signal** (leading question word with 2+ words, or trailing `?`): full hybrid (Algolia + Inkeep RAG, RRF-merged).
  - **Question-led queries** (starting with how/why/what/can/does/…): semantic-only — keyword search is skipped since it adds noise for natural-language questions.
  - While a semantic query is in flight (~1.5–2s) the hook returns empty results; the panel shows pulsing skeleton rows and the search icon becomes a spinner.

Result `type` comes from the shared `typeForPath.ts` taxonomy; `typeConfig` here covers all of its types (labels mirror the `categories` export in `components/Search/SearchResults.tsx`, with `product` ranked first) and falls back to a generic config for unknown types. Results render grouped by category in `typeOrder`, rank order preserved within groups.

Clicks fire `web search result clicked` (title, slug, category, query, type, `searchEngine: 'hybrid' | 'algolia'`, `searchSources`) for engine comparison, mirroring `SemanticSearchResults.tsx`.

## Behavior

- Rendered by `AppProvider` (after `{children}`) in desktop mode only; `websiteMode` keeps its taskbar search dropdown (`components/SearchUI`).
- `openSearch(initialFilter?)` seeds the category filter (e.g. open pre-scoped to docs).
- `Cmd/Ctrl+K` toggles, `Esc` clears the query, then the filter, then closes. Click outside closes.
- `↑`/`↓` move the selection (wraps), `↵` opens the selected result in a new window (with `#fragment` when the result has one), `⇧↵` hands the query to Max chat.
- Collapsed (empty query, no filter) it's just the bar, Spotlight-style; results expand the same glass panel below a divider with a keyboard-hint footer.

### Ask AI suggestion

- Queries of 4+ words read like questions, so an "Ask AI" row is promoted to the top result (pre-selected); Enter hands the query to Max chat, same as `⇧↵`.
- Zero-result queries (after loading settles) get the same Ask AI row as their only result instead of a dead-end "no results" state.

### Category filters

- Typing something close to a category name (≥3-char prefix or ≥4-char substring of an alias in `categoryAliases` — the stand-in for semantic matching) surfaces a "Filter by category" row as the top result.
- Selecting it clears the query and pins a filter token between the search icon and the input; results are then scoped to that category client-side.
- Clicking a group header applies that category as the filter while keeping the query.
- With a filter active and no query, the panel shows a "Type to search…" hint (real search can't browse a category without a query).
- Remove the filter with backspace at the start of the input, `Esc` (once the query is empty), or by clicking the token. Group headers are hidden while a filter is active since there's only one group.

## Styling notes

- Glass: `bg-primary/60 backdrop-blur-2xl` — scheme tokens are defined with `<alpha-value>` so the translucency adapts to light/dark automatically; the `ring-white/10` inset ring is the macOS-style inner edge highlight.
- Selected rows: translucent `bg-accent/60` fill plus a subtle `ring-border/40` inset ring (rings avoid 1px layout shift).
- The panel is a `@container`; the per-result URL column hides below `@md`.
- No backdrop dim, matching macOS Spotlight.
