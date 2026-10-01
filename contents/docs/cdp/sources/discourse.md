---
title: Linking Discourse as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Discourse
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Discourse connector syncs categories, topics, posts, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect your Discourse community forum to sync categories, topics, posts, tags, groups, and user stats.

Generate an Admin API key under **Admin > API > Keys** on your Discourse instance (a key scoped to "Global" access, or scoped to read the tables below, both work). The instance URL is your forum's address, e.g. `https://yourforum.discourse.group`.

You'll be asked for:

- **Instance URL**: for example `https://yourforum.discourse.group`.
- **Admin API key**
- **API username**: for example `system`.

## Sync modes

<SyncModes />

All Discourse tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the admin API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
