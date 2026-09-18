---
title: Linking ChartHop as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ChartHop
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The ChartHop connector syncs your people analytics data – people, jobs, org groups, compensation and org changes, and time off – into PostHog, so you can analyze headcount, org structure, and workforce changes alongside your product data.

## Prerequisites

You need a ChartHop account with permission to create an API token.
The token's access level determines which data the source can read.

## Adding a data source

<SourceSetupIntro />

When linking ChartHop, you'll need:

- **API token** – generate one in ChartHop under **Settings → API**.
- **Organization ID or slug** (optional) – only needed if your token can access more than one organization. When the token is scoped to a single organization, PostHog detects it automatically.

## Sync modes

<SyncModes />

Most ChartHop tables are synced with full refresh, since the API doesn't expose an updated-since filter for them.
The `changes` table supports incremental sync on the change's effective `date`.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
