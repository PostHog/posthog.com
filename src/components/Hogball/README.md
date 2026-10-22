# Hogball

**Hogball** is a canvas pinball table at `/sparks-joy/hogball`, in the style of the old Windows space pinball games. The table is drawn at an angle, so it looks tilted toward the player. The ball is the `HedgehogBall` illustration and the panel art is `HedgehogRocket`, both from `@posthog/brand`. The page is not linked from a menu yet.

## Playing

| Action | Keyboard | Touch |
|---|---|---|
| Pull and release the plunger | Hold and release <kbd>Space</kbd> or <kbd>↓</kbd> | Hold and release **Launch** |
| Left flipper | <kbd>Z</kbd> or <kbd>←</kbd> | Tap the left half of the table, or hold **Left** |
| Right flipper | <kbd>/</kbd> or <kbd>→</kbd> | Tap the right half of the table, or hold **Right** |

The table must have focus to receive keys. A click on the table gives it focus. Game keys do not reach the global site shortcuts while the table has focus. When the game is over, <kbd>Space</kbd> starts a new game.

## Scoring

| Feature | Points | Effect |
|---|---|---|
| Bumper | 100 | Every 3 hits add one fuel light, to a maximum of 5 |
| Slingshot | 10 | – |
| **H**, **O**, or **G** lane | 250 | All three lit: 1,000 points and the bonus multiplier goes up by one, to a maximum of 5x |
| Drop target | 500 | All three down: 5,000 points. The targets stand up again after 1.5 seconds |
| Launch pad | 1,000 | Holds the ball for 1.2 seconds, then kicks it out |
| Launch pad with a full fuel tank | 25,000 | Rocket launch: the rank goes up (Cadet to Admiral) and the fuel tank empties |

All points are multiplied by the bonus multiplier. The multiplier goes back to 1x when a ball drains. Each game has three balls. The best score is kept in `localStorage` (`hogball-high-score`), and the sound setting in `hogball-muted`.

## Files

- `physics.ts` – the table layout and a fixed-step simulation (`createGame`, `launch`, `step`). It has no DOM or React code. All units are table pixels on a 400 × 640 table. `step` puts sound names in `game.sounds` for the component to play.
- `render.ts` – all canvas drawing. `drawTable` draws the flat table to an offscreen canvas, and `drawTilted` copies it row by row into the visible canvas, each row a little narrower toward the top. `drawPanel` draws the LED panel at the side when the window is wide. `drawStrip` draws a short LED strip above the table when the window is narrow.
- `sound.ts` – short synthesized sounds with the Web Audio API. There are no audio files.
- `index.tsx` – the controls, the animation loop, and analytics. It runs `step` at 480 Hz and draws once per animation frame. The canvas fills its container and the layout scales to fit.
- `physics.test.ts` – run with `node --test src/components/Hogball/physics.test.ts`.

## Analytics

| Event | Properties |
|---|---|
| `hogball_game_started` | – |
| `hogball_game_ended` | `score`, `high_score` (boolean, a new personal best), `rockets`, `rank`, `duration_seconds` |
