---
title: Linking Attio as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Attio
---

The Attio connector can link companies, people, deals, lists, users, workspaces, notes, tasks, workspace members, activities, objects, attributes, select options, statuses, and list entries to PostHog.

To link Attio:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Attio.

3. Next, you need an access token from Attio. Go to your [developer settings](https://attio.com/help/reference/integrations-automations/generating-an-api-key) in Attio and create a new access token with the following read scopes: `object_configuration:read`, `list_configuration:read`, `record_permission:read`, `record:read`, `list_entry:read`, `note:read`, `task:read`, `user_management:read`, and `activity_configuration:read`.

4. Back in PostHog, paste the access token in the `Access token` field and click **Next**.

5. On the next page, set up the schemas you want to sync and modify the method and frequency as needed. Once done, click **Import**.

Once the syncs are complete, you can start using Attio data in PostHog.

## Optional standard objects

The `users`, `workspaces`, and `deals` schemas are optional standard objects in Attio. They only exist in Attio workspaces that have enabled them.

If you try to sync one of these schemas and it isn't enabled in your Attio workspace, the sync fails with an error like:

> "Attio rejected the request for this object query. Please verify the schema is available in Attio and that the request is valid, then try again."

To fix this, either enable the object in your Attio workspace or disable syncing for that schema in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
