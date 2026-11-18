---
title: Linking Common Room as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CommonRoom
---

The Common Room connector syncs your Common Room contacts, organizations, activities, website visits, segments, and custom objects into the PostHog data warehouse. It also syncs reference data such as tags, topics, providers, custom fields, lead scores, activity types, activity categories, and object types.

> **Note:** The Common Room source is in beta.

## Linking Common Room

1. In Common Room, go to **Settings > API tokens** and create an API token. You must be a Common Room admin to create a token.
2. In PostHog, go to the [Data pipeline sources page](https://app.posthog.com/data-management/sources), click **+ New source**, and then click **Link** next to Common Room.
3. Paste your **API token**.
4. Click **Next**, choose the tables you want to sync, and then click **Import**.

Once the sync completes, you can start querying your Common Room data in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync behavior

- **Incremental sync** – Only the `activities` table supports incremental syncing, on the `activityTime` field. Activities can reach Common Room some time after they happen, so each incremental sync reads the last 3 days of activities again. The sync merges rows on `id`, so this doesn't create duplicates. Append-only syncing isn't available.
- **Full refresh** – All other tables sync as a full refresh on each run.
- **Custom objects** – The `objects` table syncs the objects of each object type. Its primary key is `objectTypeId` and `id`.

## Troubleshooting

If the sync fails with "Common Room rejected your API token", the token is not valid or was deleted. Create a new token in Common Room under **Settings > API tokens**, then reconnect the source.
