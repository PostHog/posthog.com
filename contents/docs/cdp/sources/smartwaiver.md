---
title: Linking Smartwaiver as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Smartwaiver
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Smartwaiver connector syncs your digital waiver data – waiver templates, signed waivers, and check-ins – into PostHog.

## Prerequisites

You need a Smartwaiver account and an account-wide API key, which grants read access to your waiver templates, signed waivers, and check-ins.

## Adding a data source

<SourceSetupIntro />

When linking Smartwaiver, you'll need:

- **API key** – create one under **My Account → API keys** in [Smartwaiver](https://app.smartwaiver.com). The key is account-wide and grants read access to your waiver templates, signed waivers, and check-ins.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If authentication fails, generate a new API key under **My Account → API keys**, then reconnect.

<TroubleshootingLink />
