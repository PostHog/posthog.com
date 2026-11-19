---
title: Linking NewsBreak Ads as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: NewsBreak
---

The NewsBreak Ads connector syncs your advertising data from the NewsBreak Ads API into PostHog, including ad accounts, campaigns, ad sets, ads, and daily performance reports.

## Adding a data source

1. In PostHog, go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select NewsBreak Ads by clicking the **Link** button.
3. Enter your NewsBreak credentials:
   - **Access token** – Your NewsBreak API access token. Generate it in NewsBreak Ads Manager under **Tools** > **Resources** > **API Access Tokens**.
4. Optionally configure:
   - **Organization IDs** – Comma-separated organization IDs. Leave empty to sync every organization where you're an admin.
   - **Report time zone** – The time zone for report dates (e.g. `America/New_York`). Defaults to UTC.
5. Click **Next** and select the tables you want to sync.
6. Set the sync method and frequency, then click **Import**.

The data warehouse then starts syncing your NewsBreak data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Available tables

| Table                     | Description                                                            | Sync method  |
| ------------------------- | ---------------------------------------------------------------------- | ------------ |
| `ad_accounts`             | NewsBreak ad accounts in the connected organizations                   | Full refresh |
| `campaigns`               | NewsBreak ad campaigns                                                 | Full refresh |
| `ad_sets`                 | NewsBreak ad sets, with their budget, bidding, schedule, and targeting | Full refresh |
| `ads`                     | NewsBreak ads and their creatives                                      | Full refresh |
| `ad_account_daily_report` | Daily ad performance for each ad account                               | Incremental  |
| `campaign_daily_report`   | Daily ad performance for each campaign                                 | Incremental  |
| `ad_set_daily_report`     | Daily ad performance for each ad set                                   | Incremental  |
| `ad_daily_report`         | Daily ad performance for each ad                                       | Incremental  |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync behavior

### Entity tables

The `ad_accounts`, `campaigns`, `ad_sets`, and `ads` tables use full refresh because the NewsBreak API doesn't provide updated-since filtering. Every sync re-downloads the full result set.

Entity tables fan out across ad accounts. If a sync is interrupted, it resumes from the next ad account rather than restarting from the beginning.

### Report tables

The daily report tables (`ad_account_daily_report`, `campaign_daily_report`, `ad_set_daily_report`, `ad_daily_report`) are date-windowed reports walked in seven-day chunks. They support incremental sync using the `date` field, with a **14-day restatement lookback** – recent ad metrics can restate as conversions settle, so PostHog re-pulls the trailing 14 days and merges on `date` and entity keys to keep data accurate.

The first sync backfills from the creation date of each ad account. If a report sync is interrupted, it resumes from the next unfetched window rather than restarting.

## Report metrics

Report tables include the following metrics:

- Spend (cost)
- Impressions
- Clicks
- Conversions and conversion value
- CPM, CPC, CPA
- CTR, CVR (conversion rate)
- Value per action (VPA)
- ROAS variants (complete payment, sale, app purchase, in-app ad impression)

Rate and ratio metrics return -1 when unavailable.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
