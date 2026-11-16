# Learn TV

The Learn video player. Each video opens in its own Learn TV modal window, the same as the `/demo` video. `/learn/videos`, a product hub's Videos page, and the hub overview all link to it with `VideoCard`.

## Files

| File | Contents |
| --- | --- |
| `Player.tsx` | `LearnTVPlayer`: the `<video>`, its captions track, and the control bar. Its `children` render prop gets the caption cues and `playFrom` |
| `Transcript.tsx` | The transcript list for a `LearnTVPlayer` |
| `index.tsx` | `LearnTV`: the Learn TV window. Its own title bar ("Learn TV" and the centered video title), the player, the details with Up next, and the transcript |
| `videos.ts` | `LEARN_VIDEOS`, the list of videos, and the `learnVideoUrl` and `learnVideoBySlug` helpers |
| `VideoLibrary.tsx` | The `/learn/videos` grid, grouped by product with the same heading as the prompt library (product icon and color) |
| `VideoCard.tsx` | A poster card that opens the Learn TV window. Pass `to` to link somewhere else |
| `learnTV.css` | The `::cue` caption style |

## Add a video

1. Upload the MP4 to Cloudinary. Do not commit video files.
2. Put the WebVTT captions in `static/learn/videos/<slug>.en.vtt`. Do not edit the caption text. Add the SRT next to it if you have one.
3. Add the video to `LEARN_VIDEOS` in `videos.ts`. If the previous video's `next` has no `url`, add one.
4. Add `src/pages/learn/videos/<slug>.tsx`. Copy `aio-traces.tsx`.
5. If the product has a Learn hub, add `'videos'` to that volume's `learnHub.pages` in `src/constants/pocketGuides.ts` and add `src/pages/learn/<product>/videos.tsx`. Copy the AI Observability page: a header, a divider, and a `VideoCard` per video.
6. Add a `/learn/videos/<slug>` window entry in `src/context/App.tsx`. Copy the `aio-traces` entry.

## Video hosting

The MP4 is on Cloudinary. The poster is a frame of the same video (`so_2,f_jpg`). The captions are served from the site's own origin, so the `<track>` needs no CORS setup.

## Captions and transcript

- The video has one `<track kind="captions" srclang="en" label="English" default>`. The captions are not burned into the video.
- The CC button sets the track mode to `showing` or `hidden`. Captions are on by default, the same as `WistiaCustomPlayer`.
- The transcript reads the cues from the same `TextTrack`, so it always matches the captions. It updates on `cuechange`, also when captions are hidden. Each line is a button that seeks to its time. The current line has `aria-current`, and the transcript box scrolls to keep it in view, without scrolling the page.
- Some cues overlap on purpose, for example a sound tag inside a spoken line. The transcript lists cues by start time and highlights every active cue.

## Caption style

`learnTV.css` sets `::cue` to RoundHog (from `Layout/Fonts.css`) with the `font-rounded` fallback, white text, and an 80% black background. It sets no font size, because browsers scale cues with the player.

Safari only partly supports `::cue`. Its system caption preferences override these styles, so users' own settings still win.

## Controls

The control bar copies the layout and styles of `components/MediaPlayer` (`quicktime-scrubber`, `volume-slider`, `IconPlayhead`, `ZoomHover`), but `MediaPlayer` plays only Wistia and YouTube. Learn TV adds a CC button and labels every control for screen readers. Every control is a native button or range input, so it works with the keyboard.

## Window

The window entry turns the toolbar off, so `LearnTV` draws its own title bar with the video title centered next to "Learn TV". `AppWindow` puts the close button at the top right.


`AppWindow` normally wraps every `/learn/*` page in `LearnShell`. A Learn page with a `modal` window entry skips the shell and opens as a modal, like `/demo`.
