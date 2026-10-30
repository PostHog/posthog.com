---
title: Linking Gridly as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Gridly
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Gridly connector syncs a view's records and columns into PostHog, so you can analyze your Gridly data alongside your product data.

## Prerequisites

You need a Gridly API key (Owner or Admin access is required to create one) and the View ID of the view you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Gridly, you'll need:

- **API key** – create an API key in your Gridly company settings under **Settings → API keys** (Owner or Admin access is required). Use a **Full Access** or **Read-only** key.
- **View ID** – find it in Gridly by opening your grid, selecting a view, and opening the **API** panel. It looks like `v1v9jwwk1lwnkz`. For the default Master branch this is the same as the Grid ID.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
