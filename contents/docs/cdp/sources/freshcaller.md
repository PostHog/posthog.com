---
title: Linking Freshcaller as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Freshcaller
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Freshcaller connector syncs your call-center data into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a Freshcaller account, your account name (the subdomain in your Freshcaller URL), and your API key.

## Adding a data source

<SourceSetupIntro />

When linking Freshcaller, you'll need:

- **Freshcaller account name** – the subdomain in your Freshcaller URL, e.g. `acme` for `acme.freshcaller.com`.
- **API key** – found on your Freshcaller profile settings page. Click your profile picture → **Profile settings**; the API key is shown in the right sidebar.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
