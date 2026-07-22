---
title: Linking TikTok Ads as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
beta: true
sourceId: TikTokAds
---

You can sync data from TikTok Ads reports by configuring it as a source in PostHog. The supported reports that can be synced include Ad Groups, Campaigns, Ads, Ad Group Report, Campaign Report, and Ad Report, as described here:

- [Ad Groups](https://business-api.tiktok.com/portal/docs?id=1739314558673922)
- [Campaigns](https://business-api.tiktok.com/portal/docs?id=1739315828649986)
- [Ads](https://business-api.tiktok.com/portal/docs?id=1735735588640770)
- [Ad Groups Report](https://business-api.tiktok.com/portal/docs?id=1740302848100353): Filter by `adgroup_ids`
- [Campaign Report](https://business-api.tiktok.com/portal/docs?id=1740302848100353): Filter by `campaign_ids`
- [Ad Report](https://business-api.tiktok.com/portal/docs?id=1740302848100353): Filter by `ad_ids`

Additional reports will be added based on user feedback we receive via our [in-app support form](https://app.posthog.com/#panel=support%3Afeedback%3Adata_warehouse%3Alow%3Atrue).

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
