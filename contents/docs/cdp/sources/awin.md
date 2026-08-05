---
title: Linking Awin as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Awin
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Awin connector syncs your Awin affiliate data into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need an Awin account and a personal OAuth2 token. The same token grants access to every publisher account your user can see.

## Adding a data source

<SourceSetupIntro />

When linking Awin, you'll need:

- **API token** – create a personal OAuth2 token from the [Awin API settings](https://ui.awin.com/awin-api). The same token grants access to every publisher account your user can see.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
