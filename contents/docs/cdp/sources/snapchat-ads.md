---
title: Linking Snapchat Ads as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
beta: true
sourceId: SnapchatAds
---

You can sync data from Snapchat Ads by configuring it as a source in PostHog. These are the supported entities and reports:

- [Campaigns](https://developers.snap.com/api/marketing-api/Ads-API/campaigns)
- [Ad Squads](https://developers.snap.com/api/marketing-api/Ads-API/ad-squads)
- [Ads](https://developers.snap.com/api/marketing-api/Ads-API/ads)
- [Campaign Stats](https://developers.snap.com/api/marketing-api/Ads-API/measurement): Performance metrics at the campaign level
- [Ad Squad Stats](https://developers.snap.com/api/marketing-api/Ads-API/measurement): Performance metrics at the ad squad level
- [Ad Stats](https://developers.snap.com/api/marketing-api/Ads-API/measurement): Performance metrics at the ad level

Additional reports will be added based on user feedback we receive via our [in-app support form](https://app.posthog.com/#panel=support%3Afeedback%3Adata_warehouse%3Alow%3Atrue).

## Requirements

- A Snapchat Ads account with permission to access data from accounts you want to sync.

> **Tip:** If you need to find your ad account ID manually, go to [Snapchat Ads Manager](https://ads.snapchat.com/) > **Ad Accounts**. The ID is visible next to the account name, or in the dashboard URL: `https://ads.snapchat.com/{ID_IS_HERE}/manage`.

## Configuring PostHog

Connect PostHog to your Snapchat Ads account using a Snapchat account. The Snapchat account must have permission to access data.

1. In PostHog, go to the **[Data pipelines](https://app.posthog.com/pipeline/sources)** tab.
2. Open the **+ New** drop-down menu in the top-right and select **Source**.
3. Find Snapchat Ads in the sources list and click **Link**.
4. Connect your Snapchat account by selecting an existing integration or creating a new one.
5. Select your ad account from the dropdown. Accounts are grouped by organization and display their status (e.g. Active, Pending). Pending accounts typically haven't finished setup and may not have data to sync yet.
6. (Optional) Add a prefix for the table name.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
