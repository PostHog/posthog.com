---
title: Linking Pendo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Pendo
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Pendo integration key to pull your Pendo data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Pendo.
3. Create an integration key in Pendo under **Settings > Integrations > Integration Keys** (only Pendo admins can view these). The key is specific to your subscription's data region, so note which region you log in with (US, US1, EU, Japan, or Australia).
4. Back in PostHog, enter the integration key, select the matching data region, and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Pendo data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `features` | Tagged features | Full refresh |
| `pages` | Tagged pages | Full refresh |
| `guides` | Guides | Full refresh |
| `visitors` | Visitor metadata, via the aggregation API | Full refresh |
| `accounts` | Account metadata, via the aggregation API | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Every table is full refresh only. Pendo's list endpoints expose no server-side timestamp filter, and the aggregation endpoint's time filters apply only to event sources, not the visitor and account metadata this source pulls.

## Configuration

<SourceParameters />
