---
title: Linking Blueshift as a source
sidebar: Docs
showTitle: true
availability: { free: full, selfServe: full, enterprise: full }
sourceId: Blueshift
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

> **Alpha:** This source is in alpha. If you run into issues, reach out to [our support team](/docs/support).

The Blueshift connector syncs your campaigns, daily campaign performance, message templates, segments, subscription groups and tags into PostHog. Use it to compare campaign sends, opens and revenue with what users do in your product.

## Prerequisites

You need a Blueshift **user API key**. An account admin can find it in Blueshift under **Account settings > API keys**. The event API key does not work for this connector.

You also need to know which region your Blueshift account is hosted in. If your Blueshift dashboard is at `app.eu.getblueshift.com`, pick **EU**. Otherwise pick **US**.

## Adding a data source

<SourceSetupIntro />

Paste the user API key and pick your region.

## Sync modes

<SyncModes />

The `campaign_stats` table syncs incrementally by day. Each sync reads the performance summary for every UTC day since the last sync, and reads the seven days before that again, because opens, clicks and purchases keep arriving after a campaign sends. The first sync reads the last 365 days.

The other tables are small and sync with a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Known limitations

- The `campaigns` table lists one-time campaigns from the last 30 days only. Recurring, ongoing, transactional and onsite campaigns are listed in full. This is how the Blueshift campaigns API works.
- Customer profiles and raw message events are export-only in Blueshift and are not synced.

## Troubleshooting

**Blueshift rejected the API key.** Check that you pasted the user API key, not the event API key, and that the region matches your account.

**The Blueshift API key can't read a table.** Use a user API key with access to that data, or deselect the table.

<TroubleshootingLink />
