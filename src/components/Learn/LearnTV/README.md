# Learn TV

The Learn video window. Each video opens in its own Learn TV modal window, the same as the `/demo` video. `/learn/videos`, a product hub's Videos page, and the hub overview all link to it with `VideoCard`.

The video plays from Wistia in the site's `MediaPlayer`. Its captions and the transcript come from the captions uploaded to the same Wistia media, so the repo has no video or caption files.

## Files

| File | Contents |
| --- | --- |
| `index.tsx` | `LearnTV`: the Learn TV window body. A visually hidden `h1` with the video title, `MediaPlayer` with captions, the details with Up next, and the transcript |
| `Transcript.tsx` | The transcript list. Each line is a button that plays from that line |
| `wistiaCaptions.ts` | `useWistiaCaptions` loads and parses a Wistia media's English WebVTT captions. Also `wistiaCaptionsUrl`, `parseVtt`, and `activeLineIds` |
| `LearnTVPage.tsx` | `LearnTVPage`: the page for one video, by `slug`. It sets the SEO tags and the window title ("Learn TV") |
| `videos.ts` | `LEARN_VIDEOS`, the list of videos, and the `learnVideoUrl` and `learnVideoBySlug` helpers |
| `VideoLibrary.tsx` | The `/learn/videos` grid, grouped by product with the same heading as the prompt library (product icon and color) |
| `VideoCard.tsx` | A poster card that opens the Learn TV window. Pass `to` to link somewhere else |

## Add a video

1. Compress the MP4 and upload it to Wistia. The first video uses HandBrake: 1920×1080, constant 30 fps, H.264 (x264, Slow preset), 630 kbps two-pass, and AAC 128 kbps stereo. That is about 24 MB for 4:24.
2. Upload the English captions (WebVTT or SRT) to the same Wistia media. Do not edit the caption text. Keep the frame rate and the frame count of the edit, or the captions go out of sync. Do not add caption files to the repo.
3. Add the video to `LEARN_VIDEOS` in `videos.ts`: the Wistia media ID, and a 16:9 card image (upload it to Cloudinary) as `poster`. If the previous video's `next` has no `url`, add one.
4. Add `src/pages/learn/videos/<slug>.tsx`, which renders `<LearnTVPage slug="<slug>" />`.
5. If the product's Learn hub has no Videos page yet, add `'videos'` to that volume's `learnHub.pages` in `src/constants/pocketGuides.ts`. Then add `src/pages/learn/<product>/videos.tsx`, which renders `LearnVideosPage` (in `components/Learn`) with the product's handle, name, and intro line. The hub overview then shows the product's first video in its Watch the lesson section.

`src/context/App.tsx` builds a window entry for each video in `LEARN_VIDEOS`, so a new video needs no window entry.

## Captions and transcript

- `LearnTV` renders `MediaPlayer` with `source="wistia"` and `captions`. Wistia shows its captions on the video, on by default, and `MediaPlayer` adds a CC toggle with `aria-pressed`. Caption style (font, size, background) comes from the Wistia player, not from the site's CSS.
- `useWistiaCaptions` fetches the English captions from Wistia (`fast.wistia.net/embed/captions/<id>.vtt`, served with CORS for any origin) and parses them. The transcript and the captions read the same Wistia file, so they always match.
- `MediaPlayer` reports the position with `onTimeUpdate`. The transcript highlights every cue that is on screen at that time, and keeps the current line in view inside its own box, without scrolling the page.
- Each transcript line is a button. It calls `playFrom` on the `MediaPlayer` ref, which seeks and plays.
- If the captions do not load, the transcript says so. The video still plays.

## Window

Each video's window uses `LEARN_TV_WINDOW` in `src/context/App.tsx`: a standard modal, 960×1000, with the toolbar on. `LearnTVPage` sets the toolbar title to "Learn TV". The video title is not shown. It is the window's `h1` for screen readers only.

`AppWindow` normally wraps every `/learn/*` page in `LearnShell`. A Learn page with a `modal` window entry skips the shell and opens as a modal, like `/demo`.
