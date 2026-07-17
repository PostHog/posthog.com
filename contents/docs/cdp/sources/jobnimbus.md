---
title: Linking JobNimbus as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: JobNimbus
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your JobNimbus API key to automatically pull your CRM data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to JobNimbus.
3. In JobNimbus, create an API key under **Settings → API** in [JobNimbus](https://app.jobnimbus.com). The key grants access to your contacts, jobs, tasks, and activities.
4. Back in PostHog, paste the key into the **API key** field and click **Next**.
5. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the syncs are complete, you can start using JobNimbus data in PostHog.

## Available tables

| Table        | Description                                                                        | Sync method  |
| ------------ | ---------------------------------------------------------------------------------- | ------------ |
| `contacts`   | A person or company in your JobNimbus CRM — a lead, customer, or business contact. | Full refresh |
| `jobs`       | A job or project tracked in JobNimbus, typically linked to one or more contacts.   | Full refresh |
| `tasks`      | A to-do or scheduled task linked to a contact or job.                              | Full refresh |
| `activities` | An activity or note recorded against a contact or job (calls, emails, updates).    | Full refresh |

All tables use **full refresh** sync, meaning all data is reloaded on each sync. JobNimbus does not expose reliable server-side timestamp filters for incremental syncing.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
