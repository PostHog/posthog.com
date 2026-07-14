---
title: Linking Onfleet as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Onfleet
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Onfleet connector syncs your Onfleet last-mile delivery data – tasks, workers, teams, hubs, and more – into PostHog.

## Prerequisites

You need an Onfleet account with access to create an API key. Onfleet API keys are org-scoped and grant read access to your organization's data.

## Adding a data source

<SourceSetupIntro />

When linking Onfleet, you'll need:

- **API key** – create one in your [Onfleet dashboard](https://onfleet.com/dashboard#/manage) under **Settings → API & Webhooks**. Onfleet API keys are org-scoped and grant read access to your organization's data.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
