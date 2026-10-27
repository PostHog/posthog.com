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

The Mixmax connector syncs sequences, sequence folders, messages, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

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

The `sequence_recipients` table makes at least one request per sequence, and `team_members` makes one request per team. Mixmax lists at most 10,000 recipients per sequence through the API, so recipients past that limit are not synced.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
