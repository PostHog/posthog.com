---
title: Linking Amazon Ads as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AmazonAds
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Amazon Ads connector pulls your Amazon advertising entity data – profiles, Sponsored Products campaigns, and ad groups – into the PostHog data warehouse.

You need a Login with Amazon (LWA) application with Advertising API access. PostHog uses your LWA credentials to authenticate with Amazon's Advertising API and sync entity data from every advertising profile your token can access.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Amazon Ads.
3. Select the **Region** that matches your Amazon advertising profiles:
   - **North America** – US, Canada, Mexico, Brazil
   - **Europe** – UK, Germany, France, Italy, Spain, and others
   - **Far East** – Japan, Australia, Singapore
4. Enter your Login with Amazon credentials:
   - **LWA client ID** – Your application's client ID (starts with `amzn1.application-oa2-client...`)
   - **LWA client secret** – Your application's client secret
   - **Refresh token** – An authorized refresh token from your LWA app (starts with `Atzr|...`)
5. Click **Next**.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

To obtain these credentials, create a Login with Amazon application in the [Amazon Developer Console](https://developer.amazon.com/loginwithamazon/console/site/lwa/overview.html) and request access to the [Amazon Advertising API](https://advertising.amazon.com/API/docs/en-us/get-started/overview).

PostHog validates your credentials at connect time by minting an access token and listing your advertising profiles. If the token doesn't have Advertising API access, the connection fails immediately.

Once the syncs are complete, you can start using Amazon Ads data in PostHog.

## Available tables

| Table          | Description                                              | Sync method  |
| -------------- | -------------------------------------------------------- | ------------ |
| `profiles`     | Amazon Advertising profiles associated with your account | Full refresh |
| `sp_campaigns` | Sponsored Products campaigns across all profiles         | Full refresh |
| `sp_ad_groups` | Sponsored Products ad groups across all profiles         | Full refresh |

All tables use **full refresh** sync because the Amazon Ads API doesn't expose an updated-since filter for entity lists. Each sync reloads all data.

Sponsored Products rows (`sp_campaigns` and `sp_ad_groups`) include a `_profile_id` field identifying which advertising profile they belong to. Data is synced from every profile your token can access.

## Configuration

<SourceParameters />
