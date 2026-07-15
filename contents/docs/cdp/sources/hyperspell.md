---
title: Linking Hyperspell as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Hyperspell
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

[Hyperspell](https://hyperspell.com) is a memory layer for AI applications. This connector syncs your memories, connections, integrations, extracted entities, query logs, and context documents into the PostHog Data Warehouse so you can analyze your AI application's knowledge and retrieval alongside your product data.

## Prerequisites

A Hyperspell account with an API key. Hyperspell data is scoped per user, so decide whether you want to sync a specific user's memories or only app-scoped data before you start.

## Adding a data source

<SourceSetupIntro />

When linking Hyperspell, you'll need:

- **API key** – create one in the [Hyperspell dashboard](https://dashboard.hyperspell.com) and paste it into the connection form.
- **Region** – choose the region the key was created in: US (`api.hyperspell.com`) or EU (`api.eu.hyperspell.com`). Keys only work against the region they belong to.
- **User ID** (optional) – set a user ID to sync that user's memories, or leave it blank to sync app-scoped data only.

## Sync modes

<SyncModes />

All Hyperspell tables are full refresh only. Incremental sync is not available for this connector.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, confirm the API key is active and that the selected region matches the region the key was created in.
- If user-scoped tables like `memories` sync no rows, check that the **User ID** is set and matches a user with data in Hyperspell. Leaving it blank syncs app-scoped data only.

<TroubleshootingLink />
