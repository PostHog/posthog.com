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

The Appcues connector syncs your experience settings, segments, segment membership, tags, events, and ingestion filtering rules from [Appcues](https://www.appcues.com) into the PostHog [Data Warehouse](/docs/data-warehouse). Appcues is a user onboarding and product adoption platform.

## Prerequisites

You need an Appcues account with API credentials. To create them:

1. In Appcues Studio, go to **Settings** > **Integrations** > **API Keys**.
2. Create a new API key and give it read access to the experiences you want to sync.
3. Copy the **API key**, **API secret**, and your **Account ID** from the account settings.

If you enable the optional export tables, your credentials also need access to the corresponding event or segment membership exports and export job status.

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

The `events` and `segment_membership` tables are off by default. Enable them during table selection if you need event history or the users in each segment. For `events`, use append-only syncing with `timestamp` to add new events on each sync.

The Data Warehouse then starts syncing your Appcues data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync behavior and limitations

- **Events:** PostHog reads bulk exports in one-day time windows, with pagination for large exports. The default initial lookback is 90 days. Each sync excludes the most recent hour to give Appcues time to ingest events. Append syncs add events after the last synced timestamp without updating existing rows or removing duplicates.
- **Segment membership:** PostHog exports each segment's current members using full refresh. Use `segment_id` to join membership to the `segments` table. This table contains segment and user IDs, not user profile properties or a history of membership changes.
- **Ingestion filtering rules:** This table uses full refresh and contains your account's allow or deny rules for event names and profile or group properties. Check these rules when investigating missing Appcues data. The table is empty if your account has no rules.
- **Other tables:** Experience settings, segments, and tags use full refresh. Incremental sync isn't supported for these tables because the Appcues API doesn't expose timestamp filters or pagination on its list endpoints.
- The `events` and `segment_membership` tables are not synced by default. Enable them when selecting tables during setup.
- **User and group profiles** aren't available. The Appcues API has no list endpoints for profiles.
