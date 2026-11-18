---
title: Linking Splunk Observability Cloud as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SplunkObservabilityCloud
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Splunk Observability Cloud connector syncs your monitoring data – detectors, alert and custom events, audit events, incidents, SLOs, synthetic tests and their runs, dashboards, charts, teams, roles, clients, and metric metadata – into PostHog, so you can keep alert history beyond the platform's retention and join it with your product data.

## Prerequisites

You need a Splunk Observability Cloud (formerly SignalFx) account and an access token with **API** permission. An org access token or a user session token both work; the token needs the admin, power, or read_only role to read detectors and their events. Some optional tables need more access: `slos` needs the admin or power role, `roles` needs the admin role, and `audit_events` needs a user with the `READ_AUDIT_EVENTS` capability.

## Adding a data source

<SourceSetupIntro />

When linking Splunk Observability Cloud, you'll need:

- **Realm** – the short code for the region your organization runs in, like `us0` or `eu0`. It's shown on your profile page in Splunk Observability Cloud.
- **Access token** – create one under **Settings > Access tokens** with API permission. Note that org access tokens expire after a year and session tokens after 30 days, so you'll need to rotate the token before it expires.
- **SignalFlow program** (optional) – only needed if you want to sync the `metric_time_series` table. The program's published output is pulled incrementally by time window, for example `data('cpu.utilization').mean().publish()`.

## Sync modes

<SyncModes />

Detector events, events, audit events, synthetic runs, and metric time series sync incrementally on their timestamp. The other tables are configuration and metadata objects, which sync as a full refresh.

By default, incremental syncs of `events`, `audit_events`, and `synthetic_runs` re-read the hour before the last synced timestamp to catch late rows. A full refresh of `synthetic_runs`, and its first incremental sync, read the last 30 days of runs.

`slos`, `audit_events`, `roles`, and `clients` are off by default. `slos`, `audit_events`, and `roles` need the extra access listed in [Prerequisites](#prerequisites). `clients` needs the client inventory, which isn't enabled for every organization.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid access token or realm** – check that the realm matches your organization (the API host is realm-specific) and that the token has API permission and hasn't expired.
- **`metric_time_series` fails with "requires a SignalFlow program"** – edit the source and fill in the SignalFlow program field, or disable that table.
- **`audit_events` fails with a 404 error, or `clients` fails with a 403 error** – the feature isn't enabled for your organization. Disable that table.
- **Missing older alert events** – the API returns at most 10,000 events per detector, so history beyond that cap isn't synced.

<TroubleshootingLink />
