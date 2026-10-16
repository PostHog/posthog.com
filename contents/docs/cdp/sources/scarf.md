---
title: Linking Scarf as a source
sidebar: Docs
showTitle: true
availability: { free: full, selfServe: full, enterprise: full }
sourceId: Scarf
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Scarf connector syncs your package downloads, tracking pixel views, and the companies Scarf matched to them, so you can connect open source adoption to product usage.

## Prerequisites

- A Scarf account or organization with packages or tracking pixels.
- A Scarf Basic or Premium plan to sync the event and company tables. The `packages` and `tracking_pixels` tables work on any plan.

## Adding a data source

<SourceSetupIntro />

You need:

1. **API token**: copy it from your [Scarf account settings](https://app.scarf.sh/account).
2. **User or organization name**: the Scarf owner of the packages, as it appears in your Scarf URLs.
3. **Days of event history to import first** (optional): how many days of events the first sync reads. Defaults to 31.

## Sync modes

<SyncModes />

`package_events` and `tracking_pixel_events` support incremental syncs on `time`.
Each sync reads one day per request, from the day of the previous sync through today.
Each day counts as one Scarf export run, so a long backfill uses many runs.

A full refresh of an event table exports the whole history window again on every sync, and replaces the table with only those days.
Use incremental syncs for the event tables.

Scarf exports are at-least-once, so the same event can arrive twice. Incremental syncs merge on `id`, which keeps one row per event.

`company_rollup` covers activity from the last month, as Scarf's export does by default.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **"Scarf rejected your API token"**: the token is wrong or revoked. Create a new one.
- **"Scarf refused the export"**: event exports need a Basic or Premium plan, and a member role or higher. Turn off the event tables, or upgrade the plan.
- **"Scarf couldn't find that account or organization"**: check the owner name, as it appears in your Scarf URLs.
- **"One day of Scarf events is larger than PostHog can import in one piece"**: contact PostHog support.
- **"Your Scarf organization has no export runs left"**: add runs in Scarf, then resync.

<TroubleshootingLink />
