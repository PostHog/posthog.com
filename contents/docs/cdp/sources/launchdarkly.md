---
title: Linking LaunchDarkly as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: LaunchDarkly
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your LaunchDarkly access token to pull your projects, environments, feature flags, metrics, members, and audit log into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to LaunchDarkly.
3. Create a personal or service access token in your [LaunchDarkly account settings](https://app.launchdarkly.com/settings/authorization). A token with the **Reader** role grants read access to every resource this source syncs. Copy the **Access token**.
4. Back in PostHog, enter the access token and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using LaunchDarkly data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `projects` | Projects in your LaunchDarkly account | Full refresh |
| `members` | Account members | Full refresh |
| `auditlog` | Audit log entries | Full refresh |
| `environments` | Environments, fetched per project | Full refresh |
| `metrics` | Metrics, fetched per project | Full refresh |
| `flags` | Feature flags, fetched per project | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

LaunchDarkly's API exposes no server-side timestamp filter on these resources, so every table is full refresh only and reloads all records on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
