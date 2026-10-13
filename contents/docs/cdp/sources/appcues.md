---
title: Linking Appcues as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Appcues
---

The Appcues connector syncs your experience settings, segments, and tags from [Appcues](https://www.appcues.com) into the PostHog [data warehouse](/docs/data-warehouse). Appcues is a user onboarding and product adoption platform.

## Prerequisites

You need an Appcues account with API credentials. To create them:

1. In Appcues Studio, go to **Settings** > **Integrations** > **API Keys**.
2. Create a new API key and give it read access to the experiences you want to sync.
3. Copy the **API key**, **API secret**, and your **Account ID** from the account settings.

## Adding a data source

1. In PostHog, go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section.
2. Click **+ New source** and then click **Link** next to Appcues.
3. Enter your credentials:
   - **API key** – the API key from Appcues Studio.
   - **API secret** – the API secret from Appcues Studio.
   - **Account ID** – your numeric account ID from Appcues settings.
   - **Account region** – select **United States (US)** or **European Union (EU)** depending on where your Appcues account is hosted.
4. Click **Next**.
5. Select the tables you want to sync, then click **Import**.

The data warehouse then starts syncing your Appcues data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync limitations

- All tables use **full refresh** syncing. Incremental sync isn't supported because the Appcues API doesn't expose timestamp filters or pagination on its list endpoints.
- **Event exports** aren't available. The Appcues API docs don't define the completed job result field needed to retrieve event data.
- **User and group profiles** aren't available. The Appcues API has no list endpoints for profiles.
