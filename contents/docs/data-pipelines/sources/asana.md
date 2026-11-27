---
title: Linking Asana as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Asana
---

The Asana connector pulls your Asana data — workspaces, users, projects, tasks, and more — into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Asana.
3. You need a personal access token from Asana. Create one from the [Asana developer console](https://app.asana.com/0/my-apps). Grant these read scopes so every table can sync: `workspaces:read`, `users:read`, `projects:read`, `tasks:read`, `stories:read`, `goals:read`, `time_tracking_entries:read`, `tags:read`, `teams:read`, `custom_fields:read`, `team_memberships:read`, `portfolios:read`, and `time_tracking_categories:read`. Copy the token value.

> **Note:** The `allocations` table has no read scope of its own, so it needs a token with full access (the `default` scope). Skip it if your token is scoped. The AI Studio tables (`ai_studio_runs`, `ai_studio_seats`) need the `admin.ai_studio_usage:read` scope on an AI Studio-licensed organization. 4. Back in PostHog, paste the token in the `Personal access token` field and click **Next**. 5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Asana data in PostHog.

## Sync limitations

All Asana tables are full refresh only. Asana's list endpoints do not expose a usable server-side timestamp filter, so each sync reloads the full collection.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
