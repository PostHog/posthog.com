---
title: Linking Hatchet as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Hatchet
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Hatchet connector syncs workflow runs, tasks, events, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter a Hatchet API token to sync your workflow runs, tasks, and events.

Create a tenant-scoped API token in your Hatchet dashboard under **Settings > API Tokens**. The token encodes your tenant and server URL, so that's usually all you need.

If you self-host Hatchet, or the token can't be decoded, set the **Host** and **Tenant id** fields to point the connection at your instance.

You'll be asked for:

- **API token**: for example `Bearer token from Settings > API Tokens`.

## Sync modes

<SyncModes />

These Hatchet tables support incremental and append sync:

| Table | Incremental field |
| --- | --- |
| `workflow_runs` | `created_at` |
| `tasks` | `created_at` |
| `events` | `created_at` |
| `logs` | `createdAt` |
| `task_events` | `workflow_run_created_at` (the parent workflow run's creation time) |
| `task_timings` | `workflow_run_created_at` (the parent workflow run's creation time) |

The first incremental or append sync of a table reads only the last 30 days.

Each later sync reads again the rows created in an overlap window before the newest synced value. The overlap is 1 day for most tables and 5 minutes for `logs`. Thus a sync gets changes to rows created in that window, such as a run that finished after the last sync. A sync does not get changes to older rows. For example, if a run finishes days after newer runs started, the warehouse keeps its old status. To get these changes, use full refresh. A resync does not help with rows older than 30 days, because it reads only the last 30 days again.

In incremental sync, PostHog merges the overlap rows on the primary key, so the overlap does not add duplicate rows. In append sync, PostHog adds the overlap rows again as duplicates. To prevent duplicate rows, use incremental sync, or deduplicate on the primary key in your queries.

All other Hatchet tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
