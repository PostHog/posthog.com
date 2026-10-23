---
title: Linking Fastly as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Fastly
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Fastly connector syncs your account and service configuration into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a Fastly account and an API token. A read-only token with **global** scope is sufficient to sync every table.

## Adding a data source

<SourceSetupIntro />

When linking Fastly, you'll need:

- **API token** – create one in your [Fastly account settings](https://manage.fastly.com/account/personal/tokens). A read-only token with **global** scope is sufficient to sync every table.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If a table fails with a permissions error, use a read-only token with **global** scope, then reconnect.

<TroubleshootingLink />
