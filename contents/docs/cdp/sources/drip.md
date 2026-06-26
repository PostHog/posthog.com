---
title: Linking Drip as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Drip
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Drip API token and account ID to pull your Drip email marketing data – subscribers, campaigns, broadcasts, workflows, forms, and goals – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Drip.
3. Next, gather your Drip credentials:
   - **API token** – found in Drip under **Settings → User Settings → API**.
   - **Account ID** – found under **Settings → Account → General Info** (it's the numeric ID in your Drip dashboard URL).
4. Back in PostHog, enter the credentials and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Drip data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `subscribers` | Subscribers in your Drip account | Full refresh |
| `campaigns` | Email campaigns | Full refresh |
| `broadcasts` | One-off broadcast emails | Full refresh |
| `workflows` | Automation workflows | Full refresh |
| `forms` | Signup forms | Full refresh |
| `goals` | Conversion goals | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

All Drip tables are full refresh only. Drip's only documented server-side timestamp filter is `subscribed_after` on subscribers, which filters on subscription date and would silently miss updates to existing records, so it isn't used as an incremental cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
