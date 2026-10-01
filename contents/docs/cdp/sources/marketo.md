---
title: Linking Marketo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Marketo
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Marketo connector syncs leads, activities, activity types, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect Adobe Marketo Engage to pull your leads, activities, campaigns, and program assets.

In Marketo, open **Admin → Web Services** for your Munchkin account ID, then **Admin → LaunchPoint** to create a custom service and copy its client ID and secret. The service's API role needs read access to leads, activities, campaigns, and assets.

Leads and activities come through Marketo's Bulk Extract API, so the first sync backfills from the start date you set below.

You'll be asked for:

- **Munchkin account ID**: for example `123-ABC-456`.
- **Client ID**
- **Client secret**

## Sync modes

<SyncModes />

All Marketo tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the client secret is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
