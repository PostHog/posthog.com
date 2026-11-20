# SpotTheHog

**Spot the Hog** is a find-the-suspect game. A wanted poster shows one hedgehog. The player finds that hog in a pile of look-alikes and clicks it.

It lives at `/sparks-joy/spot-the-hog` (`src/pages/sparks-joy/spot-the-hog/index.tsx`). It is listed with the other games in `src/data/sparksJoyItems.tsx`.

## Playing

- A round has four kinds of hog. One hog on the board is the suspect. All the other hogs are one of the three other kinds.
- **Daily hog**: one board per UTC calendar day, the same for every player in every time zone. After the arrest, **Copy result** copies a short brag line.
- **Endless**: level 1 has 81 hogs in 9 columns. Each level adds a column, up to 16 columns and 272 hogs. Each board uses a new random seed. **New crowd** swaps the board for another one at the same level.
- In levels 1 and 2, the four kinds have different skins, such as Spiderhog and Robohog. In levels 3 and 4, they share one skin and have four different hats. From level 5, there are two skins and two hats: one kind of innocent hog has the suspect's skin, and another has the suspect's hat, so the player must check both. The daily board is level 5, with 182 hogs.
- A wrong click adds 3 seconds.
- **Hint** dims the three quarters of the board without the suspect until the round ends. It adds 5 seconds.
- **Easter egg**: one innocent hog in the bottom row wears the PostHog logo. In Endless, a click on it takes 10 seconds off the clock, once per board. In Daily it only shows a message, because the daily result is shared. The game does not mention it.

## Implementation

`generator.ts` is pure TypeScript with no React or DOM, so `pnpm test:spot-the-hog` runs it with `node --test`.

- `generateBoard(seed, level, options)` builds a board from a seed with a small seeded PRNG (mulberry32). The same seed always builds the same board.
- Hogs sit in rows that overlap, like a pile of stickers. Each row covers the bodies of the row above it, so every head stays in view. No hog is easier or harder to see than its neighbors.
- A click lands on a hog's body, which is an ellipse (`BODY`). The tests check that a click on any hog's head always lands on that hog, on 700 boards.
- Positions and sizes are percentages of a 4:3 board, so the board works at any window size.

`index.tsx` owns the UI. It loads `@posthog/hedgehog-mode` with a dynamic import on the client, because the package includes pixi.js, which does not render on the server.

- The skin and hat lists come from that package (`HedgehogActorSkinOptions`, `HedgehogActorAccessories`), and its `StaticHedgehog` draws every hog. No new art is used, and no sprite logic is copied.
- Every hog has a `<button>` over its body, so the game works with a keyboard. The labels are numbers only, so a screen reader does not give the suspect away.
- The crowd is memoized, so the 100 ms timer does not render it again.
- The logo is never mirrored or rotated, as the brand rules ask.
- Confetti is sized to the board, and is off for players who ask for reduced motion.
- Nothing is stored between visits.
