---
title: Linking Clever as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Clever
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Clever connector syncs districts, schools, users, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter the bearer token Clever issued to your app for a district. Find it in your Clever
app dashboard, under that district's **Data Sources** tab in the **API Token** section. See the
[Clever API overview](https://dev.clever.com/docs/api-overview) for details.

Each token is scoped to a single district - connect a separate source per district you want to sync.
Rostering data beyond districts requires the district's Clever Secure Sync (Clever Complete) subscription.

You'll be asked for:

- **District bearer token**

## Sync modes

<SyncModes />

All Clever tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the district bearer token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
