# SpotlightSearch

The site-wide search overlay, opened with `Cmd/Ctrl+K` or `/` (via `openSearch()` in `src/context/App.tsx`). A macOS Spotlight-style rounded glass searchbar, fixed in the upper third of the viewport — it replaces the old draggable `WindowSearchUI` floating window on the searchinator-9000 branch.

## Status: design only

Results are **hardcoded mock data** (`mockResults` in `index.tsx`), filtered by naive substring matching so typing feels real. When the design settles, swap `filterResults` for `useHybridSearch` (`components/Search/useHybridSearch.ts`) — see `components/Search/README.md` for the engine architecture. The `initialFilter` param accepted by `openSearch()` is currently ignored by this component.

## Behavior

- Rendered by `AppProvider` (after `{children}`) in desktop mode only; `websiteMode` keeps its taskbar search dropdown.
- `Cmd/Ctrl+K` toggles, `Esc` clears the query first, then closes. Click outside closes.
- `↑`/`↓` move the selection (wraps across groups), `↵` opens the selected result in a new window, `⇧↵` (or the Ask AI button) hands the query to Max chat (`openNewChat`).
- Collapsed (empty query) it's just the bar, Spotlight-style; results expand the same glass panel below a divider, grouped by content type with a keyboard-hint footer.

## Styling notes

- Glass: `bg-primary/60 backdrop-blur-2xl` — scheme tokens are defined with `<alpha-value>` so the translucency adapts to light/dark automatically; the `ring-white/10` inset ring is the macOS-style inner edge highlight.
- The panel is a `@container`; the per-result URL column hides below `@md`.
- No backdrop dim, matching macOS Spotlight.
