# ContextWarehouseCatalog

Shared layered catalog of PostHog context warehouse capabilities (data sources, modeling, and tools).

## Usage

```tsx
import { CatalogLayers } from 'components/ContextWarehouseCatalog'

<CatalogLayers />
```

## Where it's used

- `/self-driving` – "Everything lives in your context warehouse"

## Notes

- Item URLs point at `/warehouse` and `/data-pipelines`.
- Odd-count sections span the last item across both columns at `@xl/reader-content` so the grid background doesn't show an empty cell.
