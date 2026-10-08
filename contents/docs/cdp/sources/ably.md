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
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Ably connector syncs your app's aggregated usage statistics — message volumes, connection counts, channel activity, and API request metrics — into PostHog, so you can analyze your realtime infrastructure alongside your product data.

## Prerequisites

You need an Ably account with an **app API key** that has permission to read stats. API keys are created per-app in the [Ably dashboard](https://ably.com/dashboard) and follow the format `app-id.key-id:key-secret`.

## Adding a data source

<SourceSetupIntro />

When linking Ably, you'll need:

- **API key** – your Ably app API key, including both the key ID and secret (e.g. `xVLyHw.XXXXXX:1234567890abcdef`). Create or find this in the [Ably dashboard](https://ably.com/dashboard) under your app's **API Keys** tab.
- **Stats granularity** – the time interval for aggregated stats: `minute`, `hour` (default), `day`, or `month`.

## Getting your API key

1. Log in to the [Ably dashboard](https://ably.com/dashboard).
2. Select the app you want to sync stats from.
3. Go to the **API Keys** tab.
4. Copy an existing key or create a new one. The key must include both parts: `app-id.key-id:key-secret`.
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

- **Authorization errors** – your API key is invalid, revoked, or missing the secret portion. Keys must be the full `app-id.key-id:key-secret` string. Generate a new key in the [Ably dashboard](https://ably.com/dashboard) and update the source credentials.
- **Empty results** – check that the app has had traffic in the selected granularity window. A newly created app with no messages or connections won't have any stats to sync.
- **Wrong granularity** – the stats granularity (`minute`, `hour`, `day`, `month`) is set when you link the source. To change it, update the source configuration and run a full refresh.

<TroubleshootingLink />
