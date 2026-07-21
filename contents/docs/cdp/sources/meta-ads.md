---
title: Linking Meta Ads as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: MetaAds
---

You can sync data from Meta Ads reports by configuring it as a source in PostHog. The supported reports that can be synced include Adsets, Campaigns, Ads, Adset Report, Campaign Report, and Ad Report, as described here:

- [Adsets](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/)
- [Campaigns](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/)
- [Ads](https://developers.facebook.com/docs/marketing-api/reference/ad-account/ads/)
- [Adset Insight](https://developers.facebook.com/docs/marketing-api/reference/ad-account/insights/): filtered by level = `adset`
- [Campaign Insight](https://developers.facebook.com/docs/marketing-api/reference/ad-account/insights/): filtered by level = `campaign`
- [Ad Insight](https://developers.facebook.com/docs/marketing-api/reference/ad-account/insights/): filtered by level = `ad`

Additional reports will be added based on user feedback we receive via our [in-app support form](https://app.posthog.com/#panel=support%3Afeedback%3Adata_warehouse%3Alow%3Atrue).

## Requirements

- A Meta Ads account with permission to access data from accounts you want to sync.

> **Tip:** If you need to find your account ID manually, go to [Ads Manager](https://adsmanager.facebook.com/) > Menu > Campaigns. You'll see a dropdown next to the title where you can find the ID, or check the URL: `https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=YOUR_ID`

## Configuring PostHog

Connect PostHog to your Meta Ads account using a Meta account. The Meta account must have permission to access data.

1. In PostHog, go to the **[Data pipelines](https://app.posthog.com/data-management/sources)** tab.
2. Open the **+ New** drop-down menu in the top-right and select **Source**.
3. Find Meta Ads in the sources list and click **Link**.
4. Select an existing Meta Ads integration, or create a new one by clicking **Connect**.
5. Select the **Account ID** of the Meta Ads account you want to sync from the dropdown. Each account displays its status (Active, Disabled, or Closed). If your account doesn't appear, you can enter the account ID manually.
6. (Optional) Add a prefix for the table name.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
