---
title: Linking Windmill as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Windmill
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Windmill connector syncs completed jobs, queued jobs, scripts, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Windmill instance URL, workspace ID, and API token to sync your Windmill data.

Create a personal API token in your Windmill account under **User settings → Tokens**. For cloud, your instance URL is `https://app.windmill.dev`; for self-hosted, use your own instance URL.

The audit logs table requires a workspace-admin token and is a Windmill Enterprise Edition feature.

You'll be asked for:

- **Instance URL**: for example `https://app.windmill.dev`.
- **Workspace ID**: for example `my-workspace`.
- **API token**

## Sync modes

<SyncModes />

All Windmill tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
