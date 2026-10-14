# FactorySign

A factory-floor sign for the changelog. It shows how long it has been since a hand-crafted (not agent-assisted) feature shipped, with a seven-segment ticker that counts days, hours, minutes, and seconds.

## Usage

```tsx
import FactorySign from 'components/Changelog/FactorySign'

<FactorySign since="2026-10-08T09:12:00.000Z" />
```

## Props

| Prop | Type | Description |
|---|---|---|
| `since` | `string` | ISO timestamp the ticker counts up from |

## Data

`src/templates/Changelog.tsx` calculates `since` from the roadmap `tags` field:

- The changelog bot tags each published entry with `ai-coded` or `artisanally-coded`.
- `since` is the `publishedAt` of the most recent `artisanally-coded` entry.
- Before the first `artisanally-coded` entry ships, `since` is the earliest tagged entry.
- If no entry is tagged, the page does not show the sign.

## Notes

- The sign colors do not change between light and dark mode, because the sign is a physical object. They come from the `tailwind.config.js` tokens (`red`, `yellow`, `green-2`, `black`, `white`).
- The ticker renders dashes on the server and on the first client render. It starts to count after mount, so hydration stays safe.
- The digits are inline SVG, so no font loads. Unlit segments stay faintly visible, like a real LED display.
- The ticker has `role="timer"` and screen-reader text. A timer is not a live region, so screen readers do not announce each second.
- The layout uses container queries (`@md`, `@xl`), so it fits narrow and wide windows.
