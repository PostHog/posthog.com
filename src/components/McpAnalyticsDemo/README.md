# McpAnalyticsDemo

The 8-bit "MCP analytics" video as a player. A canvas draws every frame from the frame number alone, and Web Audio plays the sound cues and music on the same clock.

```tsx
<McpAnalyticsDemo className="max-w-4xl" />
```

- Fills its container at 16:9. `className` is the only prop.
- Renders a static placeholder on the server. `Video.tsx` (and with it the engine) loads after mount, and sound files load on the first Play.
- Pauses when the tab is hidden.
- Keys while the player has focus: `Space` play/pause, `F` fullscreen, `←`/`→` seek 5 seconds, `,`/`.` step one frame.

## Files

| File | Role |
| --- | --- |
| `timeline.js` | The script: scenes, chapters, sound cues, and music. Edit this to change the video. |
| `engine.js` | `renderFrame(n, canvas)`, a pure function of the frame number. |
| `scenes.js`, `level2.js`, `level3.js`, `level4.js`, `endgame.js` | Scene renderers. |
| `sprites.js`, `font.js`, `palette.js`, `fx.js`, `ui.js` | Drawing helpers. |
| `player.ts` | `Player`: frame counter, animation loop, seek, speed, mute, audio scheduling. |
| `index.tsx` | `McpAnalyticsDemo`: the server-safe placeholder that loads `Video` after mount. |
| `Video.tsx` | The React view over `Player`: canvas, controls, scrubber, chapters. |
| `PlayOverlay.tsx` | The play button drawn over the placeholder and over a paused video. |

Sound files are in `static/mcp-analytics-demo/sfx` and `static/mcp-analytics-demo/music`. They are the files `timeline.js` references.
