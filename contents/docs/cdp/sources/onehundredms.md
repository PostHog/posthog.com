---
title: Linking 100ms as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: OneHundredMs
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The 100ms connector syncs your video conferencing data – sessions, recordings, and live streams – into the PostHog data warehouse, so you can analyze call activity alongside your product data.

## Prerequisites

You need a [100ms](https://www.100ms.live/) account with access to the Developer section of your [100ms dashboard](https://dashboard.100ms.live/). You'll need an app access key and app secret to authenticate.

## Adding a data source

<SourceSetupIntro />

When linking 100ms, you'll need:

- **App access key** – find it in the **Developer** section of your [100ms dashboard](https://dashboard.100ms.live/).
- **App secret** – find it in the same **Developer** section, alongside the app access key.

## Sync behavior

Only **completed sessions** are imported. Active (in-progress) sessions are excluded until they finish.

The sessions table uses a 24-hour lookback window for incremental sync. This re-reads recent sessions to catch calls that were still in progress when the previous sync ran. Older corrections require a full refresh.

Recordings and live streams use full refresh only, since the 100ms API doesn't provide time-bound filters for these endpoints.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authentication error, check that your app access key and app secret are correct and haven't been rotated in your [100ms dashboard](https://dashboard.100ms.live/).
- If you get a permission error, verify that your credentials have read access to the workspace.

<TroubleshootingLink />
