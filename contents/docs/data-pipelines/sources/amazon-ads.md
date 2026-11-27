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

The Amazon Ads connector pulls your Amazon advertising data into the PostHog data warehouse. This includes entities for Sponsored Products, Sponsored Brands, Sponsored Display, and Sponsored TV, daily performance reports, budget rules, invoices, and change history.

You need a Login with Amazon (LWA) application with Advertising API access. PostHog uses your LWA credentials to authenticate with Amazon's Advertising API and sync data from every advertising profile your token can access.

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

## Sync methods

The sync method depends on the type of table:

- **Report tables** (tables that end in `_reports`, such as `sp_campaign_reports`) support **incremental** sync on the `date` field. Each sync reloads a lookback window, because Amazon can update recent report data after it first appears.
- **Change history** (`change_history`) supports **incremental** sync on the `timestamp` field. Each sync reloads the last 24 hours, because Amazon can record an event after a sync has run.
- **Entity tables** (all other tables, such as `profiles`, `sp_campaigns`, and `sp_ad_groups`) use **full refresh** sync, because the Amazon Ads API doesn't expose an updated-since filter for entity lists. Each sync reloads all data.

Rows from profile-level tables include a `_profile_id` field that identifies the advertising profile they belong to. Data is synced from every profile your token can access.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
