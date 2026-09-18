---
title: Linking CAST AI as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CAST_AI
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The CAST AI connector syncs your Kubernetes cost and savings data from [CAST AI](https://cast.ai) into the PostHog data warehouse. This lets you analyze cluster costs, spot vs on-demand spend, and optimization savings alongside your product analytics.

## Prerequisites

You need a CAST AI account with API access enabled. A read-only API key is sufficient.

## Adding a data source

<SourceSetupIntro />

When linking CAST AI, you'll need:

- **API key** – create one in your [CAST AI console](https://docs.cast.ai/docs/api-access) under **API Access** settings.

## Sync modes

<SyncModes />

The `clusters` table always syncs as full refresh since the CAST AI API has no server-side timestamp filter for it.

The `cluster_cost_reports` and `cluster_savings_history` tables support incremental syncs on their timestamp fields, which we recommend to avoid re-fetching historical data on every sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Authentication error (401):** your API key is invalid or has been revoked. Create a new key in your CAST AI console under API Access settings, then reconnect.
- **Permissions error (403):** your API key does not have the required permissions. Check the key's scopes in your CAST AI console, then reconnect.

<TroubleshootingLink />
