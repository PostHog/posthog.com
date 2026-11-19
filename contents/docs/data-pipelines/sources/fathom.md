---
title: Linking Fathom as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Fathom
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Fathom connector syncs meetings, summaries, transcripts, and team data from the Fathom AI notetaker into the PostHog data warehouse, so you can analyze meeting data alongside your product data.

## Prerequisites

A Fathom API key. Create one in Fathom under **User settings** > **API access**. The key reads meetings you recorded and meetings shared with you or your team. To sync the `users` table, you need a key that belongs to an account admin.

## Adding a data source

<SourceSetupIntro />

You'll be asked for:

- **API key** – create an API key in Fathom under **User settings** > **API access** and paste it here.

## Sync modes

<SyncModes />

Some Fathom tables support **incremental** sync. Each incremental sync uses the `created_at` field to fetch only rows created since the last sync. Full refresh is also available for these tables.

| Table                 | Sync methods                   | Incremental field | Notes                                                            |
| --------------------- | ------------------------------ | ----------------- | ---------------------------------------------------------------- |
| `meetings`            | Incremental sync, full refresh | `created_at`      | Core meeting data with action items, highlights, and CRM matches |
| `meeting_summaries`   | Incremental sync, full refresh | `created_at`      | AI-generated summaries using the account's default template      |
| `meeting_transcripts` | Incremental sync, full refresh | `created_at`      | Full meeting transcripts                                         |
| `meeting_types`       | Full refresh                   | –                 | Meeting type definitions                                         |
| `teams`               | Full refresh                   | –                 | Organization teams                                               |
| `team_members`        | Full refresh                   | –                 | Team member details                                              |
| `users`               | Full refresh                   | –                 | User accounts and permissions (requires an admin API key)        |

A full refresh sync replaces the contents of the table.

> **Note:** Summaries and transcripts are separate tables because Fathom rate-limits those requests more strictly than other endpoints. Keeping them separate avoids hitting rate limits during syncs.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with "Fathom rejected your API key", create a new key in Fathom under **User settings** > **API access** and try again.

- If the `users` table returns a 403 error, the API key doesn't belong to an account admin. Use an admin's API key to sync users.

- If syncs fail with a rate-limit error, wait a minute and try again. Fathom enforces strict rate limits, especially on summary and transcript requests.

<TroubleshootingLink />
