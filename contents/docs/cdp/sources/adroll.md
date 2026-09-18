---
title: Linking AdRoll as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
beta: true
sourceId: AdRoll
---

You can sync advertising entity data from AdRoll (NextRoll) by configuring it as a source in PostHog. The supported entities that can be synced include:

| Entity                                                                        | Description                               |
| ----------------------------------------------------------------------------- | ----------------------------------------- |
| [Advertisables](https://developers.nextroll.com/docs/native-api/advertisable) | Your organization's advertisable entities |
| [Campaigns](https://developers.nextroll.com/docs/native-api/campaign)         | Campaigns for each advertisable           |
| [Ads](https://developers.nextroll.com/docs/native-api/ad)                     | Ads for each advertisable                 |

Campaigns and ads include an `_advertisable_eid` field that links each row back to its parent advertisable. All entities use `eid` as their primary key and sync via full refresh.

Additional entities and performance reports will be added based on user feedback we receive via our [in-app support form](https://app.posthog.com/#panel=support%3Afeedback%3Adata_warehouse%3Alow%3Atrue).

## Requirements

- An AdRoll account with access to the organization data you want to sync.
- A **personal access token** and an **app Client ID** from the [NextRoll developer console](https://developers.nextroll.com/).

To get your credentials:

1. Go to the [NextRoll developer console](https://developers.nextroll.com/).
2. Create a personal access token.
3. Create an app — the app's **Client ID** is sent as the `apikey` on every API request.

<CalloutBox icon="IconWarning" title="AdRoll API quota limit" type="caution">

NextRoll's default API quota is **100 requests per day**. A full sync costs 1 + 2× the number of advertisables in your organization. If you have a large number of advertisables, contact [NextRoll support](https://developers.nextroll.com/) to raise your quota before setting up the source.

</CalloutBox>

## Configuring PostHog

Connect PostHog to your AdRoll account using your API credentials.

1. In PostHog, go to the **[Data pipelines](https://app.posthog.com/data-management/sources)** tab.
2. Open the **+ New** drop-down menu in the top-right and select **Source**.
3. Find AdRoll in the sources list and click **Link**.
4. Enter the **Client ID** from your NextRoll app.
5. Enter your **Personal access token**.
6. (Optional) Add a prefix for the table name.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
