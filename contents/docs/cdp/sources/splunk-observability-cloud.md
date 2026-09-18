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
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Splunk Observability Cloud connector syncs your monitoring data – detectors, alert events, incidents, dashboards, charts, teams, and metric metadata – into PostHog, so you can keep alert history beyond the platform's retention and join it with your product data.

## Prerequisites

You need a Splunk Observability Cloud (formerly SignalFx) account and an access token with **API** permission. An org access token or a user session token both work; the token needs the admin, power, or read_only role to read detectors and their events.

## Adding a data source

<SourceSetupIntro />

When linking Splunk Observability Cloud, you'll need:

- **Realm** – the short code for the region your organization runs in, like `us0` or `eu0`. It's shown on your profile page in Splunk Observability Cloud.
- **Access token** – create one under **Settings > Access tokens** with API permission. Note that org access tokens expire after a year and session tokens after 30 days, so you'll need to rotate the token before it expires.
- **SignalFlow program** (optional) – only needed if you want to sync the `metric_time_series` table. The program's published output is pulled incrementally by time window, for example `data('cpu.utilization').mean().publish()`.

## Sync modes

<SyncModes />

Detector events and metric time series sync incrementally on their timestamp. The other tables are configuration and metadata objects, which sync as a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid access token or realm** – check that the realm matches your organization (the API host is realm-specific) and that the token has API permission and hasn't expired.
- **`metric_time_series` fails with "requires a SignalFlow program"** – edit the source and fill in the SignalFlow program field, or disable that table.
- **Missing older alert events** – the API returns at most 10,000 events per detector, so history beyond that cap isn't synced.

<TroubleshootingLink />
