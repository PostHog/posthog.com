---
title: Linking Spot by Flexera as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SpotIo
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Spot by Flexera (Spotinst) connector syncs your cloud cost optimization data into PostHog – accounts, Elastigroups and their activity events, Ocean Kubernetes clusters and their nodes, stateful nodes, and per-instance cost/savings breakdowns. Use it to join FinOps data with your product analytics, build cost dashboards, or correlate infrastructure spend with revenue and usage.

## Prerequisites

You need a Spot by Flexera account with an API token. The token grants read access to your Elastigroup, Ocean, and Stateful Node resources plus their cost data.

To sync the `accounts` table, use a token from an Organization Admin. Listing all accounts in the organization needs this role.

## Adding a data source

<SourceSetupIntro />

When linking Spot by Flexera, you'll need:

- **API token** (required) – generate one in the [Spot console](https://console.spotinst.com/) under **Settings → API → Permanent Token**.
- **Account ID** (optional) – your Spot account ID (e.g. `act-123abcd`). Only required if your token has access to multiple accounts and you want to scope the sync to a specific one. The `accounts` table ignores this setting and always lists every account in the organization.

## Sync modes

<SyncModes />

The Spot by Flexera API doesn't expose a reliable server-side timestamp filter on most endpoints, so most tables sync with a full refresh on each run. The `elastigroup_costs` table pulls a fixed rolling 30-day window of per-instance cost data.

The `elastigroup_events` table supports incremental sync on `createdAt`. A full refresh, and the first incremental sync, pull the last 90 days of events. Later syncs start from the date of the last synced event. Incremental sync for this table uses merge, not append, because each run reads that last day again.

| Table                 | Sync method  |
| --------------------- | ------------ |
| `elastigroups`        | Full refresh |
| `ocean_clusters`      | Full refresh |
| `stateful_nodes`      | Full refresh |
| `elastigroup_costs`   | Full refresh |
| `elastigroup_events`  | Incremental  |
| `accounts`            | Full refresh |
| `ocean_cluster_nodes` | Full refresh |

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Authentication failed (401)** – your API token is invalid or expired. Generate a new permanent token in the Spot console and reconnect the source.
- **Insufficient permissions (403)** – your API token doesn't have the required permissions. Check that the token has read access to the Elastigroup, Ocean, and Managed Instance APIs in your Spot account. If only the `accounts` table fails, use a token from an Organization Admin.

<TroubleshootingLink />
