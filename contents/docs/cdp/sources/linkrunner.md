---
title: Linking Linkrunner as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Linkrunner
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Linkrunner connector syncs your mobile attribution data – campaigns, attributed users, and reporting campaigns – into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a Linkrunner account and an API key. The `reporting_campaigns` table is served by Linkrunner's Reporting API, which is rate limited to one request per minute, so syncing it can take a while for accounts with many campaigns.

## Adding a data source

<SourceSetupIntro />

When linking Linkrunner, you'll need:

- **API key** – find it in your [Linkrunner dashboard](https://www.linkrunner.io/) under settings.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
