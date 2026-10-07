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

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The AppLovin connector syncs max ad revenue, max ad unit revenue, publisher report, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect your AppLovin account to pull MAX mediation revenue, campaign spend, and cohort reporting.

Find your **Report Key** in the AppLovin dashboard: click your account in the top right, then **Keys**.

AppLovin only serves the last 45 days of report data, so anything older than that can't be backfilled.

You'll be asked for:

- **Report Key**

## Sync modes

<SyncModes />

All AppLovin tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the report Key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
