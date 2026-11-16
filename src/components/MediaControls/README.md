# MediaControls

The scrub bar and control bar for the site's video players. `components/MediaPlayer` (Wistia and YouTube, for example `/demo` and the changelog videos) and Learn TV (`components/Learn/LearnTV/Player.tsx`) both render it, so the two players look and behave the same.

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

- **Scrubbing:** while the pointer drags the scrubber, the time shows the drag position. `onSeek` runs once, on release.
- **Keyboard:** with the scrubber focused, the arrow keys seek 5 seconds back or forward, and Home and End go to the start and the end. Each key calls `onSeek` at once.
- **±10 seconds:** the back and forward buttons call `onSeek(currentTime ∓ 10)`. The player clamps the time.
- **Captions:** the CC button shows only when you pass `captions`. It has `aria-pressed`.
- **Accessibility:** every control is a native button or range input with an `aria-label`. The scrubber has an `aria-valuetext` such as "1:05 of 4:23".

## Styles

The scrubber and the volume slider use the `quicktime-scrubber` and `volume-slider` classes in `src/styles/global.css`. The colors are theme tokens only (`bg-primary`, `bg-accent`, `border-primary`).

`formatTime(seconds)` is exported for other parts of a player, for example a transcript.
