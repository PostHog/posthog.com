# Pinball

**Hog pinball** is a canvas pinball table at `/sparks-joy/pinball`. The ball is the `HedgehogBall` illustration from `@posthog/brand`. The page is not linked from a menu yet.

## Playing

| Action | Keyboard | Touch |
|---|---|---|
| Pull and release the plunger | Hold and release <kbd>Space</kbd> or <kbd>↓</kbd> | Hold and release **Launch** |
| Left flipper | <kbd>Z</kbd> or <kbd>←</kbd> | Tap the left half of the table, or hold **Left** |
| Right flipper | <kbd>/</kbd> or <kbd>→</kbd> | Tap the right half of the table, or hold **Right** |

The table must have focus to receive keys. A click on the table gives it focus. Game keys do not reach the global site shortcuts while the table has focus.

Each game has three balls. Bumpers give 100 points and slingshots give 10. Each **H**, **O**, and **G** lane at the top gives 250. When all three lanes are lit, the player gets 1,000 points and the bonus multiplier goes up by one, to a maximum of 5x. The multiplier goes back to 1x when a ball drains. The best score is kept in `localStorage` (`pinball-high-score`).

## Files

- `physics.ts` – the table layout and a fixed-step simulation (`createGame`, `launch`, `step`). It has no DOM or React code. All units are table pixels on a 400 × 640 table.
- `index.tsx` – the canvas renderer, the controls, and the score panel. It runs `step` at 480 Hz and draws once per animation frame. The canvas fills its container and the table is scaled to fit, so the window can have any size.
- `physics.test.ts` – run with `node --test src/components/Pinball/physics.test.ts`.

## Analytics

| Event | Properties |
|---|---|
| `pinball_game_started` | – |
| `pinball_game_ended` | `score`, `high_score` (boolean, a new personal best), `duration_seconds` |
