---
title: Linking SmartReach as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SmartReach
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The SmartReach connector syncs your sales engagement data into the PostHog Data warehouse, so you can analyze your prospects and outreach campaigns alongside your product data.

## Prerequisites

You need a SmartReach account with access to your API key.

## Adding a data source

<SourceSetupIntro />

When linking SmartReach, you'll need:

- **API key** – find it under **Settings → Integrations** in the [SmartReach app](https://app.smartreach.io/). The key is scoped to your user and grants read access to your prospects and campaigns.

## Sync modes

<SyncModes />

This source is full-refresh only. Every table is fully re-synced on each run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Generate a new key under **Settings → Integrations** in the SmartReach app, then reconnect.
- If you see a permissions error, the key does not have access to this data. Check the key's permissions, then reconnect.

<TroubleshootingLink />
