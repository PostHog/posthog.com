---
title: Linking Taboola as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Taboola
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Taboola connector syncs your advertising data from the Taboola Backstage API into PostHog, including campaigns, campaign items, conversion rules, and performance reports.

## Adding a data source

<CalloutBox icon="IconWarning" title="Credentials must be requested from Taboola" type="caution">

Backstage API credentials (client ID and secret) are issued by your Taboola account manager – they can't be self-served. Contact your Taboola account manager to obtain API access before continuing.

</CalloutBox>

1. In PostHog, go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select Taboola by clicking the **Link** button.
3. Enter your Taboola credentials:
   - **Client ID** – Your Taboola API client ID
   - **Client secret** – Your Taboola API client secret
   - **Account ID** – Your alphabetic Taboola account identifier (also called the account name, visible in Taboola Ads)
4. Click **Next** and select the tables you want to sync.
5. Set the sync method and frequency, then click **Import**.

The data warehouse then starts syncing your Taboola data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Available tables

| Table                     | Description                                                           | Sync method  |
| ------------------------- | --------------------------------------------------------------------- | ------------ |
| `campaigns`               | All campaigns in your Taboola account                                 | Full refresh |
| `campaign_items`          | Content items within each campaign                                    | Full refresh |
| `conversion_rules`        | Universal pixel conversion rules                                      | Full refresh |
| `campaign_summary_by_day` | Daily campaign performance metrics (impressions, clicks, conversions) | Incremental  |
| `top_campaign_content`    | Top 1,000 performing content items over the last 30 days              | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync behavior

### Entity tables

The `campaigns`, `conversion_rules`, and `campaign_items` tables use full refresh because the Taboola API doesn't provide updated-since filtering. Every sync re-downloads the full result set.

The `campaign_items` table fans out across campaigns, fetching items for each campaign individually. If a sync is interrupted, it resumes from the next campaign rather than restarting from the beginning.

### Report tables

The `campaign_summary_by_day` table is a date-windowed report walked in 30-day chunks. It supports incremental sync using the `date` field, with a **30-day restatement lookback** – recent ad metrics can restate as conversions settle, so PostHog re-pulls the trailing 30 days and merges on `date` and `campaign` to keep data accurate. The first sync backfills 365 days of history.

If a report sync is interrupted, it resumes from the next unfetched window rather than restarting.

### Snapshot tables

The `top_campaign_content` table returns the top 1,000 items aggregated over the trailing 30 days. Rows carry no date, so this table always syncs as a full refresh snapshot.

## Authentication

Taboola uses OAuth2 client credentials authentication. Tokens are short-lived; PostHog automatically refreshes them during syncs. If a token expires mid-sync, PostHog re-authenticates once and continues.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
