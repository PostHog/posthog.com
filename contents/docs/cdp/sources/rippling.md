---
title: Linking Rippling as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Rippling
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Rippling connector automatically pulls your Rippling workforce and HR data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Rippling.
3. You need a Rippling API token. In your Rippling admin console, go to **Settings** > **Company Settings** > **API Access** and create a scoped API token. Enable the read scope for each dataset you want to sync (see [required scopes](#required-scopes) below).
4. Back in PostHog, enter the token in the **API token** field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Rippling data in PostHog.

<CalloutBox icon="IconWarning" title="Token expiry" type="caution">

Rippling API tokens expire after 30 days of inactivity. If syncs start failing with authentication errors, generate a new token in Rippling and update it in PostHog.

</CalloutBox>

## Available tables

| Table              | Description                                              | Sync method |
| ------------------ | -------------------------------------------------------- | ----------- |
| `workers`          | Employee and contractor records                          | Incremental |
| `users`            | Rippling platform users                                  | Incremental |
| `companies`        | Company information                                      | Incremental |
| `departments`      | Organizational departments                               | Incremental |
| `teams`            | Team groupings                                           | Incremental |
| `levels`           | Job levels and seniority tiers                           | Incremental |
| `work_locations`   | Office and work location records                         | Incremental |
| `employment_types` | Employment type definitions (full-time, part-time, etc.) | Incremental |
| `compensations`    | Compensation and salary data                             | Incremental |

**Incremental** tables sync only new or updated records on each run using `updated_at` or `created_at` cursors.

## Required scopes

Rippling API tokens are scoped per dataset. Your token needs the read permission for each table you want to sync. If a scope is missing, that specific table fails with a permissions error while other tables continue to sync normally.

| Table              | Required scope          |
| ------------------ | ----------------------- |
| `workers`          | `workers.read`          |
| `users`            | `users.read`            |
| `companies`        | `companies.read`        |
| `departments`      | `departments.read`      |
| `teams`            | `teams.read`            |
| `levels`           | `levels.read`           |
| `work_locations`   | `work-locations.read`   |
| `employment_types` | `employment-types.read` |
| `compensations`    | `compensations.read`    |

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
