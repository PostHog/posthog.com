---
title: Linking SpeedCurve as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Speedcurve
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The SpeedCurve connector syncs your synthetic monitoring data and real user monitoring (RUM) exports into the PostHog Data Warehouse. This lets you correlate web performance with product usage and ship speed.

## Prerequisites

- A SpeedCurve account with at least one site configured for synthetic monitoring.
- A SpeedCurve API key. Find it in SpeedCurve under **Admin > Teams**. An organization admin can access this page.
- To sync RUM data, select **Enable RUM export API** in your SpeedCurve team's RUM settings. SpeedCurve only generates [RUM export files](https://support.speedcurve.com/reference/export-rum-data) from the time you enable this setting.

## Adding a data source

<SourceSetupIntro />

You need one value to connect:

- **API key**: found under **Admin > Teams** in your SpeedCurve dashboard.

The connector uses SpeedCurve API v1. SpeedCurve's v2 API is still in beta and is not supported.

## Sync modes

<SyncModes />

The `tests` and `deploys` tables support incremental sync using the `timestamp` field (a Unix timestamp in seconds). The `rum_export` table supports incremental sync using `epoch`, also a Unix timestamp in seconds. All other tables are full refresh only.

Incremental sync for `tests` and `deploys` defaults to a 24-hour lookback window. Changes older than 24 hours require a longer lookback or a full refresh to pick up.

The `tests` table covers up to the last 364 days of data. This stays within SpeedCurve's rolling twelve-month API retention limit.

The first sync and full refreshes of `rum_export` read a 30-day window of daily export files. Later incremental syncs read days after the last synced `epoch`. Each file covers one UTC day. The connector starts requesting the previous day's file at 06:00 UTC and skips days without a file.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

### Notes on specific tables

- `tests`: includes queued (status `-2`), failed (status `-1`), and successful (status `0`) results.
- `budgets`: only includes budgets from dashboards visible to the entire team. Private dashboard budgets are excluded.
- `urls`: each row includes the `site_id` of the parent site so you can join URLs back to sites.

## Troubleshooting

- **"SpeedCurve rejected the API key"**: the API key is wrong, expired, or the SpeedCurve account is inactive. Generate a new key under **Admin > Teams** and reconnect.
- **"SpeedCurve denied access"**: the API key doesn't have the right permissions for your team. Check the key's team permissions in SpeedCurve.
- **Missing recent test data**: incremental sync uses a 24-hour lookback by default. If you need older data, increase the lookback window or run a full refresh.
- **No test data beyond 364 days**: SpeedCurve's API only retains roughly twelve months of test data. Older results are not available through the API.
- **Missing RUM data**: Check that **Enable RUM export API** is selected in your SpeedCurve team's RUM settings. Data from before you enabled exports is unavailable. The connector syncs daily files, so today's data isn't available yet.

<TroubleshootingLink />
