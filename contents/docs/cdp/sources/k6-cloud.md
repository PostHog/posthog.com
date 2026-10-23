---
title: Linking Grafana Cloud k6 as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: K6Cloud
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Grafana Cloud k6 connector syncs your load testing data into PostHog, so you can analyze your performance tests alongside your product data.

## Prerequisites

You need a Grafana Cloud account with a Personal API token (or a Grafana Stack API token) and your stack ID.

## Adding a data source

<SourceSetupIntro />

When linking Grafana Cloud k6, you'll need:

- **API token** – create a Personal API token, or use a Grafana Stack API token, in Grafana Cloud.
- **Stack ID** – find it under **Testing & synthetics → Performance → Settings** in Grafana Cloud.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
