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

The Amazon Ads connector pulls your Amazon advertising data – profiles, portfolios, Sponsored Products, Sponsored Brands, and Sponsored Display entities, campaign performance reports, change history, and invoices – into the PostHog data warehouse.

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

| Table                           | Description                                                             | Sync method  |
| ------------------------------- | ----------------------------------------------------------------------- | ------------ |
| `ads_accounts`                  | Amazon Ads accounts above your profiles, for multi-account rollups      | Full refresh |
| `profiles`                      | Amazon Advertising profiles associated with your account                | Full refresh |
| `portfolios`                    | Portfolios that group campaigns across all profiles                     | Full refresh |
| `sp_campaigns`                  | Sponsored Products campaigns across all profiles                        | Full refresh |
| `sp_ad_groups`                  | Sponsored Products ad groups across all profiles                        | Full refresh |
| `sp_product_ads`                | Sponsored Products ads across all profiles                              | Full refresh |
| `sp_keywords`                   | Sponsored Products keyword targets across all profiles                  | Full refresh |
| `sp_targets`                    | Sponsored Products product and category targets across all profiles     | Full refresh |
| `sp_negative_keywords`          | Sponsored Products ad group negative keywords across all profiles       | Full refresh |
| `sp_campaign_negative_keywords` | Sponsored Products campaign negative keywords across all profiles       | Full refresh |
| `sp_negative_targets`           | Sponsored Products ad group negative targets across all profiles        | Full refresh |
| `sp_campaign_negative_targets`  | Sponsored Products campaign negative targets across all profiles        | Full refresh |
| `sp_campaign_reports`           | Daily Sponsored Products campaign performance across all profiles       | Incremental  |
| `sb_campaigns`                  | Sponsored Brands campaigns across all profiles                          | Full refresh |
| `sb_ad_groups`                  | Sponsored Brands ad groups across all profiles                          | Full refresh |
| `sb_ads`                        | Sponsored Brands ads across all profiles                                | Full refresh |
| `sb_targets`                    | Sponsored Brands targets across all profiles                            | Full refresh |
| `sd_campaigns`                  | Sponsored Display campaigns across all profiles                         | Full refresh |
| `sd_ad_groups`                  | Sponsored Display ad groups across all profiles                         | Full refresh |
| `sd_ads`                        | Sponsored Display ads across all profiles                               | Full refresh |
| `sd_targets`                    | Sponsored Display targets across all profiles                           | Full refresh |
| `change_history`                | History of changes to bids, budgets, and status across all profiles     | Incremental  |
| `invoices`                      | Advertising billing invoices across all profiles                        | Full refresh |

Entity tables use **full refresh** sync because the Amazon Ads API doesn't expose an updated-since filter for entity lists. Each sync reloads all data for these tables. The `invoices` table also uses full refresh, because invoice status and remaining amounts can change after Amazon issues an invoice.

Two tables support **incremental** sync:

- `sp_campaign_reports` syncs incrementally on `date`. Amazon updates recent days as attribution data arrives, so each sync reads back over recent days again.
- `change_history` syncs incrementally on `timestamp`. Amazon keeps change history for 90 days, so the first sync imports only the most recent 89 days. Change history includes campaign, ad group, ad, keyword, negative keyword, and product targeting events. Theme events are not included. History events have no ID of their own, so PostHog adds an `_event_id` field that is a hash of the event.

Tables synced per profile include a `_profile_id` field identifying which advertising profile each row belongs to. Data is synced from every profile your token can access. The `invoices` table syncs from the profiles where your token has view access to billing. The `change_history` table syncs from the profiles where your token has view access to campaigns.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
