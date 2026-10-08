# ContextWarehouseCatalog

Shared layered catalog of PostHog context warehouse capabilities (data sources, modeling, and tools).

## Usage

```tsx
import { CatalogLayers } from 'components/ContextWarehouseCatalog'

<CatalogLayers />
```

## Where it's used

- `/context-warehouse` – "What's in your context warehouse"
- `/self-driving` – "Everything lives in your context warehouse"

## Notes

- Item URLs use `/context-warehouse/...` paths (`/data-stack/...` redirects there).
- Odd-count sections span the last item across both columns at `@xl/reader-content` so the grid background doesn't show an empty cell.
