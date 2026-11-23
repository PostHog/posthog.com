# MediaPlayer

The site's video player for YouTube and Wistia videos, with its own control bar. Pages such as `/demo`, the changelog videos, `/research`, and Learn TV use it.

## Props

| Prop | Default | Description |
| --- | --- | --- |
| `videoId` | – | The YouTube video ID or the Wistia media ID |
| `source` | `'youtube'` | `'youtube'` or `'wistia'` |
| `startTime` | `0` | Seconds to start at |
| `borderRadius` | `true` | Set `false` for a square Wistia player |
| `captions` | `false` | Wistia only. Shows the captions uploaded to the Wistia media, on by default, and adds a CC toggle to the control bar |
| `onTimeUpdate` | – | Called with the playback position in seconds, for example to follow along in a transcript |

Pages that do not pass `captions` or `onTimeUpdate` do not change.

## Ref

`MediaPlayer` forwards a ref of type `MediaPlayerHandle`:

```tsx
const player = useRef<MediaPlayerHandle>(null)

<MediaPlayer ref={player} videoId="p092lqjim8" source="wistia" captions onTimeUpdate={setTime} />

player.current?.playFrom(120) // seek to 2:00 and play
```

Learn TV uses the ref and `onTimeUpdate` for its transcript (`components/Learn/LearnTV`).
