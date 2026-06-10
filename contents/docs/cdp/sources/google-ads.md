---
title: Linking Google Ads as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
beta: true
sourceId: GoogleAds
---

You can sync data from Google Ads reports by configuring it as a source in PostHog. The supported reports that can be synced include Ad, AdStats, AdGroup, AdGroupStats, Campaign, CampaignStats, GeographicStats, Keyword, KeywordStats, Video, and VideoStats, as they are described in the [Google Ads BigQuery transformation documentation](https://cloud.google.com/bigquery/docs/google-ads-transformation). Additional reports will be added based on user feedback we receive via our [in-app support form](https://app.posthog.com/#panel=support%3Afeedback%3Adata_warehouse%3Alow%3Atrue).

> **Note:** The GeographicStats table is disabled by default because it can load hundreds of millions of rows for active campaigns. You can enable it manually during source configuration if you need geographic performance data.

## Requirements

- The [Google Ads customer ID](https://support.google.com/google-ads/answer/1704344) of the account you are trying to sync to PostHog.
- Administrator access to the Google Ads account you want to sync. If you use manager accounts then this is often enough to connect. An manager account is an Ads account type that enables you to manage several Ads accounts under a single login – [see here for more on Google Ads manager accounts](https://support.google.com/google-ads/answer/6139186).
- During the authentication, make sure you check the necessary scopes.

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/w_500,c_limit,q_auto,f_auto/Screenshot_2025_10_02_at_1_46_13_PM_fda20371c8.png"
    classes="rounded"
    alt="Accept scope checkbox"
/>

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/2024_10_31_at_15_15_51_a7a003008c.png"
    classes="rounded"
    alt="Location of the Google Ads Customer ID"
/>

## Configuring PostHog

Connect PostHog to your Google Ads account using a Google account. The Google account must have administrator access to your Google Ads account.

1. In PostHog, go to the **[Data pipelines](https://app.posthog.com/data-management/sources)** tab.
2. Open the **+ New** drop-down menu in the top-right and select **Source**.
3. Find Google Ads in the sources list and click **Link**.
4. Enter the **Google Ads customer ID** of the Google Ads account you want to sync.
5. Select an existing Google Ads account, or create a new integration
6. (Optional) Add a prefix for the table name.

## Configuration

<SourceParameters />

## Manager (MCC) accounts

If you use a [Google Ads manager account](https://support.google.com/google-ads/answer/6139186) (also called an MCC account) to manage multiple client accounts, you need to configure the source differently. Google Ads doesn't return metrics for manager accounts directly – you must query each client account individually.

To sync data from a client account through a manager account:

1. Enter the **client account's customer ID** (not the manager account ID) in the **Customer ID** field.
2. Enable the **Using MCC account?** toggle.
3. Enter the **manager account's customer ID** in the **Managers customer ID** field that appears.

> **Note:** If you enter a manager account ID as the customer ID without enabling the MCC toggle, syncs will fail with the error: "Metrics cannot be requested for a manager account." See [troubleshooting](#troubleshooting) below.

## Troubleshooting

### "Metrics cannot be requested for a manager account"

This error occurs when the source is configured with a manager (MCC) account ID instead of a client account ID. Google Ads doesn't allow querying metrics on manager accounts directly.

To fix this, either:

- Change the **Customer ID** to a client account ID instead of the manager account ID.
- Or enable the **Using MCC account?** toggle and provide both the manager and client customer IDs (see [Manager (MCC) accounts](#manager-mcc-accounts) above).
