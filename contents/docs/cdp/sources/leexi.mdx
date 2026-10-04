---
title: Linking Leexi as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Leexi
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Leexi connector pulls your Leexi conversation intelligence data — calls with transcripts and AI summaries, call notes, meeting events, users, and teams — into the PostHog data warehouse.

## Prerequisites

- A Leexi plan with API access.
- A Leexi admin account to create the API key.

## Adding a data source

<SourceSetupIntro />

You need a Leexi API key pair. Create one in Leexi under **Settings** > **Company settings** > **API keys** (requires an admin account), then copy the key ID and key secret.

Grant these permission scopes so every table can sync:

- `read_calls` (calls and call notes)
- `read_meeting_events`
- `read_users`
- `read_teams`

The key's call access scope also controls which calls sync: a whole-company key syncs every call, while a key restricted to one user or to access rules only syncs the calls it can see.

## Sync modes

<SyncModes />

The `calls` table supports incremental syncs on `updated_at` (recommended), `created_at`, or `performed_at`. The other tables reload in full on each sync because the Leexi API exposes no update-time filter for them.

The `call_notes` table fetches notes one call at a time, so syncing it on a large call history can be slow under Leexi's API rate limit. It's disabled by default; enable it only if you need the per-note translations it adds over the summaries already included on each call row.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Source validation fails**: check that the key ID and secret were copied correctly and that the key wasn't revoked in Leexi.
- **A table shows a permission error**: the API key is missing that table's permission scope. Edit the key's scopes in Leexi or create a new key with the scopes listed above.
- **Syncs fail with `402 Payment Required`**: your Leexi subscription is inactive, or your plan doesn't include API access.

<TroubleshootingLink />
