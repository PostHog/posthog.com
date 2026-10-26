---
title: Linking Recall.ai as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: RecallAI
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Recall.ai connector syncs bots, recordings, transcripts, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync meeting bots, recordings, transcripts, participant events, and calendar data from Recall.ai.

You'll be asked for:

- **API key**: create an API key in your Recall.ai dashboard under API keys.
- **Region**: API keys only work in the region they were created in. Find yours in your Recall.ai dashboard URL.

## Sync modes

<SyncModes />

Some Recall.ai tables support **incremental** sync. Each incremental sync uses the incremental field to fetch only rows that are newer than the last sync. Full refresh is also available for these tables.

| Table                     | Sync methods                   | Incremental field |
| ------------------------- | ------------------------------ | ----------------- |
| `recordings`              | Incremental sync, full refresh | `created_at`      |
| `transcripts`             | Incremental sync, full refresh | `created_at`      |
| `participant_events`      | Incremental sync, full refresh | `created_at`      |
| `meeting_metadata`        | Incremental sync, full refresh | `created_at`      |
| `calendar_events`         | Incremental sync, full refresh | `updated_at`      |
| `bots`                    | Full refresh                   | –                 |
| `calendars`               | Full refresh                   | –                 |
| `desktop_sdk_uploads`     | Full refresh                   | –                 |
| `meeting_direct_connects` | Full refresh                   | –                 |

A full refresh sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
