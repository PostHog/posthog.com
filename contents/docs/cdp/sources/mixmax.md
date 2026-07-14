---
title: Linking Mixmax as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: MixMax
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Mixmax connector syncs your Mixmax data – sequences, messages, rules, snippets, meeting types, insights reports, and more – into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a Mixmax account on a Growth+ or Enterprise plan with the API feature enabled on your workspace. The token is scoped to you as its creator, so it can only sync data you can access.

## Adding a data source

<SourceSetupIntro />

When linking Mixmax, you'll need:

- **API token** – create one under **Settings ▸ Integrations ▸ API** in Mixmax. The token is scoped to you as its creator, so it can only sync data you can access.

## Sync modes

<SyncModes />

This source is full refresh only. Every table is reloaded on each sync because the API does not expose a reliable updated-at cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
