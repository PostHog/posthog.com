---
title: Linking US Treasury Fiscal Data as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: UsTreasuryFiscalData
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The US Treasury Fiscal Data connector syncs exchange rates, average interest rates, and federal debt totals into the PostHog data warehouse, so you can analyze them alongside your product data.

Data comes from the [US Treasury Fiscal Data API](https://fiscaldata.treasury.gov/api-documentation/), a free public service that requires no API key or account.

## Prerequisites

None. The US Treasury Fiscal Data API is public and requires no authentication.

## Adding a data source

<SourceSetupIntro />

Because this is a public API, there are no credentials or configuration fields to fill in. Select the tables you want to sync and choose your sync mode.

## Sync modes

<SyncModes />

All US Treasury Fiscal Data tables support both incremental and full refresh sync modes.

- **Incremental sync** fetches rows where the incremental field is on or after the last synced date. The incremental field is `effective_date` for `rates_of_exchange` and `record_date` for the other tables.

- **Full refresh** re-downloads all rows each sync.

> **Note:** The Treasury API does not expose a modification timestamp. If historical rows are corrected before your last synced date, those corrections won't appear in incremental syncs. Run a full refresh to pick up historical corrections.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If a sync fails with an access error, the Treasury API may be temporarily unavailable. Wait a few minutes and try again.
- If a table syncs no rows, verify the table name is correct and the Treasury API is reachable at [fiscaldata.treasury.gov](https://fiscaldata.treasury.gov/).
- If you suspect historical data has been corrected, run a full refresh to re-download all rows.

<TroubleshootingLink />
