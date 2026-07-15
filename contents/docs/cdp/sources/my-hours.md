---
title: Linking My Hours as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: MyHours
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The My Hours connector syncs your time-tracking data into the PostHog data warehouse, so you can analyze clients, projects, tags, and team members alongside your product data.

## Prerequisites

You need a My Hours account on a paid plan with permission to create an API key. The key is tied to the user who created it, so it stops working if that user is archived or removed.

## Adding a data source

<SourceSetupIntro />

When linking My Hours, you'll need:

- **API key** – create one under **Settings → Integrations → API keys** in your [My Hours account](https://app.myhours.com/). The key grants read access to your clients, projects, tags, and users.

## Sync modes

All My Hours tables use **full refresh** only. The My Hours API does not expose pagination or an updated-since cursor, so there is no incremental sync option.

<SyncModes />

## Sync limitations

- **Time logs are not synced.** The My Hours time-logs report requires mandatory date parameters and is excluded from this connector.
- **Full refresh only.** Every sync reloads all data because the API has no incremental cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key may be invalid or revoked. Create a new key under **Settings → Integrations → API keys** in your My Hours account, then reconnect.
- If you see a permissions error, the key does not have access to this data. Check the key's permissions, then reconnect.
- If the user who created the API key is archived or removed, the key stops working. Create a new key with an active user.

<TroubleshootingLink />
