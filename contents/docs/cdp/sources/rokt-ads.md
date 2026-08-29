---
title: Linking Rokt Ads as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: RoktAds
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Rokt Ads connector pulls your Rokt performance data – campaigns, creatives, audiences, demographics, and partner transactions – into the PostHog data warehouse.

The connector reads through the [Rokt Query API](https://docs.rokt.com/developers/api-reference/reporting/query-api/). It covers advertiser reports and partner reports. Rokt tells PostHog which dimensions and metrics your account can request, so the columns you get depend on what your account is entitled to.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Rokt Ads.
3. Enter your Rokt credentials:
   - **App ID** – The app ID from your Rokt profile
   - **App secret** – The app secret from your Rokt profile
   - **Account ID** – The Rokt account to read reports from
4. Set the optional reporting fields, or leave them blank to use your Rokt account's defaults:
   - **Time zone (Olson name)** – The time zone Rokt groups report days by, for example `America/New_York`
   - **Currency code** – The currency Rokt reports cost and revenue in, for example `USD`
5. Click **Next**.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

To get an app ID and app secret, open the **Profile settings** page in [One Platform](https://my.rokt.com) and generate a pair.

PostHog validates your credentials at connect time. If Rokt rejects them, or if they cannot read the account ID you entered, the connection fails immediately.

Once the syncs are complete, you can start using Rokt Ads data in PostHog.

## Available tables

| Table                    | Description                                                    | Sync method  |
| ------------------------ | -------------------------------------------------------------- | ------------ |
| `Accounts`               | Rokt accounts the connected credentials can read               | Full refresh |
| `CampaignPerformance`    | Daily advertiser spend and outcome metrics per campaign        | Incremental  |
| `CreativePerformance`    | Daily advertiser metrics per creative within a campaign        | Incremental  |
| `AudiencePerformance`    | Daily advertiser metrics per targeted audience                 | Incremental  |
| `CampaignDemographics`   | Daily advertiser metrics split by age range, gender, and device | Incremental  |
| `TransactionPerformance` | Daily partner transaction and impression metrics               | Incremental  |

`Accounts` is a small dimension table, so it uses full refresh. The five report tables group rows by calendar day and sync incrementally on their `datetime` field.

Each account exposes its own set of dimensions and metrics. If your account cannot serve a metric, that column is dropped from the report instead of failing the sync. If your account cannot serve a dimension, the sync fails with an error naming that dimension, because a dimension sets the row grain and dropping it would collapse rows onto a key that no longer identifies them. Deselect the affected table to continue.

## Incremental syncs

Rokt attributes acquisitions and conversions by conversion time, so it keeps restating recent days after they first land. Each incremental sync re-reads a trailing seven-day window and merges the results on the primary key. A day's numbers can therefore change for about a week after that day ends.

The first sync reaches back up to two years.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
