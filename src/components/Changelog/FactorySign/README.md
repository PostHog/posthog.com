# FactorySign

A factory-floor sign for the changelog. It shows how many days it has been since a human-coded PR shipped, with a seven-segment display. The visible wording matches the changelog card's "A human coded this" sticker.

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
- The reviewed human-coded attribution is [Redshift short-lived credentials for batch exports](/changelog?id=2967), published August 28, 2026 at 08:53:36.911 UTC. Its linked [PR #76745](https://github.com/PostHog/posthog/pull/76745) is by Tomás Farías Santana, who describes Claude's involvement as: "Nothing beyond checking with claude why was mypy rejecting my type hints."
- `isHumanCoded` recognizes that PR URL while its CMS entry is untagged, so its week row and open panel receive the existing foil treatment and "A human coded this" starburst. An explicit `ai-coded` tag takes precedence.
- The sign uses the most recent human-coded entry's `publishedAt`, including this reviewed attribution. If that entry is absent from the page data, its publication timestamp is the baseline. Later human-coded entries replace it automatically.

## Notes

- The sign colors do not change between light and dark mode, because the sign is a physical object. Its orange, yellow, and green come from `@posthog/brand/colors`.
- The sign uses the `@posthog/brand` RoundHog font already available on the website.
- The ticker renders dashes on the server and on the first client render. It starts to count after mount, so hydration stays safe. It schedules its next update for the next displayed day.
- The digits are inline SVG, so no font loads. Unlit segments stay faintly visible, like a real LED display.
- The ticker has `role="timer"` and screen-reader text. A timer is not a live region, so screen readers do not announce each second.
- The sign is the final column after the newest changelog week. Its width fits the available space in narrow windows.
- In short windows, the poster keeps enough height for its text and scrolls inside its column.
- The days display sits beside its label in the orange section. The white section completes the timer's sentence in two lines. The smaller shipping line sits in a solid yellow bottom section.
- A striped band caps the top. Four rivets sit at equal insets from the sign's outer corners, clear of the text.
