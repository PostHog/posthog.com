---
title: Linking AppLovin as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AppLovin
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The AppLovin connector syncs MAX mediation revenue, per-user ad revenue, campaign data, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

- **Report Key** (required) - For syncing report tables. Find it in the AppLovin dashboard under your account menu > **Keys**.
- **Campaign Management API key** and **Account ID** (optional) - For syncing campaign tables. AppLovin issues this key separately from the Report Key. Find both under your account menu in the AppLovin dashboard.

## Adding a data source

<SourceSetupIntro />

Connect your AppLovin account to pull MAX mediation revenue, per-user ad revenue, campaign spend, and cohort reporting.

Find your **Report Key** in the AppLovin dashboard: click your account in the top right, then **Keys**.

To sync campaigns, creative sets, and campaign operation logs, also add your **Campaign Management API key** (under **Keys**) and your **Account ID** (under **Go to settings**, the number after your account name).

AppLovin only serves the last 45 days of report data and the last 30 days of campaign operation logs, so anything older than that can't be backfilled.

You'll be asked for:

- **Report Key** - Required for all tables
- **Campaign Management API key** - Optional, for campaign tables only
- **Account ID** - Optional, required together with the Campaign Management API key

## Sync modes

<SyncModes />

Sync behavior varies by table:

- **Report tables** (`max_ad_revenue`, `max_ad_unit_revenue`, `publisher_report`, `user_ad_revenue`) - Incremental sync on `day`. Report rows restate as metrics settle, so each sync merges recent data.
- **Campaign operation logs** - Incremental sync on `operation_time`, covering the last 30 days.
- **Campaigns** and **Creative sets** - Full refresh. The API has no server-side time filter for these tables, so each sync replaces the full table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the Report Key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If campaign tables fail with an authorization error, the Campaign Management API key or Account ID is incorrect. Check both under your account menu in the AppLovin dashboard, then update the source.
- If campaign tables show a message asking for credentials, add both the **Campaign Management API key** and **Account ID** to the source. You must provide both or neither.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
