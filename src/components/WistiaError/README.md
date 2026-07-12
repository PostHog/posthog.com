# WistiaError

Shared fallback UI shown when a Wistia embed fails to load. Replaces the
eternal loading spinner the embeds used to show when Wistia's script was
blocked (common with ad blockers) or the player never reported ready.

## Why this exists

`MediaPlayer`, `WistiaVideo`, and `WistiaCustomPlayer` all embed Wistia videos
by loading `E-v1.js` and waiting for the player to become ready. When that
never happens there was previously no timeout, error state, or way to recover –
the container just spun forever. This component is the recoverable error state
those players fall back to, paired with the [`useWistiaPlayer`](../../hooks/useWistiaPlayer.ts)
hook which owns the loading/timeout/retry/telemetry logic.

## Usage

Render it as an overlay when `useWistiaPlayer` reports `status === 'error'`:

```tsx
import useWistiaPlayer from 'hooks/useWistiaPlayer'
import WistiaError from 'components/WistiaError'

const { status, scriptLoaded, attempt, markReady, retry } = useWistiaPlayer({
    videoId,
    component: 'MediaPlayer',
})

// ...initialize the player once `scriptLoaded` is true, calling `markReady()`
// from the player's onReady handler...

return (
    <div className="relative">
        <div ref={containerRef} />
        {status === 'error' && <WistiaError videoId={videoId} onRetry={retry} />}
    </div>
)
```

The parent must be positioned (`relative`) because `WistiaError` renders as an
absolutely-positioned overlay filling its container.

## Props

| Prop        | Type         | Description                                                       |
| ----------- | ------------ | ----------------------------------------------------------------- |
| `videoId`   | `string`     | Wistia media ID, used to build the "Watch the video" direct link. |
| `onRetry`   | `() => void` | Called when the user clicks "Try again" (wire to `retry`).        |
| `className` | `string`     | Optional extra classes for the overlay.                           |
