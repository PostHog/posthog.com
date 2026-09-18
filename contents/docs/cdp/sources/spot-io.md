---
title: Linking Spot by Flexera as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SpotIO
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Spot by Flexera (Spotinst) connector syncs your cloud cost optimization data into PostHog – Elastigroups, Ocean Kubernetes clusters, stateful nodes, and per-instance cost/savings breakdowns. Use it to join FinOps data with your product analytics, build cost dashboards, or correlate infrastructure spend with revenue and usage.

## Prerequisites

You need a Spot by Flexera account with an API token. The token grants read access to your Elastigroup, Ocean, and Stateful Node resources plus their cost data.

## Adding a data source

<SourceSetupIntro />

When linking Spot by Flexera, you'll need:

- **API token** (required) – generate one in the [Spot console](https://console.spotinst.com/) under **Settings → API → Permanent Token**.
- **Account ID** (optional) – your Spot account ID (e.g. `act-123abcd`). Only required if your token has access to multiple accounts and you want to scope the sync to a specific one.

## Sync modes

<SyncModes />

The Spot by Flexera API doesn't expose a reliable server-side timestamp filter on any endpoint, so every table syncs with a full refresh on each run. The `elastigroup_costs` table pulls a fixed rolling 30-day window of per-instance cost data.

| Table               | Sync method  |
| ------------------- | ------------ |
| `elastigroups`      | Full refresh |
| `ocean_clusters`    | Full refresh |
| `stateful_nodes`    | Full refresh |
| `elastigroup_costs` | Full refresh |

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Authentication failed (401)** – your API token is invalid or expired. Generate a new permanent token in the Spot console and reconnect the source.
- **Insufficient permissions (403)** – your API token doesn't have the required permissions. Check that the token has read access to the Elastigroup, Ocean, and Managed Instance APIs in your Spot account.

<TroubleshootingLink />
