---
title: Linking Wrike as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Wrike
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Wrike connector syncs your project management data into PostHog, so you can analyze work and team activity alongside your product data.

## Prerequisites

You need a Wrike account with access to create a permanent access token. The token needs read access to the resources you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Wrike, you'll need:

- **Permanent access token** – create one under **Apps & Integrations → API** in Wrike. The token needs read access (the default `Default` scope is sufficient) to the resources you want to sync.
- **Host** – the domain shown in your browser when you're logged into Wrike, for example `www.wrike.com`, `app-us2.wrike.com`, or `app-eu.wrike.com`.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
