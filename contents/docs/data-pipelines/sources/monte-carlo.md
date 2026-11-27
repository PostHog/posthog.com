---
title: Linking Monte Carlo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: MonteCarlo
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

Connect your [Monte Carlo](https://www.montecarlodata.com/) account to pull your data observability history – alerts, monitors, observed tables, users, warehouse connections, authorization groups, group membership, roles, daily monitor credit usage, data products, and monitor change history – into the PostHog Data Warehouse. This is useful for building data quality scorecards and correlating data incidents with downstream product impact.

## Prerequisites

You need a Monte Carlo account with permission to create API keys.

## Adding a data source

<SourceSetupIntro />

To connect Monte Carlo, you need an API key:

1. In your Monte Carlo dashboard, go to **Settings** → **API** → **Keys** and click **Create Key**.
2. Choose a description and an expiration for the key, then create it.
3. Copy both the **key ID** and the **key secret**. The secret is only shown once.
4. Back in PostHog, enter the key ID and key secret, then click **Next**.

Monte Carlo API keys expire on the date you chose when creating them. When a key expires, syncs stop with an authentication error and you need to create a new key and update the source.

## Sync modes

<SyncModes />

The `alerts` table supports incremental syncing on `createdTime` (new alerts) or `updatedTime` (new alerts plus status changes on existing ones). The initial sync only pulls the last 365 days of alerts.

The `billing_monitor_usage` table supports incremental sync on `date`. Its initial sync pulls the last 365 days. Incremental syncs re-read two days before the last synced date because daily credit usage can continue to change.

The `dbt_test_results`, `events`, `fh_events`, and `job_executions` tables also support incremental sync. All remaining tables, including `authorization_group_members`, `authorization_groups`, `data_products`, `monitor_audit_logs`, and `roles`, use full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If syncs fail with an authentication error, your API key has likely expired or been revoked. Create a new key in Monte Carlo under **Settings** → **API** → **Keys** and update the source credentials in PostHog.

<TroubleshootingLink />
