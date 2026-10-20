---
title: Linking Statsig as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Statsig
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

> **Alpha:** This connector is in alpha. The interface and available tables may change.

The Statsig connector syncs your feature gates, experiments, dynamic configs, layers, segments, metric definitions, audit logs, and project members from [Statsig](https://statsig.com) into PostHog's data warehouse.

This connector does not import raw events, measured metric values, or webhooks.

## Prerequisites

You need a Statsig account with a Console API key that has read access to the tables you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Statsig, you'll need:

- **Console API key** – created in [Statsig Project Settings](https://console.statsig.com/api_keys). The key needs read access to the tables you select.

To create a key:

1. Log in to [Statsig](https://console.statsig.com).
2. Go to **Project Settings** → **API Keys**.
3. Create a Console API key with read access to the resources you want to sync.
4. Copy the key and paste it into PostHog.

> **Note:** The `users` table contains Statsig project members (people with access to your Statsig project), not your tracked end users.

## Sync modes

<SyncModes />

All Statsig tables are full refresh only. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **401 error when connecting**: Statsig rejected your API key. Check that you're using a valid Console API key, not an SDK key or client key. Create a new key in [Statsig Project Settings](https://console.statsig.com/api_keys) and reconnect.

- **403 error on a specific table**: Your Console API key doesn't have read access to that table. Update the key's permissions in Statsig to grant read access, then reconnect.

- **Metrics table has no values**: The `metrics` table syncs metric definitions (name, type, directionality, lineage) – not measured metric values. Metric values are not available through this connector.

<TroubleshootingLink />
