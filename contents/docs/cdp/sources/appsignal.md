---
title: Linking AppSignal as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Appsignal
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The AppSignal connector syncs the monitoring data of one AppSignal app into the PostHog Data Warehouse: exception and performance incidents, error and performance samples, deploy markers, log lines, metrics, and distributed traces. You can then join application health to how people use your product, and see the release or the slow action that a drop in usage follows.

## Prerequisites

You need a personal API token and the ID of the app you want to sync. The token inherits the permissions of the AppSignal user who created it, so that user needs access to the app.

Each source connects to one app. To sync more than one app, add one source per app.

## Adding a data source

<SourceSetupIntro />

When linking AppSignal, you'll need:

- **Personal API token** – find it in your [AppSignal personal settings](https://appsignal.com/users/edit) under **API key**.
- **App ID** – the identifier in your app's AppSignal URL: `https://appsignal.com/<organization>/sites/<app ID>`.

PostHog checks both values when you connect. If AppSignal rejects them, the connection fails immediately.

The app ID is part of the connection. If you change it, you must enter the token again, so that a stored token cannot read another app.

## Sync modes

<SyncModes />

These tables sync incrementally:

- `error_samples`, `performance_samples`, `log_lines`, `performance_traces`, and `trace_spans` are append-only. A sample, a log line, and a span never change after AppSignal records them.
- `deploy_markers` and `metric_timeseries` merge rows on each sync instead of appending them. AppSignal keeps updating a marker until the next deploy, and the connector can re-read a metric bucket, so each row must merge onto its key.

The other tables are full refresh only:

- `exception_incidents` and `performance_incidents` are aggregates whose occurrence count, state, and last occurrence keep changing. The GraphQL API that serves them cannot filter by time, so the connector re-reads the list.
- `apps` and `metric_names` are small lookup tables.

The first sync of `metric_timeseries` reaches back 30 days, and the first sync of `performance_traces` and `trace_spans` reaches back 7 days. AppSignal does not report how much history your plan keeps, so the connector uses these bounds instead of asking for all of it. The remaining tables walk your full history, which AppSignal limits to your plan's retention period.

Spans cost one AppSignal request per trace, so `trace_spans` syncs at most 5,000 traces per run. If your app records more than that, run the sync again and it continues from where it stopped.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

`metric_timeseries` holds one row per metric series per hour, for both custom and platform metrics. Read it together with `metric_names`, which lists each metric name, its type, and the tag keys it carries.

## Troubleshooting

- If you see a **401** error, the token is invalid or was revoked. Copy a new token from your [personal settings](https://appsignal.com/users/edit), then reconnect.
- If you see a **403** error, the AppSignal user who owns the token cannot read this app. Check the token and the app ID, then reconnect.
- If you see a **404** error, or **AppSignal app not found**, the app ID is wrong. Copy the identifier from your app's AppSignal URL.
- If `log_lines` stays empty, the app has no log sources. Check that your app sends logs to AppSignal log management.
- If a metric is missing from `metric_timeseries`, check that `metric_names` lists it. The connector syncs gauge, counter, and measurement metrics, and skips a metric of any other type.
- If `trace_spans` lags behind `performance_traces`, the sync reached the per-run trace limit. Increase the sync frequency until the table catches up.

<TroubleshootingLink />
