# MediaControls

The scrub bar and control bar of the site's video player, `components/MediaPlayer`. Every `MediaPlayer` page renders it: Wistia and YouTube videos, for example `/demo`, the changelog videos, and Learn TV.

## Usage

The player owns playback. It passes its state and callbacks:

```tsx
<MediaControls
    currentTime={currentTime}
    duration={duration}
    isPlaying={isPlaying}
    volume={volume} // 0–100
    isMuted={isMuted}
    playbackRate={playbackRate}
    onSeek={(time) => seek(time)}
    onTogglePlay={togglePlay}
    onToggleMute={toggleMute}
    onVolumeChange={(volume) => setVolume(volume)} // 0–100
    onPlaybackRateChange={(rate) => setRate(rate)}
    onFullscreen={toggleFullscreen}
    captions={{ on: captionsOn, onToggle: () => setCaptionsOn((on) => !on) }} // optional
/>
```

Place it inside an `@container` element. In a narrow player, the volume slider and the speed menu are hidden.

## Behavior

- **Scrubbing:** while the pointer drags the scrubber, the time shows the drag position. `onSeek` runs once, on release. The release can be anywhere on the page: the component listens on the window. Only the main mouse button drags, so a right-click does not start a scrub.
- **Keyboard and screen readers:** with the scrubber focused, the arrow keys seek 5 seconds back or forward, and Home and End go to the start and the end. A screen reader's increment or decrement (for example a VoiceOver swipe) also seeks 5 seconds. Page Up and Page Down keep the browser's larger jump. Keys do nothing until the player knows the duration.
- **±10 seconds:** the back and forward buttons call `onSeek(currentTime ∓ 10)`.
- **Clamping:** `onSeek` can get a time below 0 or past the end. The player clamps it.
- **Captions:** the CC button shows only when you pass `captions`. It has `aria-pressed`.
- **Accessibility:** every control is a native button or range input with an `aria-label`. The scrubber has an `aria-valuetext` such as "1:05 of 4:23".

## Styles

The scrubber and the volume slider use the `quicktime-scrubber` and `volume-slider` classes in `src/styles/global.css`. The colors are theme tokens only (`bg-primary`, `bg-accent`, `border-primary`).

`formatTime(seconds)` is exported for other parts of a player, for example a transcript.
