---
title: Linking Ably as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Ably
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Ably connector syncs your app's aggregated usage statistics — message volumes, connection counts, channel activity, and API request metrics — into PostHog, so you can analyze your realtime infrastructure alongside your product data.

## Prerequisites

You need an Ably account with an **app API key** that has the `stats` [capability](https://ably.com/docs/auth/capabilities). The key always needs `stats`, because PostHog calls Ably's stats endpoint to check the key when you link the source. API keys are created per-app in the [Ably dashboard](https://ably.com/dashboard) and follow the format `app-id.key-id:key-secret`.

## Adding a data source

<SourceSetupIntro />

When linking Ably, you'll need:

- **API key** – your Ably app API key, including both the key ID and secret (e.g. `xVLyHw.XXXXXX:1234567890abcdef`). Create or find this in the [Ably dashboard](https://ably.com/dashboard) under your app's **API Keys** tab.
- **Stats granularity** – the time interval for aggregated stats: `minute`, `hour` (default), `day`, or `month`.

## Getting your API key

1. Log in to the [Ably dashboard](https://ably.com/dashboard).
2. Select the app you want to sync stats from.
3. Go to the **API Keys** tab.
4. Copy an existing key or create a new one. The key must include both parts: `app-id.key-id:key-secret`, and it must have the `stats` capability.
5. Paste the full key into PostHog when linking the source.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync modes

<SyncModes />

The `Stats` table supports incremental sync on `interval_start_ms`. When using incremental sync, each run picks up where the last one left off, fetching only new time intervals. Full refresh is also available if you prefer to reload all stats each sync.

| Table   | Sync methods                   |
| ------- | ------------------------------ |
| `Stats` | Incremental sync, full refresh |

## Troubleshooting

- **Rejected API key** – when you link the source, PostHog shows "Ably rejected your API key. Check that you copied the whole key and that it has the `stats` capability, then reconnect." Ably refused the key when PostHog used it to read stats. The key is invalid or revoked, or it doesn't have the `stats` capability. PostHog doesn't retry this check and doesn't save the source. To see a key's capabilities, open the **API Keys** tab in the [Ably dashboard](https://ably.com/dashboard) and click **Settings** for the key. Use a key with the `stats` capability, then link the source again. See Ably's [capabilities docs](https://ably.com/docs/auth/capabilities) for more.
- **Incomplete API key** – PostHog shows "Your Ably API key is incomplete. Copy the whole key from your Ably dashboard, including the part after the colon." The key has no secret after the colon, so PostHog doesn't send it to Ably. Copy the full `app-id.key-id:key-secret` string from the [Ably dashboard](https://ably.com/dashboard), then link the source again.
- **Empty results** – check that the app has had traffic in the selected granularity window. A newly created app with no messages or connections won't have any stats to sync.
- **Wrong granularity** – the stats granularity (`minute`, `hour`, `day`, `month`) is set when you link the source. To change it, update the source configuration and run a full refresh.

<TroubleshootingLink />
