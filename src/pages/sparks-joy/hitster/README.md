# Hitster (tech history edition)

A single-device, pass-and-play timeline guessing game, playable at
[`/sparks-joy/hitster`](https://posthog.com/sparks-joy/hitster). It's inspired by
the card game [Hitster](https://hitstergame.com/), reworked so it reads like a
mobile app inside a posthog.com window.

## Why this exists

The real Hitster streams copyrighted songs via Spotify and asks players to place
each track on a timeline by release year. Replicating that here would mean music
licensing and Spotify auth. Instead, this edition swaps songs for **well-known,
verifiable moments from tech and internet history** (e.g. "The first iPhone is
released", "PostHog is founded"). Same core loop, no licensing, and on-brand for
a developer audience.

## How the game works

1. **Setup** – pick 1–6 players, name them, and choose how many cards it takes to
   win (4, 7, or 10). Each player is seeded with one random card as their timeline
   anchor.
2. **A turn** – a card is drawn with its **year hidden**. The active player taps an
   insertion slot on their own timeline (before the earliest card, between two
   cards, or after the latest) and confirms.
3. **Reveal** – the year is shown. If it fits the chosen slot the card is added to
   that player's timeline; otherwise it's discarded and the correct spot is shown
   in green.
4. **Winning** – first player to reach the card target wins. Solo play is a
   high-score run. If the deck empties first, the longest timeline wins.

A placement counts as correct when the card's year is **≥ the left neighbor and ≤
the right neighbor** (inclusive), so cards sharing a year can sit on either side —
matching Hitster's "same year is fine" rule.

## Files

| File | Responsibility |
|------|----------------|
| `index.tsx` | Page entry + all UI/state. Wraps the game in `<Explorer template="generic" fullScreen>` (the same pattern the other `/sparks-joy` games use) and constrains it to a phone-width column so it reads as a mobile app at any window size. |
| `data.ts` | The `DECK` of history cards, per-category card colors, and pure game-logic helpers (`shuffle`, `insertAt`, `isPlacementCorrect`, `correctSlot`). |

## Design notes

- **No `App.tsx` change needed.** Like the other sparks-joy games, this renders
  inside `<Explorer>` and does not register its own window dimensions.
- **Responsive via container queries.** The UI lives inside Explorer's `@container`
  and uses a `max-w-[26rem]` column, so it stays phone-shaped whether the window is
  tiny or maximized.
- **Colors** come from `tailwind.config.js` tokens (applied inline as hex, since the
  category → color mapping is dynamic and would otherwise be purged by Tailwind's
  JIT). They're chosen to keep white card text legible.

## Extending the deck

Add entries to `DECK` in `data.ts`. Keep years to **widely documented public
milestones** and, when a company/product has both a "founded" and "launched" date,
phrase the card so it names the event that matches the year. Ties on year are
handled automatically.
