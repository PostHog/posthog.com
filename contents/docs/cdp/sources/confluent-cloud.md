---
title: Linking Confluent Cloud as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ConfluentCloud
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Confluent Cloud connector syncs operational metrics from the [Confluent Cloud Metrics API](https://api.telemetry.confluent.cloud/docs) into the PostHog Data warehouse: Kafka throughput, consumer lag, connector activity, ksqlDB, Schema Registry, and Flink compute pool utilization. Confluent only retains this data for about 7 days, so warehousing it lets you do capacity planning and cost analysis over longer time ranges.

## Prerequisites

You need a Confluent Cloud **service account** with the **MetricsViewer** role and a **Cloud API key** owned by it. Cluster-scoped API keys don't work with the Metrics API, so make sure you create a Cloud (resource management) key.

1. In the [Confluent Cloud console](https://confluent.cloud), go to **Administration → Accounts & access** and create a service account.
2. Grant it the **MetricsViewer** role for the resources you want to collect metrics for.
3. Go to **Administration → API keys** and create a **Cloud API key** owned by that service account. Note the key and secret.

## Adding a data source

<SourceSetupIntro />

When linking Confluent Cloud, you'll need:

- **Cloud API key** and **Cloud API secret** – from the steps above.
- **Resource IDs** – the IDs of the resources to collect metrics for, as comma-separated lists. For example, Kafka cluster IDs (`lkc-...`) are shown under **Cluster settings**, connector IDs (`lcc-...`) under the connector's settings. Leave a resource type blank to skip it.

## Sync modes

The metrics tables sync incrementally on the `timestamp` column: each sync only queries the time window since the last one, plus a small overlap to pick up late-arriving data. Because the Metrics API retains roughly 7 days of data, keep a frequent sync schedule so no window is missed.

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

The metrics tables contain one row per metric, resource, and UTC hour, with the metric's aggregated value. Values are aggregated per resource, so per-topic or per-consumer-group detail isn't included. The `metric_descriptors` table documents every metric name, its unit, and its data type.

<SourceTables />

## Troubleshooting

- If you see an authentication error, the API key or secret is invalid or has been revoked. Create a new Cloud API key and reconnect.
- If you see a permissions error, the key authenticated but isn't authorized for the configured resources. Make sure it's a Cloud API key (not a cluster-scoped key) owned by a service account with the MetricsViewer role for those resources.
- If a metrics table syncs no rows, check that the matching resource IDs are filled in on the source settings and that the resources produced data in the last 7 days.

<TroubleshootingLink />
