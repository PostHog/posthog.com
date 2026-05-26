# ProductGalaxy

A 3D force-directed view of how PostHog products relate to one another, styled as a 1998-vintage sci-fi HUD. Mounted by `/products/galaxy`.

## Files

| File                       | Role                                                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `index.tsx`                | Orchestrator. Owns layout, mounting, ResizeObserver for the canvas, and wires children together.                                       |
| `useGalaxyState.ts`        | Hook that builds the graph, parses/syncs `?using=` query param, exposes fleet (`selected`) and `hovered` state, and `recommend()` suggestions. Clicking a node toggles fleet membership; there is no separate "locked target" concept. |
| `graph.ts`                 | Pure functions: `buildGraph()` (dedupe + adjacency), `recommend()` (scoring), and their result types (`ProductGraph`, `GalaxyEdge`, `Suggestion`). Reads `productEdges` from `hooks/productData/relationships.ts`.                       |
| `GalaxyCanvas.tsx`         | Client-only Three.js scene rendered by `react-force-graph-3d`. Imports `three` at module top level — do NOT import this file directly. |
| `GalaxyCanvas.lazy.tsx`    | SSR-safe wrapper using `React.lazy` + `typeof window` guard. Always import this, never the raw `GalaxyCanvas`.                         |
| `nodeMesh.ts`              | Builds the per-node `THREE.Group` (wireframe icosahedron, inner glow, label sprite, highlight ring). Client-only.                      |
| `colors.ts`                | Maps PostHog color tokens to hex values mirroring `tailwind.config.js`. Shared by JSX (via Tailwind classes) and the WebGL meshes.     |
| `Starfield.tsx`            | Pure-CSS twinkling starfield behind the canvas. Deterministic placement so SSR/CSR markup matches.                                     |
| `HUD.tsx`                  | Top overlay with monospace stats (nodes / links / fleet / hover target).                                                               |
| `FleetPanel.tsx`           | Right-rail panel. Lists fleet members plus a merged "Where to go next" view that surfaces every pairsWith description connecting each recommendation to the fleet. |
| `SelectionTray.tsx`        | Left-rail chip list — "products I use." Same toggle semantics as clicking a node on the graph.                                         |
| `SSRFallback.tsx`          | Crawlable text fallback (always in the DOM). Becomes `sr-only` after the canvas mounts so it stays for SEO and no-JS.                  |

## Data flow

```
hooks/productData/relationships.ts ──► graph.ts ──► useGalaxyState ──► ProductGalaxy
   (productEdges, handles, types)     (buildGraph,      (state)              ↓
                                       recommend)                    useProducts (icons, colors, descriptions)
                                                                             ↓
                                                  GalaxyCanvas.lazy ──► GalaxyCanvas ──► nodeMesh / three.js
```

All relationship data is read from `src/hooks/productData/relationships.ts`. To change which products connect, edit `productEdges` in that file. Galaxy-specific graph construction and scoring live in `graph.ts` here.

## Query parameter

```
/products/galaxy?using=product_analytics,session_replay
```

Accepts canonical handles OR kebab-case slugs from `relationships.ts → SLUG_ALIASES`. Unknown tokens are dropped silently.

## Aesthetic tokens

- Scanline overlay over the canvas (`mix-blend-screen`, ~5 % opacity green stripes).
- Wireframe `IcosahedronGeometry` nodes coloured per product (see `colors.ts`).
- `text-accent` + `font-mono` + `tracking-widest` + uppercase for all HUD copy.
- Edges: `pairsWith` solid accent, `billedWith` / `sharesFreeTier` directional with arrowhead in amber. (`worksWith` is deprecated and not rendered — see `relationships.ts`.)
- `prefers-reduced-motion`: simulation freezes after `cooldownTicks` regardless; particle animation on `pairsWith` is gentle enough to keep on.

## Adding / removing nodes

The graph mirrors `MAIN_PRODUCT_HANDLES` in `relationships.ts`. Adding a new node requires:

1. Add the product to `initialProducts` in `src/hooks/useProducts.tsx` (or skip if it's already there).
2. Add its handle to `MAIN_PRODUCT_HANDLES`.
3. Add slug ↔ handle mapping to `SLUG_ALIASES` and `HANDLE_TO_SLUG`.
4. Add edges to `productEdges`.

## SSR considerations

- `GalaxyCanvas.tsx` imports `three` and `react-force-graph-3d` synchronously. Never import it from a server-evaluated path. Always go through `GalaxyCanvas.lazy.tsx`.
- `nodeMesh.ts` is client-only for the same reason. It's only imported inside `GalaxyCanvas.tsx`.
- The page itself is registered in `gatsby-page-creator` automatically via its location at `src/pages/products/galaxy/index.tsx` — no `gatsby-node.ts` change required.
