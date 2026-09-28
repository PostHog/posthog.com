---
title: Linking Twelve Labs as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TwelveLabs
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Twelve Labs connector syncs your video understanding library into the PostHog Data Warehouse: indexes, video indexing tasks, and the indexed videos themselves. Use it to analyze your indexing activity and video catalog alongside your product data.

## Prerequisites

You need a Twelve Labs account with an API key.

## Adding a data source

<SourceSetupIntro />

When linking Twelve Labs, you'll need:

- **API key** – create one in your [Twelve Labs dashboard](https://playground.twelvelabs.io/dashboard/api-key). It starts with `tlk_`.

## Sync modes

<SyncModes />

The `indexes` and `tasks` tables support incremental sync using their `updated_at` and `created_at` timestamps. The `videos` table is full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your Twelve Labs API key may be invalid or revoked. Generate a new key in your Twelve Labs dashboard, then reconnect.

<TroubleshootingLink />
