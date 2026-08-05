---
title: Linking Cursor as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Cursor
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Cursor connector syncs your team's Cursor usage and spend data into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a Cursor team plan (Business or Enterprise) and an Admin API key created by a team admin.

## Adding a data source

<SourceSetupIntro />

When linking Cursor, you'll need:

- **Admin API key** – a team admin can create one in the [Cursor dashboard](https://cursor.com/dashboard) under **Settings → Cursor Admin API Keys**. It looks like `key_...`.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If key creation is unavailable, confirm your team is on a Business or Enterprise plan and that the key is created by a team admin, then reconnect.

<TroubleshootingLink />
