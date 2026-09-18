---
title: Linking Split as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SplitIo
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Split (Harness FME) Admin API key to pull your workspaces, environments, feature flags, segments, and change requests into the PostHog data warehouse.

## Prerequisites

You need an **Admin API key** for your Split organization. Client-side and server-side SDK keys won't work. Creating Admin API keys requires administrator access in Split.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Split.io.
3. In Split, go to **Admin settings** → **API keys** and create a new API key with the **Admin** type. Copy the key.
4. Back in PostHog, enter the Admin API key and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Split data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `workspaces` | Workspaces in your Split organization | Full refresh |
| `environments` | Environments, fetched per workspace | Full refresh |
| `traffic_types` | Traffic types, fetched per workspace | Full refresh |
| `feature_flags` | Feature flags (splits), fetched per workspace | Full refresh |
| `segments` | Segments, fetched per workspace | Full refresh |
| `rollout_statuses` | Rollout statuses, fetched per workspace | Full refresh |
| `flag_sets` | Flag sets, fetched per workspace | Full refresh |
| `groups` | Groups in your organization | Full refresh |
| `users` | Active members of your organization | Full refresh |
| `change_requests` | Change requests awaiting or past approval | Full refresh |

Tables fetched per workspace carry an injected `_workspace_id` column identifying the workspace each row came from.

## Sync limitations

Split's Admin API exposes no server-side timestamp filter on these resources, so every table is full refresh only and reloads all records on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
