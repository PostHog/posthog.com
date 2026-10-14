# FactorySign

A factory-floor sign for the changelog. It shows how many days it has been since a human-coded PR shipped, with a seven-segment display. The visible wording matches the changelog card's "A human coded this" sticker and "Human-coded" metadata label.

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

- The changelog bot tags each published entry with `ai-coded` or `human-coded`.
- `since` is the `publishedAt` of the most recent `human-coded` entry.
- The sign stays hidden in production until the first `human-coded` entry ships.
- If no entry is tagged, the page does not show the sign.

## Notes

- The sign colors do not change between light and dark mode, because the sign is a physical object. Its orange, yellow, and green come from `@posthog/brand/colors`.
- The sign uses the `@posthog/brand` RoundHog font already available on the website.
- The ticker renders dashes on the server and on the first client render. It starts to count after mount, so hydration stays safe.
- The digits are inline SVG, so no font loads. Unlit segments stay faintly visible, like a real LED display.
- The ticker has `role="timer"` and screen-reader text. A timer is not a live region, so screen readers do not announce each second.
- The sign is the final column after the newest changelog week. Its width fits the available space in narrow windows.
- The days display sits beside its label in the orange section. The white section completes the timer's sentence in two lines. The smaller shipping line sits in a solid yellow bottom section.
- A striped band caps the top. Four rivets sit at equal insets from the sign's outer corners, clear of the text.
