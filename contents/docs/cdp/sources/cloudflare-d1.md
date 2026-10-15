---
title: Linking Cloudflare D1 as a source
sidebar: Docs
showTitle: true
availability: { free: full, selfServe: full, enterprise: full }
sourceId: CloudflareD1
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Cloudflare D1 connector syncs the tables and views of a D1 database into PostHog, so you can query your Workers app data next to your product analytics.

## Prerequisites

- A Cloudflare account with at least one D1 database.
- Permission to create an API token for that account.

## Adding a data source

<SourceSetupIntro />

You need three values:

1. **API token**: in the [Cloudflare dashboard](https://dash.cloudflare.com/profile/api-tokens), click **Create Token**, then **Create Custom Token**. Add the **Account** > **D1** > **Read** permission and pick the account that holds the database.
2. **Account ID**: shown on the account's overview page and in the URL of the dashboard.
3. **Database ID**: go to **Storage & Databases** > **D1**, open the database, and copy its ID.

PostHog only runs read queries against your database.

## Sync modes

<SyncModes />

Incremental syncs are available on integer, real, date, and datetime columns.
Keep dates in one column in one format, in UTC. PostHog writes the sync position in that format, so the comparison can use an index on the column.
Rows where the incremental column is empty are skipped in incremental syncs. Use a full refresh if you need them.

Each page is one query against your database, and every query counts toward Cloudflare's API rate limit of 1,200 requests every five minutes per token.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

PostHog lists every table and view in the database except D1's internal `_cf_` tables.

## Troubleshooting

- **"Cloudflare rejected your API token"**: the token is wrong, expired, or revoked. Create a new one with D1 read permission.
- **"Cloudflare couldn't find that D1 database"**: check the account ID and database ID. The database must belong to the account the token can read.
- **"The incremental column no longer exists"**: the column was dropped or renamed. Pick another incremental column in the table's settings.

<TroubleshootingLink />
