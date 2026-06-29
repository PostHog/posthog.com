---
title: Linking Aircall as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Aircall
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Aircall connector syncs your call center data – calls, contacts, users, teams, numbers, and tags – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Aircall.
3. Next, you need an API key from Aircall, which is made up of an API ID and an API token. In your [Aircall dashboard](https://dashboard.aircall.io/integrations/api-keys), create a new API key and copy both the **API ID** and the **API token**. The key has read access to all of your company's data.
4. Back in PostHog, enter the credentials in the `API ID` and `API token` fields and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Aircall data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `calls` | Phone calls handled in Aircall | Incremental |
| `contacts` | Contacts in your Aircall account | Incremental |
| `users` | Agents and other users in your account | Full refresh |
| `teams` | Teams of agents | Full refresh |
| `numbers` | Phone numbers configured in Aircall | Full refresh |
| `tags` | Tags used to label calls | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
