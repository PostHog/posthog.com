---
title: Linking MoEngage as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: MoEngage
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The MoEngage connector syncs campaigns, campaign report, daily campaign report, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync your MoEngage campaigns and their performance reports.

Find your Workspace ID and the **Campaign report** API key in your MoEngage dashboard under **Settings** > **Account** > **APIs**. Pick the data center your dashboard URL shows (for example, `dashboard-01.moengage.com` is DC-01).

The `daily_campaign_report` table backfills the last 90 days by default. Set a daily report start date to backfill further. The `campaign_report` table always covers the last 30 days.

You'll be asked for:

- **Data center**: choose between DC-01 (US), DC-02 (EU), DC-03 (India), DC-04 (US), DC-05 (Singapore), DC-06 (Indonesia) and DC-101.
- **Workspace ID**
- **Campaign report API key**

## Sync modes

<SyncModes />

Some MoEngage tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the campaign report API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
