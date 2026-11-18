---
title: Linking Common Room as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CommonRoom
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

> **Note:** This source is currently in **beta**.

The Common Room connector syncs your community and signal data – contacts, organizations, activities, website visits, segments, tags, custom objects, and more – into PostHog, so you can analyze community engagement alongside your product data.

## Prerequisites

You need a Common Room account with an API token. A Common Room admin can create one under **Settings > API tokens**.

## Adding a data source

<SourceSetupIntro />

When linking Common Room, you'll need:

- **API token** – create one in your Common Room workspace under **Settings > API tokens**. The token grants read access to all endpoints.

## Sync modes

<SyncModes />

The `activities` table supports incremental syncing on the `activityTime` field. Each incremental sync re-reads the last 3 days of activities because they can arrive late from connected signal sources. Duplicates are merged on `id`.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
