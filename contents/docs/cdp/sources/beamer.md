---
title: Linking Beamer as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Beamer
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Beamer connector syncs your changelog posts, feature requests, comments, votes, reactions, and NPS responses into the PostHog Data warehouse, so you can analyze product engagement and feedback alongside your product data.

## Prerequisites

You need a Beamer account with access to your API key. Some tables have additional requirements: the Users table needs a Beamer Scale plan, and some post queries need the key's "Read posts (ignore filters)" permission.

## Adding a data source

<SourceSetupIntro />

When linking Beamer, you'll need:

- **API key** – find it in your [Beamer account settings](https://app.getbeamer.com/settings#api). Beamer sends it in the `Beamer-Api-Key` header.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key may be invalid or revoked. Generate a new key in your Beamer account settings, then reconnect.
- If a table fails with a permission error, your key may be missing the plan or permission needed to sync it. The Users table needs a Scale plan, and some post queries need the "Read posts (ignore filters)" permission. Adjust the key in your Beamer account settings, then reconnect.

<TroubleshootingLink />
