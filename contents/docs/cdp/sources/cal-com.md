---
title: Linking Cal.com as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CalCom
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Cal.com connector syncs your scheduling data into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a Cal.com account and an API key. The key grants read access to your bookings, event types, schedules, teams, and webhooks.

## Adding a data source

<SourceSetupIntro />

When linking Cal.com, you'll need:

- **API key** – create one under **Settings → Security → API keys** in [Cal.com](https://app.cal.com/settings/developer/api-keys). It looks like `cal_live_...`.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
