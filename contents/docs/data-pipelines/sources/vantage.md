---
title: Linking Vantage as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Vantage
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Vantage connector syncs cost reports, budgets, folders, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Vantage API access token to pull your Vantage FinOps data.

Create a read-scoped access token or a service token from your [Vantage settings](https://console.vantage.sh/settings/access_tokens). Only the `read` scope is required for imports.

You'll be asked for:

- **API access token**: for example `vntg_tkn_...`.

## Sync modes

<SyncModes />

All Vantage tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Working with forecasted costs

<CalloutBox icon="IconWarning" title="Avoid double-counting forecast amounts" type="caution">

The `forecasted_costs` table contains both overall totals (where `provider = 'all'` and `service = 'all'`) and detailed provider/service breakdowns for the same dates. Summing the `amount` column without filtering counts spend twice.

To get overall report totals, filter to `provider = 'all'` AND `service = 'all'`.

</CalloutBox>

## Troubleshooting

- If the connection fails with an authorization error, the API access token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
