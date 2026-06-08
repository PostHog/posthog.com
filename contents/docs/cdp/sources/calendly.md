---
title: Linking Calendly as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Calendly
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Calendly connector syncs your scheduling data – event types, scheduled events, groups, organization memberships, and routing forms – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Calendly.
3. Next, you need a personal access token from Calendly. In your Calendly account, go to **Integrations → API & Webhooks** and create a personal access token. Creating a personal access token requires a paid Calendly plan. Copy the token value.
4. Back in PostHog, enter the credentials and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Calendly data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `event_types` | Event types configured in your Calendly organization | Full refresh |
| `scheduled_events` | Scheduled meetings, synced incrementally on `start_time` | Incremental |
| `groups` | Groups within your Calendly organization | Full refresh |
| `organization_memberships` | Members of your Calendly organization | Full refresh |
| `routing_forms` | Routing forms configured in your organization | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />
