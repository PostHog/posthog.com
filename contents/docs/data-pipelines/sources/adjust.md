---
title: Linking Adjust as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Adjust
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Adjust connector syncs performance reports, retention cohorts, SKAdNetwork data, in-app event metrics, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Adjust API token to pull aggregated attribution and performance reports.

Find your API token in the Adjust dashboard under your account menu > Account settings. The token needs reporting access to the apps you want to import. Leave app tokens blank to import every app the token can read, or enter a comma-separated list to narrow it down.

Adjust's Report Service API returns metrics aggregated per day, so these tables are daily time series rather than user-level events. Raw user-level data needs server callbacks or a cloud storage upload, which can't be set up through the API.

You'll be asked for:

- **API token**

## Sync modes

<SyncModes />

All Adjust report tables use **incremental** sync on the `day` field. Each sync re-reads a trailing lookback window to pick up late-arriving attributions, then deduplicates on merge:

- **Most report tables** – 3-day lookback
- **`retention_report`** – 31-day lookback (cohort metrics keep changing until the d30 window elapses)
- **`skad_report`** – 35-day lookback (SKAdNetwork postbacks have privacy delays of up to ~5 weeks)

The `events` catalog table uses **full refresh** – the whole table is reloaded on every sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
