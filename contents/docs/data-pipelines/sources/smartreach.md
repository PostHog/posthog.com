---
title: Linking SmartReach as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Smartreach
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The SmartReach connector syncs your sales engagement data into the PostHog Data warehouse, so you can analyze your prospects, outreach campaigns, campaign results, and team members alongside your product data.

## Prerequisites

You need a SmartReach account with access to your API key and your team ID.

## Adding a data source

<SourceSetupIntro />

When linking SmartReach, you'll need:

- **API key** – find it under **Settings → Integrations** in the [SmartReach app](https://app.smartreach.io/). The key is scoped to your user and grants read access to your prospects, campaigns, teams, and users.
- **Team ID** – required by the current SmartReach API. Find it in your SmartReach team settings.
- **Team ID** – required for new connections. Find it in your SmartReach team settings. It starts with `team_`.

## Sync modes

<SyncModes />

This source is full-refresh only. Every table is fully re-synced on each run.

The `campaign_prospects` and `campaign_stats` tables are read one campaign at a time. If a sync stops, the next run continues after the last campaign that finished.

The `campaign_prospects`, `campaign_stats`, `teams`, and `users` tables are only available on SmartReach API v3. A source that uses API v1 lists only `prospects` and `campaigns`.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Generate a new key under **Settings → Integrations** in the SmartReach app, then reconnect.
- If you see a permissions error, the key does not have access to this data. Check the key's permissions, then reconnect.

<TroubleshootingLink />
