# TypecaastPlayer

Thin wrapper around [`@typecaast/react`](https://www.npmjs.com/package/@typecaast/react) for embedding Typecaast conversation scripts (Slack/Cursor/etc. simulations) across posthog.com. Use it instead of importing `Typecaast` directly so every embed shares the same theme handling, sizing, and isolation defaults.

## Why a wrapper?

Pages like the homepage hero render several Typecaast instances. Without a wrapper each call site repeats the same boilerplate: read the site theme via `useApp`, derive `isDark`, set `autoplay`, set `isolate`, and apply `overflow-hidden rounded` inside a sized flex box. `TypecaastPlayer` centralizes all of that, so call sites only pass the script and a height.

## Usage

```tsx
import TypecaastPlayer from 'components/TypecaastPlayer'
import slackBrokenLink from '../../../data/typecaast/slack-broken-link.json'

<TypecaastPlayer config={slackBrokenLink} height="h-96" />
```

Scripts live in [`src/data/typecaast/`](../../data/typecaast/) as exported `typecaast.json` files.

## Props

`TypecaastPlayer` accepts every [`@typecaast/react`](https://www.npmjs.com/package/@typecaast/react) prop (forwarded via `...rest`), plus:

| Prop        | Type             | Default   | Notes |
| ----------- | ---------------- | --------- | ----- |
| `config`    | `TypecaastConfig`| —         | **Required.** The imported `typecaast.json` script. |
| `height`    | `string`         | `'h-96'`  | Tailwind height utility for the sizing box. |
| `className` | `string`         | `''`      | Extra classes on the **player element**, merged after `overflow-hidden rounded` (e.g. `border border-primary`). |
| `containerClassName` | `string` | `''`      | Extra classes on the outer `flex {height}` container. |
| `theme`     | `'light' \| 'dark'` | site setting | Override the auto-derived theme. |
| `autoplay`  | `boolean`        | `true`    | Forwarded to Typecaast. |
| `isolate`   | `boolean`        | `true`    | Shadow-DOM isolation — keeps the page's global `.prose`/Tailwind styles from leaking into the widget. |
| `playWhenInView` | `boolean`   | `true`    | Hold the animation at frame 0 until the player is fully scrolled into view **within its window panel** (see Notes). Set false to play immediately on mount. |
| `inViewThreshold` | `number`   | `0.99`    | Visible fraction that counts as "in view" (≈ fully). Lower it if the player is taller than the window's content area. |

Other useful forwarded props: `loop`, `rate`, `paused`, `composer`, `label`, `onPlay`, `onPause`, `onEnded`, and a `ref` exposing imperative controls (`play`/`pause`/`seek`).

## Notes

- **Play-when-in-view**: by default the player holds at frame 0 (via Typecaast's controlled `paused`) until it's scrolled fully into view, so an animation never plays out of sight. Uses `useInView` from `react-intersection-observer` with `triggerOnce` (once in view, it plays and won't re-pause on scroll-out). Disable with `playWhenInView={false}`.
- **SSR**: Typecaast renders a correctly-sized box on the server and hydrates its visuals in, so no client-only guard is required. The package's `'use client'` banner is a directive webpack ignores under Gatsby (a harmless build warning).
- **Many instances / performance**: skins are code-split per `config.meta.skin.id`, so multiple embeds don't each bundle the renderer. Off-screen players also stay paused thanks to play-when-in-view, so they don't burn animation frames before they're seen.
- **`isolate`** defaults on because posthog.com pages carry heavy global styles. Pass `isolate={false}` only for an embed that needs to inherit page styles.

## Dependencies

- `@typecaast/react` (npm package) — and its `@typecaast/*` siblings, which are excluded from the `minimumReleaseAge` rule in [`pnpm-workspace.yaml`](../../../pnpm-workspace.yaml).
- [`context/App`](../../context/App.tsx) — for the active light/dark theme.
