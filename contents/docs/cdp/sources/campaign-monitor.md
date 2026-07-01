---
title: Linking Campaign Monitor as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CampaignMonitor
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Campaign Monitor (CreateSend) connector syncs your email marketing data – clients, campaigns, lists, segments, templates, suppression lists, and subscriber states – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Campaign Monitor.
3. Next, you need two credentials from Campaign Monitor:
   - **API key** – Create one in your [Campaign Monitor account settings](https://www.campaignmonitor.com/api/) under **Account settings → API keys**.
   - **Client ID** – This identifies the client whose data you want to sync. You can find it on the client's **Settings** page, or by calling the `clients.json` API endpoint.
4. Back in PostHog, enter the credentials and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Campaign Monitor data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `clients` | Clients in your Campaign Monitor account | Full refresh |
| `campaigns` | Sent campaigns for the selected client | Full refresh |
| `scheduled_campaigns` | Campaigns scheduled to send | Full refresh |
| `draft_campaigns` | Draft campaigns | Full refresh |
| `lists` | Subscriber lists for the client | Full refresh |
| `segments` | Segments defined on the client's lists | Full refresh |
| `templates` | Email templates for the client | Full refresh |
| `suppression_list` | The client's suppression list | Full refresh |
| `active_subscribers` | Active subscribers across the client's lists | Full refresh |
| `unsubscribed_subscribers` | Unsubscribed subscribers across the client's lists | Full refresh |
| `bounced_subscribers` | Bounced subscribers across the client's lists | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

All Campaign Monitor tables currently sync via full refresh. Incremental sync is not yet available for this source.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
