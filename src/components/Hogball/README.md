# Hogball

**Hogball** is a 3D pinball table at `/sparks-joy/hogball`, in the style of the old Windows space pinball games. The table is a [three.js](https://threejs.org) scene with a perspective camera, raised chrome rails, 3D bumpers and flippers, a ramp on the left, lights, and shadows. The ball is the `HedgehogBall` illustration and the panel art is `HedgehogRocket`, both from `@posthog/brand`. The page is not linked from a menu yet.

## Playing

The controls are the same as the original Windows game.

| Action | Keyboard | Mouse | Touch |
|---|---|---|---|
| Left flipper | <kbd>Z</kbd> | Left button | Tap the left half of the table, or hold **Left** |
| Right flipper | <kbd>/</kbd> | Right button | Tap the right half of the table, or hold **Right** |
| Plunger | Hold and release <kbd>Space</kbd> | – | Hold and release **Launch** |
| Bump the table from the left, right, or bottom | <kbd>X</kbd>, <kbd>.</kbd>, <kbd>↑</kbd> | – | – |
| New game | <kbd>F2</kbd> | – | **New game** button |

The table must have focus to receive keys. A click on the table gives it focus. Game keys do not reach the global site shortcuts while the table has focus. When the game is over, <kbd>Space</kbd> also starts a new game.

A table bump moves the ball a little. Three bumps in quick succession **tilt** the table: the flippers stop and nothing scores until the ball drains.

## Scoring

| Feature | Points | Effect |
|---|---|---|
| Bumper | 100 | Every 3 hits add one fuel light, to a maximum of 5 |
| Slingshot | 10 | – |
| **H**, **O**, or **G** lane | 250 | All three lit: 1,000 points and the bonus multiplier goes up by one, to a maximum of 5x |
| Drop target | 500 | All three down: 5,000 points. The targets stand up again after 1.5 seconds |
| Ramp | 2,500 × combo | Adds one fuel light. Another ramp within 5 seconds raises the combo, to a maximum of 5x. The third ramp in a combo is **Hyperspace**: 10,000 more points |
| Launch pad | 1,000 | Holds the ball for 1 to 1.8 seconds, then kicks it up into the bumpers at a random angle. A drain in the next 6 seconds gives the ball back |
| Launch pad with a full fuel tank | 25,000 | Rocket launch: the fuel tank empties |
| Wormhole | 2,500 | The hole above the bumpers. Like the launch pad, it holds the ball, then sends it out of the launch pad or the wormhole at random |
| Mission complete | 20,000 × rank | See [Missions](#missions) |

All points are multiplied by the bonus multiplier. The multiplier goes back to 1x when a ball drains. Each game has three balls, and 150,000 points gives one extra ball. If a ball drains in the first 8 seconds after launch, **ball save** gives it back once. The best score is kept in `localStorage` (`hogball-high-score`), and the sound setting in `hogball-muted`.

## Missions

Like the original game, the LED panel always shows a mission and its progress. A mission is complete when the player does its task, and then the next mission starts. Each two missions give a promotion to the next rank: Cadet, Ensign, Lieutenant, Captain, Lt Commander, Commander, Commodore, Admiral, and Fleet Admiral.

| Mission | Task |
|---|---|
| Target practice | Hit the bumpers 8 times |
| Re-entry training | Light **H**, **O**, and **G** |
| Science | Knock down 6 drop targets |
| Launch training | Shoot the ramp 2 times |
| Rendezvous | Get into the launch pad or the wormhole 2 times |
| Bug hunt | Hit the bumpers 15 times |
| Rescue | Shoot the ramp 3 times |
| Alien menace | Knock down 9 drop targets |

After the last mission, the list starts again from the top.

A slow shot does not get to the top of the ramp. It rolls back down to the playfield. A ball that rolls up into the ramp exit goes up the ramp backwards and scores nothing. Walls close off the low end of the ramp, so the ball cannot roll under it.

## Leaderboard

Each player gets a random hedgehog pilot name, like "Admiral Pincushion", from `names.json`. **New pilot name** picks another one between games. The name is kept in `localStorage` (`hogball-pilot`).

When a game ends with a score that makes the all-time top 10, the game asks for the player's initials, like an arcade machine: three letters from A to Z, then <kbd>Enter</kbd> (<kbd>Esc</kbd> skips). The game sends `hogball_score_submitted` with the score, the initials, and the pilot name, and keeps the initials in `localStorage` (`hogball-initials`) for next time. Players cannot type other text, and the server drops initials in the `blocked` list in `names.json`.

`GET /api/hogball-leaderboard` returns the all-time top 10: the best submitted score for each player, read from those events with a fixed HogQL query. The function drops any entry whose initials or pilot name are not valid, so a fake event cannot put other text on the page. Between games, the LED panel shows the top 6. In a narrow window, a list under the table shows the top 10. A new score shows at once as a pending row, because the event takes a short time to reach PostHog.

The function code is in `api/_hogball-leaderboard.js`. `api/hogball-leaderboard.js` runs it on Vercel and `functions/api/hogball-leaderboard.ts` runs it on Cloudflare Pages previews. It needs these environment variables:

| Variable | Value |
|---|---|
| `HOGBALL_LEADERBOARD_API_KEY` | A PostHog personal API key with only the `query:read` scope |
| `HOGBALL_LEADERBOARD_PROJECT_ID` | The ID of the PostHog project that gets the posthog.com events |
| `HOGBALL_LEADERBOARD_HOST` | Optional. Defaults to `https://us.posthog.com` |

Without the key, the function returns an empty list and the game shows no leaderboard. Scores are not verified on a server, so a player who sends fake events can put a fake score on the board, up to the 5,000,000 point limit.

## Files

- `physics.ts` – the table layout and a fixed-step simulation (`createGame`, `launch`, `bump`, `step`). It has no DOM or React code. All units are table pixels on a flat 400 × 640 table. The ramp is a path with a height at each point (`RAMP_PATH`): on the ramp the ball follows the path, and gravity and the climb slow it down. `step` puts sound names in `game.sounds` for the component to play.
- `scene.ts` – the three.js scene (`createTable`). It puts the flat table on the x–z plane, one table pixel to one scene unit, and builds the rails, slingshots, bumpers, targets, flippers, plunger, ramp, ball, sparks, and the rocket fly-by. The camera moves back until the full table fits the canvas.
- `floor.ts` – the playfield art (space, lights, and labels) on a 2D canvas. The scene uses this canvas as the floor texture and redraws it every frame, so the lights can blink.
- `panel.ts` – the LED score panel at the side when the window is wide, or a short LED strip above the table when the window is narrow.
- `sound.ts` – short synthesized sounds with the Web Audio API, and the rising hum while the plunger is pulled back. There are no audio files.
- `index.tsx` – the controls, the layout, the animation loop, and analytics. It runs `step` at 480 Hz and draws once per animation frame.
- `physics.test.ts` – run with `node --test src/components/Hogball/physics.test.ts`.

## Analytics

| Event | Properties |
|---|---|
| `hogball_game_started` | – |
| `hogball_game_ended` | `score`, `high_score` (boolean, a new personal best), `rockets`, `rank`, `missions`, `player_name`, `duration_seconds` |
