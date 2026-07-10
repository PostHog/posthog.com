---
title: Linking SafetyCulture as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SafetyCulture
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The SafetyCulture (formerly iAuditor) connector syncs your workplace operations data — inspections, audits, corrective actions, issues, assets, and more — into the PostHog data warehouse.

## Creating a SafetyCulture API token

SafetyCulture uses Bearer token authentication with an API key. The key grants read access to your organization's data via the [Data Feeds API](https://developer.safetyculture.com/reference/data-feeds).

1. Log in to your SafetyCulture account.
2. Navigate to your account settings and find the API section.
3. Generate a new API key.
4. Copy the key.

For more details, see [SafetyCulture's API documentation](https://developer.safetyculture.com).

> **Note:** SafetyCulture API tokens expire after 30 days of inactivity. If your syncs start failing with authentication errors, generate a new token.

## Linking SafetyCulture

1. Go to the [Data pipeline sources page](https://app.posthog.com/data-management/sources) in PostHog.
2. Click **+ New source** and then click **Link** next to SafetyCulture.
3. Paste your SafetyCulture **API key**.
4. Click **Next**, choose the tables you want to sync, and then click **Import**.

Once the sync completes, you can query your SafetyCulture data directly in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync modes

Four tables support **incremental** syncing using `modified_at` as the cursor — only new or updated records sync on each run:

- `inspections`
- `inspection_items`
- `templates`
- `actions`

The remaining six tables use **full refresh** — all data reloads on each sync. The SafetyCulture Data Feeds API doesn't support server-side `modified_after` filtering for these endpoints.

## Available tables

| Table              | Description                                                                                       | Sync method  |
| ------------------ | ------------------------------------------------------------------------------------------------- | ------------ |
| `inspections`      | Inspections (audits) conducted from templates, with scores, timings, and locations                | Incremental  |
| `inspection_items` | Individual questions/items answered within inspections, with responses, scores, and media         | Incremental  |
| `templates`        | Inspection templates that inspections are conducted from                                          | Incremental  |
| `actions`          | Corrective actions raised against inspection items, with priority, status, and assignment context | Incremental  |
| `issues`           | Issues reported in SafetyCulture, with category, priority, status, and linked inspection/site     | Full refresh |
| `assets`           | Assets tracked in SafetyCulture, with type, custom fields, site, and state                        | Full refresh |
| `users`            | Users in your SafetyCulture organization                                                          | Full refresh |
| `groups`           | User groups in your SafetyCulture organization                                                    | Full refresh |
| `sites`            | Sites (locations, areas, regions, states, or countries) in your SafetyCulture organization        | Full refresh |
| `schedules`        | Recurring inspection schedules, with recurrence patterns, templates, and sites                    | Full refresh |
