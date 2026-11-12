---
title: Linking Toggl Track as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Toggl
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Toggl Track connector syncs your time tracking data – workspaces, projects, clients, tags, tasks, workspace users, and time entries – into PostHog, so you can analyze how your team spends time alongside your product data.

## Prerequisites

You need a Toggl Track account and an API token. Find the token at the bottom of your [Toggl Track profile settings](https://track.toggl.com/profile).

The token determines what data the sync can read. Use a workspace admin's token to sync the time entries of every member and the list of workspace users. A non-admin token only sees the token owner's own time entries.

## Adding a data source

<SourceSetupIntro />

When linking Toggl Track, you need:

- **API token** – your Toggl Track API token from your profile settings.

## Sync modes

<SyncModes />

- The `projects` and `tasks` tables support incremental sync via the `at` (last modified) field.
- The `time_entries` table supports incremental sync on the `start` field with a default 7-day lookback window. Each incremental run re-reads the last 7 days to pick up recent timesheet corrections. Run a full refresh to catch edits to older entries, or configure a longer lookback in the schema settings.
- The `workspaces`, `clients`, `tags`, and `workspace_users` tables use full refresh sync.

## Rate limiting

Toggl Track limits API requests per hour based on your plan. On a smaller plan, the first sync of a large workspace can run out of requests before it finishes. If this happens, the sync retries automatically. Use incremental sync or sync fewer tables to reduce the number of requests each run needs.

## Workspace access

The connector reads all workspaces the API token's user belongs to. Each table is synced across every workspace, with a few exceptions:

- **Plan restrictions** – a table automatically skips any workspace whose Toggl Track plan does not include that data (e.g. tasks on a free plan).
- **Permission restrictions** – the `workspace_users` table skips workspaces where the token's user is not an admin, since Toggl Track returns a 403 for non-admin users listing members.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
