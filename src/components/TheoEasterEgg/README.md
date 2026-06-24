# TheoEasterEgg

Easter egg for visitors arriving from Theo's (t3.gg) YouTube channel via the `/theo` redirect, which lands on the homepage with `?theo` in the query string (plus the usual influencer UTM params — see `vercel.json`).

## Behavior

1. When the homepage URL contains a `theo` query param, a greeting popup slides in at the bottom right (same position as toasts, `z-50`). Otherwise the component renders nothing.
2. Clicking the popup:
   - Opens the PostHog FM tape deck (`<TapePlayer />`) in a new window, loaded with the "Sk8er Boi" mixtape (Squeak CMS mixtape `27`). Playback autostarts with sound — the click counts as the user gesture browsers require for unmuted autoplay.
   - Switches on "Theo mode": a handful of Theo tweet cards (styled after `components/Tweet`, not real X embeds) scattered across the desktop background, portaled into the desktop container (`[data-app="Desktop"]`) so they sit above the wallpaper but below all windows.
3. The ✕ button dismisses the popup without any of the above.
4. While Theo mode is active, an "Exit Theo mode" button sits top-center; clicking it tears down the background, widgets, and cursor trail and returns the page to normal.

State is local and per-pageload; there is no persistence.

## Usage

Rendered by the homepage (`src/components/Home/Test/index.tsx`). It self-detects the query param, so it can be safely rendered unconditionally.

```tsx
<TheoEasterEgg />
```

## Updating

- **Tweets:** `TWEETS` holds real Theo tweets (verbatim quotes with dates) shown on the background cards.
- **Avatar:** `THEO_AVATAR` is Theo's X profile picture, hosted on Cloudinary. Re-upload and update the URL if he changes it.
- **Placement:** `SPRINKLES` controls position and rotation of each background card.
- **Mixtape:** `THEO_MIXTAPE_ID` points at the Squeak CMS mixtape to play.

Note: this is unrelated to the blog's `theoMode` (clutter-free reading mode) in `src/components/Layout/context.tsx`, which shares the name and origin story but not the implementation.
