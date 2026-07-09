---
title: Linking Ruddr as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Ruddr
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Ruddr connector syncs your professional services data – clients, projects, tasks, members, and time entries – into PostHog, so you can analyze work and team activity alongside your product data.

## Prerequisites

You need a Ruddr account and a workspace API key. The key needs read access to the resources you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Ruddr, you'll need:

- **API key** – create one under **Settings → API Keys** in [Ruddr](https://www.ruddr.io). The key grants read access to your clients, projects, tasks, members, and time entries.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
