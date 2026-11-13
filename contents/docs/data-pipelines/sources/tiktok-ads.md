---
title: Linking TikTok Ads as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TikTokAds
---

You can sync data from TikTok Ads reports by configuring it as a source in PostHog. The supported tables include entity tables, performance reports, and optional website attribution reports:

- [Ad Groups](https://business-api.tiktok.com/portal/docs?id=1739314558673922)
- [Campaigns](https://business-api.tiktok.com/portal/docs?id=1739315828649986)
- [Ads](https://business-api.tiktok.com/portal/docs?id=1735735588640770)
- [Ad Groups Report](https://business-api.tiktok.com/portal/docs?id=1740302848100353): Filter by `adgroup_ids`
- [Campaign Report](https://business-api.tiktok.com/portal/docs?id=1740302848100353): Filter by `campaign_ids`
- [Ad Report](https://business-api.tiktok.com/portal/docs?id=1740302848100353): Filter by `ad_ids`

Additional reports will be added based on user feedback we receive via our [in-app support form](https://app.posthog.com/#panel=support%3Afeedback%3Adata_warehouse%3Alow%3Atrue).

## Website attribution tables

TikTok Ads sources on API v2.0 can optionally sync daily website attribution reports at the campaign, ad group, and ad level:

- `campaign_website_attribution_report`
- `ad_group_website_attribution_report`
- `ad_website_attribution_report`

These tables use TikTok's Reporting API v2.0 and provide click-attributed website purchase metrics:

- **`cta_complete_payment`** – Number of website purchases attributed to ad clicks.
- **`cta_complete_payment_value`** – Total value of website purchases attributed to ad clicks.
- **`complete_payment`** – Total website purchases (all attribution).
- **`spend`** – Total spend for the reporting period.

These tables are **off by default**. Enable them in the table selection step when configuring your source.

New TikTok Ads sources default to API v2.0. Existing sources pinned to v1.3 keep their current table catalog and do not see these tables until the source version is changed to v2.0.

> **Upgraded Smart+ campaigns:** In v2.0 website attribution tables, `ad_id` identifies the ad asset group rather than the legacy creative. Do not join this ID directly to legacy creative-level ad IDs for those campaigns.

## Requirements

- A TikTok Ads account with permission to access data from accounts you want to sync.

## Configuring PostHog

Connect PostHog to your TikTok Ads account. The TikTok account must have permission to access data.

1. In PostHog, go to the **[Data pipelines](https://app.posthog.com/data-management/sources)** tab.
2. Open the **+ New** drop-down menu in the top-right and select **Source**.
3. Find TikTok Ads in the sources list and click **Link**.
4. Select an existing TikTok Ads integration, or create a new one by clicking **Connect**.
5. Select the advertiser account you want to sync from the dropdown.
6. (Optional) Add a prefix for the table name.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### Finding your account ID manually

If the advertiser account dropdown in step 5 doesn't load, you can find your account ID manually in TikTok Ads Manager:

1. Go to the [TikTok Ads Manager dashboard](https://ads.tiktok.com/i18n/dashboard).
2. Click your account name in the top right and open the dropdown.
3. Find your ad account ID, or check the dashboard URL, e.g. `https://ads.tiktok.com/i18n/dashboard?aadvid=ID_HERE`

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/w_500,c_limit,q_auto,f_auto/Screenshot_2025_09_30_at_11_25_16_AM_ab70c4f7c4.png"
    classes="rounded"
    alt="TikTok account ID"
/>
