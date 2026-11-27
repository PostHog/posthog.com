---
title: Linking Mixmax as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: MixMax
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Mixmax connector syncs sequences, messages, snippets, rules, live feed, meeting notes, and related resources into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Before connecting Mixmax, make sure you have:

- A Mixmax **Growth+ or Enterprise** plan – the API is not available on Free, and API access must be enabled on your workspace.
- An **API token**, created per user under **Settings ▸ Integrations ▸ API** in Mixmax. The token is scoped to the user that creates it, so it can only sync data that user can access.

## Adding a data source

<SourceSetupIntro />

Enter your Mixmax API token to sync your Mixmax data.

Create an API token under **Settings ▸ Integrations ▸ API** in Mixmax. The token is scoped to the user that creates it, so it can only sync data that user can access.

API access requires a Growth+ or Enterprise plan with the API feature enabled on your workspace.

You'll be asked for:

- **API token**

## Sync modes

<SyncModes />

All Mixmax tables are full refresh. Each sync replaces the contents of the table.

The `live_feed_events` table makes one request per live feed message, so it is not selected by default. Enable it only if you need per-event detail (opens, clicks, downloads, and replies), and expect a large live feed to take a while to sync.

The `meeting_summaries` and `meeting_transcripts` tables need Mixmax meeting notes on your workspace, so they are not selected by default. `meeting_transcripts` makes one request per meeting summary. Without workspace-wide transcript access in Mixmax, they hold only the meetings that the token's user owns.

The `sequence_recipients` table makes at least one request per sequence, and `team_members` makes one request per team. Mixmax lists at most 10,000 recipients per sequence through the API, so recipients past that limit are not synced.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **"Invalid Mixmax API token"** – the token is wrong, was revoked, or was never enabled. Create a new token under **Settings ▸ Integrations ▸ API** and reconnect.
- **API access not enabled** – the Mixmax API requires a Growth+ or Enterprise plan with the API feature enabled on your workspace. Confirm your plan and workspace settings, then reconnect.
- **Slow or throttled syncs** – Mixmax caps API usage at 120 requests per minute per user and IP address and is optimized for lightweight, real-time use rather than bulk export. Large tables can take a while to sync; lower your sync frequency if you hit rate limits.

<TroubleshootingLink />
