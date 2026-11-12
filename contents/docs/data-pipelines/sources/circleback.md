---
title: Linking Circleback as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Circleback
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Circleback connector syncs your meeting data into the PostHog Data Warehouse, so you can analyze meetings, transcripts, and action items alongside your product data.

## Prerequisites

You need a Circleback account and an API key. The connector syncs every meeting the key's owner can access, including meetings shared with them. It excludes private notes.

## Adding a data source

<SourceSetupIntro />

When linking Circleback, you'll need:

- **API key**: In Circleback, go to **Settings > API keys** and create a key, as described in the [Circleback API guide](https://circleback.ai/docs/api#authentication). Keys start with `cb_` and are only shown once when you create them. Copy the key and enter it in PostHog's **API key** field.

## Sync modes

All Circleback tables support **Full refresh** only. Each sync reloads the whole table. Incremental and append-only syncs aren't supported. See [sync methods](/docs/data-pipelines/sources#sync-methods) for more information.

The `transcripts` table makes a separate request for each meeting. Circleback's Free plan limits requests to 20 per minute, so syncing transcripts for a large meeting history can be slow. See [Circleback's rate limits](https://circleback.ai/docs/api#rate-limits).

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

The connector requests [all accessible meetings](https://circleback.ai/docs/api/meetings/list-meetings), rather than only meetings you own. It fetches action items with both `PENDING` and `DONE` statuses, regardless of assignee.

Each row in `transcripts` contains a transcript segment and the `meeting_id` it belongs to. See [Circleback's transcript reference](https://circleback.ai/docs/api/meetings/get-meeting-transcript) for the response format.

## Troubleshooting

- **Authentication or access error**: If Circleback rejects your key with `401 Unauthorized` or `403 Forbidden`, create a new key under **Settings > API keys**, then reconnect the source.
- **Can't reach the Circleback API**: If credential validation reports a connection failure or an unexpected status code, try again in a few minutes.
- **Missing meetings**: Check that the API key's owner can access the meetings in Circleback. The connector includes shared meetings, but it can't sync meetings that the key's owner can't access. Private notes are excluded from the sync.
- **Missing transcripts**: The connector skips an individual meeting's transcript if Circleback returns `403` or `404` for that transcript. Check that the meeting still exists and that the key's owner can access its transcript.
- **Slow transcript syncs**: Each meeting needs a separate transcript request. Check your account's [API rate limits](https://circleback.ai/docs/api#rate-limits), including requests from other integrations using the same Circleback account.
- **Missing or expired recording URLs**: The `recordingUrl` field is only set when saving recordings is enabled in Circleback. Recording URLs are valid for 24 hours.

<TroubleshootingLink />
