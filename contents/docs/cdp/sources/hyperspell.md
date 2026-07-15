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

The Hyperspell connector pulls your app's AI memory layer into the PostHog data warehouse: indexed memories, data-source connections, extracted entities, prior queries, and generated context documents.

## Prerequisites

You need a [Hyperspell](https://hyperspell.com/) account with an API key created in the [Hyperspell dashboard](https://app.hyperspell.com/). API keys are region-specific, so note whether your Hyperspell app lives in the US or EU region.

## Adding a data source

<SourceSetupIntro />

The source needs:

- **API key**: created in the [Hyperspell dashboard](https://app.hyperspell.com/).
- **Region**: the Hyperspell region your app lives in (US or EU). A key only works in the region it was created in.
- **User IDs** (optional): memories, connections, vaults, and entities in Hyperspell are scoped to individual users of your app. To sync them, enter a comma-separated list of user IDs – each is fetched on Hyperspell's `X-As-User` header. Leaving this empty syncs app-level data only.

## Sync modes

<SyncModes />

Hyperspell's API doesn't expose server-side timestamp filters, so all tables sync as a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **"Invalid Hyperspell API key"** when connecting: the key is invalid, expired, or was created in a different region than the one selected. Check the region and generate a fresh key in the Hyperspell dashboard if needed.
- **`memories` or `connections` tables are empty**: this data is per-user in Hyperspell. Add the user IDs you want to sync to the **User IDs** field of the source settings.

<TroubleshootingLink />
