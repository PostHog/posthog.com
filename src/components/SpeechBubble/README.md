# SpeechBubble

A speech bubble for a hedgehog or another speaker. It is a squared, bordered box with a small tail that points at the speaker. It follows the theme through the `bg-primary`, `border-primary`, and `text-primary` tokens.

## Usage

```tsx
import SpeechBubble from 'components/SpeechBubble'

// The speaker is below the bubble.
<SpeechBubble className="px-3 py-2 text-sm">Sorry, don't mind me</SpeechBubble>

// The speaker is to the left of the bubble.
<SpeechBubble tail="left" className="px-1 py-1 text-xs text-center">We're going on an adventure!</SpeechBubble>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | | The text, or any content, such as a link |
| `tail` | `'bottom' \| 'left' \| 'right'` | `'bottom'` | The side the tail is on, which is the side the speaker is on |
| `className` | `string` | `''` | Padding, width, and text styles. The component sets no padding of its own |

The bubble does not position itself. Place it with a wrapper, and animate the wrapper if the bubble must appear or move.

## Used by

- `components/Docs/QuestLog.tsx`: the docs quest log guide
- `components/MCPLeaderboard/CampfireHog.tsx`: the campfire hog easter egg on `/mcp/leaderboard`
