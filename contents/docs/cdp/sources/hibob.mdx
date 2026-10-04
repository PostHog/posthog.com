---
title: Linking HiBob as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: HiBob
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change. If you encounter any issues, please [report them on GitHub](https://github.com/PostHog/posthog/issues/new?labels=bug&template=bug_report.md).

</CalloutBox>

The HiBob connector syncs your Bob HR data into the PostHog data warehouse. Enter your HiBob Service User credentials to automatically pull employee and task data into PostHog.

## Prerequisites

Before linking HiBob, create a Service User in your Bob account:

1. In Bob, go to **Settings** > **Integrations** > **Automation** > **Service Users**
2. Create a new Service User and note down the **Service User ID** and **token**
3. Add the Service User to a permission group with read access to the data categories you want to sync (e.g., **People**)

<CalloutBox icon="IconWarning" title="Service Users only" type="caution">

HiBob discontinued legacy API tokens. Only Service User credentials work with this connector. API calls return 403 until your Service User is added to a permission group with the appropriate access.

</CalloutBox>

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and select **HiBob**.
3. Enter your **Service User ID** and **Service User token**.
4. _Optional:_ Add a prefix to your table names.
5. Select the tables you want to import and set a sync frequency.
6. Click **Import**.

Once the sync completes, you can query your HiBob data in PostHog.

## Available tables

| Table       | Description                                                                | Sync method  |
| ----------- | -------------------------------------------------------------------------- | ------------ |
| `employees` | Employee profiles and HR data, including inactive and offboarded employees | Full refresh |
| `tasks`     | Tasks in HiBob                                                             | Full refresh |

All tables use **full refresh** syncing, which re-imports all records from HiBob on every sync. HiBob doesn't expose updated-at filters on employees, so incremental syncing isn't available.

Employee data is returned with human-readable values – list and reference fields are flattened into readable strings rather than raw IDs.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
