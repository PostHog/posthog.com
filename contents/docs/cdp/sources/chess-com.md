---
title: Linking Chess.com as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ChessCom
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Chess.com connector syncs games and ratings from Chess.com players into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

No API key required. Chess.com publishes this data publicly without authentication.

## Adding a data source

<SourceSetupIntro />

Import game history and ratings from Chess.com. The tables identify each player by an opaque key — they hold no username, game link, opponent name, or moves. This supports team-level analysis rather than per-person analysis.

You'll be asked for:

- **Chess.com usernames** - A comma or newline-separated list of up to 50 Chess.com usernames. For example: `hikaru, magnuscarlsen`.

After you add a username, resync the `games` table to load that player's earlier games.

## Sync modes

<SyncModes />

- **games** - Supports incremental sync on `end_time`. Each sync fetches new games since the last sync. Chess.com serves games in monthly archives, so an incremental sync skips months before the last synced game.

- **ratings** - Full refresh. Each sync replaces the contents of the table with current ratings.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

### games

One row for each finished game of a listed Chess.com player.

| Column            | Description                                                                          |
| ----------------- | ------------------------------------------------------------------------------------ |
| `player_key`      | Opaque key of the player. The username is not stored.                                |
| `game_key`        | Opaque key of the game. The game URL is not stored.                                  |
| `end_time`        | Date and time the game ended.                                                        |
| `time_class`      | Speed of the game: daily, rapid, blitz, or bullet.                                   |
| `time_control`    | Time control in PGN format, such as `600` or `180+2`.                                |
| `rules`           | Variant of the game. Standard chess is `chess`.                                      |
| `rated`           | Whether the game changed the players' ratings.                                       |
| `color`           | Color the player had: white or black.                                                |
| `outcome`         | Result for the player: win, draw, or loss.                                           |
| `result`          | Chess.com result code for the player, such as win, checkmated, resigned, or timeout. |
| `rating`          | Rating of the player after the game.                                                 |
| `opponent_rating` | Rating of the opponent after the game.                                               |
| `accuracy`        | Accuracy score of the player, when Chess.com analyzed the game.                      |

### ratings

One row per listed player and game speed, with the current rating and record.

| Column          | Description                                           |
| --------------- | ----------------------------------------------------- |
| `player_key`    | Opaque key of the player. The username is not stored. |
| `time_class`    | Speed of the games: daily, rapid, blitz, or bullet.   |
| `rating`        | Current rating.                                       |
| `best_rating`   | Highest rating the player reached.                    |
| `wins`          | Number of games won.                                  |
| `losses`        | Number of games lost.                                 |
| `draws`         | Number of games drawn.                                |
| `last_rated_at` | Date and time of the last rated game.                 |

## Troubleshooting

- If a username doesn't exist on Chess.com, the sync logs a warning for that player and continues with the others. The credentials check validates each username before the first sync.

- The list is limited to 50 usernames. If you need to sync more players, create multiple sources.

- After adding a username to an existing source, resync the `games` table to load that player's earlier games. The table has one sync position for all players.

- Requests are sent serially because Chess.com rate-limits parallel requests. Syncs may take longer for sources with many players.

<TroubleshootingLink />
