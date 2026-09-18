---
title: Linking ClickHouse Cloud as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ClickhouseCloud
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The ClickHouse Cloud connector syncs your organization's data from the [ClickHouse Cloud API](https://clickhouse.com/docs/cloud/manage/api/swagger) – daily usage costs, service inventory, backups, members, API keys, and the audit log – into PostHog, so you can build cost, chargeback, and capacity dashboards alongside your product data.

This connector reads from ClickHouse Cloud's management API. To sync data stored *inside* a ClickHouse database, use the [ClickHouse source](/docs/cdp/sources/clickhouse) instead.

## Prerequisites

You need a ClickHouse Cloud organization and an API key. Generate one in the [ClickHouse Cloud console](https://console.clickhouse.cloud/) under your organization's **API keys** settings. Keys with the **Admin** role can read every table; a **Developer**-scoped key may not have access to the usage cost and audit log tables.

## Adding a data source

<SourceSetupIntro />

When linking ClickHouse Cloud, you'll need:

- **API key ID** – the key ID generated in the ClickHouse Cloud console.
- **API key secret** – the secret shown once when the key is created.

## Sync modes

<SyncModes />

The `usage_cost` table supports incremental sync on `date`. ClickHouse restates recent cost records until it locks them, so each incremental run re-pulls a trailing window and updates restated rows in place.

The `activities` table (the organization audit log) supports incremental sync on `createdAt`.

The remaining tables are full-refresh snapshots of your organization's current state.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If syncs fail with a permissions error, check the role on your API key in the ClickHouse Cloud console – usage cost and audit log data may require the **Admin** role.

<TroubleshootingLink />
