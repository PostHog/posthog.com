---
title: Linking Cursor as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Cursor
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Cursor connector syncs members, daily usage, usage events, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

You need a Cursor team with access to the [Admin API](https://cursor.com/docs/account/teams/admin-api) and an API key created by a team admin.

Business teams with Admin API access can sync member, usage, and spend data. This does not include access to the [Analytics API](https://cursor.com/docs/account/teams/analytics-api), which requires a Cursor Enterprise plan. Analytics tables are off by default in PostHog. Enable them only if your team has access.

[AI code tracking tables](https://cursor.com/docs/account/teams/ai-code-tracking-api) also require AI code tracking to be enabled for your Enterprise team. Check the requirements in [Supported tables](#supported-tables) before enabling additional tables.

## Adding a data source

<SourceSetupIntro />

Enter your Cursor Admin API key to automatically pull your team's Cursor usage and spend data.

A team admin can create an API key in the [Cursor dashboard](https://cursor.com/dashboard) under **API Keys**.

You'll be asked for:

- **Admin API key**: for example `key_...`.

## Sync modes

<SyncModes />

Tables such as `members` and `spend` support full refresh only. Each sync replaces the contents of the table.

Time-series tables, such as `daily_usage`, `usage_events`, and analytics tables, also support incremental syncs using a date or timestamp field. See [Supported tables](#supported-tables) for each table's sync modes and incremental field.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, check the API key and your team's API access. Analytics tables require an Enterprise plan. If your team doesn't have access, turn those tables off and continue syncing the Admin API tables your team can access.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
