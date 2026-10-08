---
title: Linking Frill as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Frill
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Frill connector syncs your Frill ideas, votes, comments, followers, and announcements into PostHog, so you can prioritize your roadmap against actual product usage.

## Prerequisites

You need a Frill account with access to its API key.

## Adding a data source

<SourceSetupIntro />

When linking Frill, you'll need:

- **API key** – find your API key under **Settings → Company** in your [Frill dashboard](https://app.frill.co/settings/company).

## Sync modes

<SyncModes />

Frill list endpoints do not expose a server-side updated-since filter, so this source is full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key may be invalid or revoked. Find your API key under **Settings → Company** in your Frill dashboard, then reconnect.

<TroubleshootingLink />
