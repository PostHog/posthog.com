# Search

Site-wide search modal, opened with `/`, `Cmd/Ctrl+K`, or programmatically via `useSearch().open()`.

## Two search engines (user preference)

`SearchContext.tsx` renders one of two result components inside the modal, selected by `useSearchMode` — a localStorage-persisted (`search-mode`), window-event-synced preference toggled by the SpotlightSearch "Switch to semantic search" action. Programmatically: `localStorage.setItem('search-mode', 'semantic')` (undo with `localStorage.removeItem(...)`).

| Mode | Component | Engine |
|---|---|---|
| keyword (default) | `SearchResults.tsx` | Algolia InstantSearch (`react-instantsearch-hooks-web`), browser-direct with the public search key. Index is built at deploy time by `gatsby/algoliaConfig.js`. |
| semantic | `SemanticSearchResults.tsx` | Hybrid search via `useHybridSearch.ts`: Algolia (instant, keyword) + Inkeep RAG semantic search, merged with reciprocal rank fusion. |

## Hybrid search flow

```
keystroke ─┬→ Algolia index.search (debounce 150ms, browser-direct)
           │    → normalize hits: type via typeForPath.ts, dedupe by path
           │
           └→ useInkeepSearch (debounce 400ms, AbortController)
                → POST /api/search { query }                  (Gatsby Function)
                → Inkeep RAG API (model: inkeep-rag)          (server-side key)
                → normalize: dedupe by path, posthog.com only,
                  type derived from URL path prefix, title/excerpt cleanup

both lists → mergeWithReciprocalRankFusion (score = Σ 1/(60 + rank), dedupe
             by normalized pathname; pages found by both engines rank highest)
           → { results: [{ type, title, url, fragment, excerpt, sources }] }
```

The merged list is only published once both engines have settled (~1.5–2s, dominated by Inkeep) — publishing Algolia first and reranking later made results jump under the cursor. While a query is in flight the hook returns empty results with `loading: true`, so UIs show their loading state instead of stale results. Merged duplicates keep Algolia's title but Inkeep's excerpt (the chunk that actually matched the query). If Algolia keys are missing (common in local dev) the hook degrades to semantic-only, and vice versa if the Inkeep proxy errors.

Both engines keep a session-lived response cache (50 entries, keyed by trimmed query, no TTL — content only changes on deploy), so repeat queries skip the network and the debounce delay entirely. This makes Spotlight's parked-query restore (filter picker), Esc-then-retype, and backspaced prefixes free. Both effects also depend on the *trimmed* query, so whitespace-only edits never refire a fetch.

- **`INKEEP_RAG_API_KEY`** (no `GATSBY_` prefix — must never reach the client bundle) is required by the proxy. It's an Inkeep **API-type** integration key, not the widget key (`GATSBY_INKEEP_API_KEY`). Locally: export it in your shell (e.g. via `.envrc`) before `pnpm start`; Gatsby Functions are served by the dev server at `localhost:8001/api/search`.
- Expect ~1.5–2s per query from Inkeep; the UI shows a loading state (skeletons in the modal, "Searching…" in SearchUI) whenever a query is in flight.
- Result `type` (docs, blog, tutorial, question, …) is derived from URL path prefixes in `typeForPath.ts` (shared by `src/api/search.ts` and the Algolia side of `useHybridSearch.ts`), mirroring the slug regexes in `gatsby/algoliaConfig.js`, and powers the filter tabs client-side.
- Analytics: both engines fire `web search result clicked`; the hybrid path adds `searchEngine: 'hybrid'` plus `searchSources` (which engine(s) surfaced the clicked result) for comparison.

## Files

- `useSearchMode.ts` – the user's engine preference (keyword by default, semantic via the Spotlight toggle action), localStorage-persisted and window-event-synced; shared by all search surfaces
- `useHybridSearch.ts` – Algolia + Inkeep in parallel, RRF merge; the hook hybrid UIs consume
- `typeForPath.ts` – pathname → category type mapping, shared by the proxy and the Algolia normalizer
- `useInkeepSearch.ts` – debounced fetch hook for the proxy, composed by `useHybridSearch.ts`
- `SearchContext.tsx` – legacy modal: state, keyboard shortcuts, engine selection
- `SearchResults.tsx` – legacy modal Algolia UI (exports `categories`, shared by both engines)
- `SemanticSearchResults.tsx` – legacy modal semantic UI (same layout: results list, preview pane, filter tabs)
- `SearchBox.tsx`, `SidebarSearchBox.tsx`, `InlineSearch.tsx` – other entry points (still Algolia-only)

**Note:** on the 9000 branch, the primary search surface is `components/SpotlightSearch` (the fixed glass overlay opened by `Cmd+K` via `openSearch()` in `src/context/App.tsx`), *not* the modal in this folder. It consumes `useHybridSearch` directly, selecting the engine from `useSearchMode`: Algolia-only (`{ semantic: false }`) by default, semantic-only (`{ keyword: false }`) when the user has toggled semantic mode via the Spotlight "Switch to semantic search" action. `components/SearchUI` remains as the websiteMode taskbar search dropdown, gating between its Algolia `Search` component and `SearchUI/SemanticSearch.tsx` — those two are intentional twins; when one engine wins, delete the loser.
