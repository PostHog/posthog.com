---
title: Linking Outbrain as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Outbrain
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

The Outbrain source is currently in **alpha**. It connects to the Outbrain Amplify API, which requires account-manager approval before API calls are accepted. If your requests are rejected, contact your Outbrain account manager to enable Amplify API access.

</CalloutBox>

The Outbrain connector syncs your Outbrain Amplify advertising data into PostHog, including marketers, campaigns, budgets, promoted links, and performance reports.

## Requirements

- An Outbrain account with **Amplify API access** enabled. This must be requested through your Outbrain account manager — it isn't available by default.
- Your Outbrain login credentials (username and password).

## Available tables

| Table                        | Description                                                   | Sync method  |
| ---------------------------- | ------------------------------------------------------------- | ------------ |
| `marketers`                  | All marketers on your account                                 | Full refresh |
| `campaigns`                  | Campaigns for each marketer                                   | Full refresh |
| `budgets`                    | Budgets for each marketer                                     | Full refresh |
| `promoted_links`             | Promoted links for each campaign                              | Full refresh |
| `marketer_performance_daily` | Daily performance metrics per marketer                        | Incremental  |
| `campaign_performance`       | Per-campaign performance totals over a trailing 30-day window | Full refresh |

## Adding a data source

1. In PostHog, go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select Outbrain by clicking the **Link** button.
3. Enter your Outbrain **Username** (typically your email address).
4. Enter your Outbrain **Password**.
5. _Optional:_ Add a prefix to your table names.
6. Select the tables you want to sync.
7. Click **Import**.

PostHog validates your credentials by exchanging them for an API token via the Outbrain Amplify login endpoint. If authentication fails, check that your username and password are correct and that your account has Amplify API access enabled.

## Sync modes

### Full refresh

Most Outbrain tables only support full refresh syncing. The Outbrain Amplify API doesn't expose an "updated since" filter for entity endpoints (marketers, campaigns, budgets, promoted links), so PostHog re-downloads all rows on every sync.

The `campaign_performance` table is also full refresh — it returns per-campaign totals over a trailing 30-day window with no date column, so each sync is a point-in-time snapshot.

### Incremental

The `marketer_performance_daily` table supports incremental syncing using the `_date` field as the cursor. On each sync:

- **First sync** – Backfills the last 365 days of daily performance data.
- **Subsequent syncs** – Re-pulls a 30-day lookback window to account for conversion metrics that can restate for up to 30 days due to attribution, then appends new days.

Rows are keyed by `_marketer_id` and `_date`, so restated data merges correctly on deduplication.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
