# AppsList

Renders the PostHog product "apps" as a compact, multi-column list of icon links.

The list is derived from the docs navigation (`docsMenu` in `src/navs/index.js`), so it stays in sync with the products that exist in docs without a separate hand-maintained list.

## What counts as an app

An entry is included when it:

- is a top-level docs section with a `/docs/...` URL, and
- is not a surface (Slack, MCP, or PostHog Code; Web is excluded automatically because it isn't a `/docs/` URL), and
- is not a non-product section (`Start here`, `Platform`, `Reference`, and the legacy `Self-driving` / `Product OS` names).

Feature-flag-gated products are hidden until their flag resolves, via `useActiveFeatureFlags` + `filterMenuByFlags`. During SSR (flags `null`) gated items are hidden (fails closed).

## Usage

```tsx
import { AppsList } from 'components/Docs/AppsList'

<AppsList />
```

It renders only the grid of links, so provide your own heading and intro copy around it. Used on:

- the docs landing page (`src/pages/docs/index.tsx`), under the "Apps" heading
- the self-driving "Web app" surface page (`contents/docs/start-here/web.mdx`), under "Your apps"

## Props

| Prop        | Type     | Default | Description                                  |
| ----------- | -------- | ------- | -------------------------------------------- |
| `className` | `string` | `''`    | Extra classes appended to the grid wrapper.  |

## Notes

- Uses project color tokens only (`text-primary`, plus per-product tokens like `text-blue`). The dynamic `text-${color}` classes mirror the pattern already used elsewhere and rely on those tokens being safelisted.
- Layout uses `@container` queries (`@md`, `@2xl`), so it reflows correctly inside resizable app windows.
