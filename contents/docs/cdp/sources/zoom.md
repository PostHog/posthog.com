---
title: Linking Zoom as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Zoom
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Sync your Zoom users, meetings, and webinars into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Zoom.
3. Create a **Server-to-Server OAuth** app in the [Zoom App Marketplace](https://marketplace.zoom.us/develop/create) and copy its `Account ID`, `Client ID`, and `Client Secret`. Grant the following read scopes:
   - `user:read:list_users:admin`
   - `meeting:read:list_meetings:admin`
   - `webinar:read:list_webinars:admin`
4. Back in PostHog, enter the Account ID, Client ID, and Client secret, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Zoom data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `users` | Users in your Zoom account | Full refresh |
| `meetings` | Scheduled meetings per user | Full refresh |
| `webinars` | Webinars per user | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
