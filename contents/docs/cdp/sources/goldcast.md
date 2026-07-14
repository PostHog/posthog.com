---
title: Linking Goldcast as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Goldcast
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Goldcast connector syncs your virtual event and webinar data into PostHog, so you can analyze event engagement alongside your product data.

## Prerequisites

You need a Goldcast Pro, Premium, or Enterprise plan, and the token feature must be enabled by Goldcast support. An org admin can then create a personal access token.

## Adding a data source

<SourceSetupIntro />

When linking Goldcast, you'll need:

- **API token** – an org admin can create a personal access token in Goldcast Studio under **Settings → Tokens**. The token is shown only once, so copy it immediately.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
