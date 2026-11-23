---
title: Linking Pinterest Ads as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: PinterestAds
---

You can sync data from Pinterest Ads by configuring it as a source in PostHog. The supported entities and reports include campaigns, ad groups, ads, campaign analytics, ad group analytics, and ad analytics:

- [Campaigns](https://developers.pinterest.com/docs/api/v5/campaigns-list/): Campaign entities from your Pinterest Ads account
- [Ad Groups](https://developers.pinterest.com/docs/api/v5/ad_groups-list/): Ad group entities within campaigns
- [Ads](https://developers.pinterest.com/docs/api/v5/ads-list/): Individual ad entities within ad groups
- [Campaign Analytics](https://developers.pinterest.com/docs/api/v5/campaigns-analytics/): Performance metrics at the campaign level
- [Ad Group Analytics](https://developers.pinterest.com/docs/api/v5/ad_groups-analytics/): Performance metrics at the ad group level
- [Ad Analytics](https://developers.pinterest.com/docs/api/v5/ads-analytics/): Performance metrics at the ad level

Additional reports will be added based on user feedback we receive via our [in-app support form](https://app.posthog.com/#panel=support%3Afeedback%3Adata_warehouse%3Alow%3Atrue).

## Requirements

- A Pinterest Ads account with permission to access data from the accounts you want to sync.

> **Tip:** If you need to find your Ad Account ID manually, go to [Pinterest Business](https://business.pinterest.com/) > Ads > select your account. The ID is in the URL or account settings.

## Configuring PostHog

Connect PostHog to your Pinterest Ads account using a Pinterest account. The Pinterest account must have permission to access the ad account data.

1. In PostHog, go to the **[Data pipelines](https://app.posthog.com/data-management/sources)** tab.
2. Open the **+ New** drop-down menu in the top-right and select **Source**.
3. Find Pinterest Ads in the sources list and click **Link**.
4. Connect your Pinterest account by selecting an existing integration or creating a new one.
5. Select the **Ad Account** you want to sync from the dropdown. Each account displays your permission level (Owner, Campaign Manager, etc.).
6. (Optional) Add a prefix for the table name.
7. (Optional) Select a **Reporting time zone** for analytics tables. The default is **Pinterest default (UTC)**. Choose **Ad account time zone** to report analytics days in the time zone configured on the ad account in Pinterest.

### Reporting time zone

By default, Pinterest reports analytics days in UTC. If your ad account uses a non-UTC time zone, spend near midnight can appear on the neighboring day in daily charts.

To align analytics rows with your ad account's time zone, change **Reporting time zone** to **Ad account time zone**. This requires a time zone to be set on the ad account in Pinterest.

This is a sync setting, so you can change it after the source is created. A change applies to new syncs only. To move past rows to the new time zone, run a full resync on the analytics tables.

> **Warning:** A full resync replaces each analytics table with the last 89 days of data and deletes older rows.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
