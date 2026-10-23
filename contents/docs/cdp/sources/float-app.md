---
title: Linking Float as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: FloatApp
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Float connector syncs your resource-management data into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a Float account and an access token, which you can create under **Team Settings → Integrations → API**. The token has the same access as its account owner.

## Adding a data source

<SourceSetupIntro />

When linking Float, you'll need:

- **Access token** – create one in Float under **Team Settings → Integrations → API**. The token has the same access as its account owner.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because Float's API exposes no server-side modified-since filter on its core resources.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
