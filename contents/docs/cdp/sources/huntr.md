---
title: Linking Huntr as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Huntr
---

The Huntr connector syncs your recruiting and job search tracking data into PostHog, including members, advisors, candidates, jobs, job posts, employers, activities, and actions.

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in alpha. Endpoint behavior was verified against Huntr's public Organization API documentation but hasn't been tested against every edge case in production. If you run into issues, please let us know.

</CalloutBox>

## Creating a Huntr access token

Huntr uses Bearer token authentication with an organization access token. The token grants read access to your organization's data.

1. Log in to your Huntr organization admin dashboard.
2. Navigate to the API or access token settings.
3. Generate an organization access token.
4. Copy the token.

For more details, see [Huntr's API documentation](https://docs.huntr.co).

## Linking Huntr

1. Go to the [Data pipeline sources page](https://app.posthog.com/data-management/sources) in PostHog.
2. Click **+ New source** and then click **Link** next to Huntr.
3. Paste your Huntr **organization access token**.
4. Click **Next**, choose the tables you want to sync, and then click **Import**.

Once the sync completes, you can query your Huntr data directly in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync modes

All Huntr tables use **full refresh** syncing — data is completely re-downloaded on every sync. The Huntr Organization API doesn't expose reliable `updated_after` filters across its endpoints, so incremental syncing is not supported.

## Available datasets and endpoints

| Dataset      | Endpoint path | Sync mode    | Primary key |
| ------------ | ------------- | ------------ | ----------- |
| `members`    | `/members`    | Full refresh | `id`        |
| `advisors`   | `/advisors`   | Full refresh | `id`        |
| `candidates` | `/candidates` | Full refresh | `id`        |
| `jobs`       | `/jobs`       | Full refresh | `id`        |
| `job_posts`  | `/job_posts`  | Full refresh | `id`        |
| `employers`  | `/employers`  | Full refresh | `id`        |
| `activities` | `/activities` | Full refresh | `id`        |
| `actions`    | `/actions`    | Full refresh | `id`        |

All endpoints use the Huntr Organization API (`api.huntr.co/org`).
