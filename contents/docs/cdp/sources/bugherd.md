---
title: Linking BugHerd as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: BugHerd
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The BugHerd connector syncs your bug tracking and QA data – organization details, projects, tasks, and users – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to BugHerd.
3. You need an **API key** from BugHerd. Find it in BugHerd under **Settings > General Settings** (organization owner/admin access is required).
4. Back in PostHog, enter the API key and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using BugHerd data in PostHog.

## Available tables

| Table          | Description                        | Sync method  |
| -------------- | ---------------------------------- | ------------ |
| `Organization` | Your BugHerd organization details  | Full refresh |
| `Users`        | Users in your BugHerd organization | Full refresh |
| `Projects`     | Projects in your BugHerd account   | Full refresh |
| `Tasks`        | Tasks (bugs) across all projects   | Incremental  |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Only the `Tasks` table supports incremental syncing, using BugHerd's `updated_at` timestamp filter. The API does not expose reliable timestamp filters for other endpoints, so they sync in full each run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
