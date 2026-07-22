---
title: Linking SmartEngage as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SmartEngage
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The SmartEngage connector syncs your marketing automation data into the PostHog Data warehouse, so you can analyze your avatars, tags, custom fields, and automation sequences alongside your product data.

## Prerequisites

You need a SmartEngage account with access to your API key.

## Adding a data source

<SourceSetupIntro />

When linking SmartEngage, you'll need:

- **API key** – find it in your [SmartEngage](https://smartengage.com/) account settings. The key grants access to the avatars on your account and the tags, custom fields, and sequences scoped to them.

## Sync modes

<SyncModes />

This source is full-refresh only. The SmartEngage API has no timestamp filters, so every table is fully re-synced on each run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Tags, custom fields, and sequences are scoped per avatar: PostHog lists your avatars first and then fetches each avatar's records, so these tables include an `avatar_id` column you can join back to the `avatars` table.

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Generate a new key in your SmartEngage account settings, then reconnect.

<TroubleshootingLink />
