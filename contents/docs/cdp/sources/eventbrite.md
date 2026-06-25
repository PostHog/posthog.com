---
title: Linking Eventbrite as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Eventbrite
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Eventbrite private token to automatically pull your Eventbrite data – organizations, events, orders, attendees, and more – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Eventbrite.
3. Next, you need a private token from Eventbrite. Create one under your [Eventbrite account settings](https://www.eventbrite.com/account-settings/apps) on the **API Keys** page – copy the value from the **Private token** field of your API key. The token needs read access to your organizations, events, orders, and attendees.
4. Back in PostHog, enter the private token and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Eventbrite data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `organizations` | Organizations you have access to | Full refresh |
| `categories` | Event categories | Full refresh |
| `formats` | Event formats | Full refresh |
| `events` | Events across your organizations | Full refresh |
| `venues` | Venues across your organizations | Full refresh |
| `orders` | Orders placed for your events | Incremental |
| `attendees` | Attendees of your events | Incremental |
| `ticket_classes` | Ticket classes defined on your events | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Only `orders` and `attendees` expose a server-side `changed_since` filter, so they support incremental sync on the `changed` field. All other tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
