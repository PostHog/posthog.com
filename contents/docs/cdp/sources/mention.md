---
title: Linking Mention as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Mention
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Mention connector syncs your monitored accounts, alerts, mentions, and tags into PostHog, so you can analyze them alongside your product data.

## Prerequisites

You need a Mention account with API access, which is a paid add-on to Mention plans, and an access token created from an API application.

## Adding a data source

<SourceSetupIntro />

When linking Mention, you'll need:

- **Access token** – create one by registering an API application at [dev.mention.com](https://dev.mention.com). Note that Mention API access is a paid add-on to Mention plans.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
