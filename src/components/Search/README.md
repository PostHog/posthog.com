# Search

Site-wide search modal, opened with `/`, `Cmd/Ctrl+K`, or programmatically via `useSearch().open()`.

## Two search engines (feature-flagged)

`SearchContext.tsx` renders one of two result components inside the modal, gated by the PostHog feature flag **`website-semantic-search`**. For local dev (posthog-js doesn't load without `GATSBY_POSTHOG_API_KEY`, so flags never evaluate) and QA, there's a localStorage escape hatch:

```js
localStorage.setItem('website-semantic-search', 'true') // undo with localStorage.removeItem(...)
```

| Flag state | Component | Engine |
|---|---|---|
| off (default) | `SearchResults.tsx` | Algolia InstantSearch (`react-instantsearch-hooks-web`), browser-direct with the public search key. Index is built at deploy time by `gatsby/algoliaConfig.js`. |
| on | `SemanticSearchResults.tsx` | Inkeep RAG semantic search via the `/api/search` proxy (`src/api/search.ts`), debounced (400ms, min 3 chars) through `useInkeepSearch.ts`. |

## Semantic search flow

```
keystroke → useInkeepSearch (debounce 400ms, AbortController)
          → POST /api/search { query }                  (Gatsby Function)
          → Inkeep RAG API (model: inkeep-rag)          (server-side key)
          → normalize: dedupe by path, posthog.com only,
            type derived from URL path prefix, title/excerpt cleanup
          → { results: [{ type, title, url, fragment, excerpt }] }
```

- **`INKEEP_RAG_API_KEY`** (no `GATSBY_` prefix — must never reach the client bundle) is required by the proxy. It's an Inkeep **API-type** integration key, not the widget key (`GATSBY_INKEEP_API_KEY`). Locally: export it in your shell (e.g. via `.envrc`) before `pnpm start`; Gatsby Functions are served by the dev server at `localhost:8001/api/search`.
- Expect ~1.5–2s per query from Inkeep; the UI keeps previous results visible while loading and shows skeletons only on first load.
- Result `type` (docs, blog, tutorial, question, …) is derived from URL path prefixes in `src/api/search.ts`, mirroring the slug regexes in `gatsby/algoliaConfig.js`, and powers the filter tabs client-side.
- Analytics: both engines fire `web search result clicked`; the semantic path adds `searchEngine: 'inkeep-rag'` for comparison.

## Files

- `SearchContext.tsx` – modal state, keyboard shortcuts, engine selection
- `SearchResults.tsx` – Algolia UI (exports `categories`, shared by both engines)
- `SemanticSearchResults.tsx` – semantic UI (same layout: results list, preview pane, filter tabs)
- `useInkeepSearch.ts` – debounced fetch hook for the proxy
- `SearchBox.tsx`, `SidebarSearchBox.tsx`, `InlineSearch.tsx` – other entry points (still Algolia-only)
