---
title: Linking Intruder as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Intruder
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Intruder connector syncs your attack-surface and vulnerability data into PostHog, so you can analyze your security posture alongside your product data.

## Prerequisites

You need an Intruder account with an API access token. API scanning of targets requires the appropriate Intruder plan license.

## Adding a data source

<SourceSetupIntro />

When linking Intruder, you'll need:

- **API access token** – create one under **My account > API Access Tokens** in your [Intruder account](https://portal.intruder.io/). The token is shown only once, so copy it immediately.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your API access token is invalid, create a new token under **My account > API Access Tokens**, then reconnect.
- If scanning fails or targets are missing, confirm your Intruder plan includes API scanning of targets.

<TroubleshootingLink />
