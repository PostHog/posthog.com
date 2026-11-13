---
title: Linking Swarmia as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Swarmia
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Swarmia connector syncs your engineering effectiveness data – pull request metrics, DORA metrics, investment balance, software capitalization, effort reporting, teams, code metrics, and AI coding assistant adoption – into the PostHog Data Warehouse, so you can blend engineering metrics with your product, finance, and headcount data.

## Prerequisites

You need a Swarmia account with permission to create API tokens. Some reports (investment balance, software capitalization, effort) map to Swarmia features that may not be enabled on every plan – tables your token can't access are flagged in the table picker. The teams table requires a token with the **Teams** scope.

## Adding a data source

<SourceSetupIntro />

When linking Swarmia, you'll need:

- **API token** – create one in your Swarmia workspace under **Settings → API tokens**.

## Sync modes

<SyncModes />

Swarmia's APIs return time-windowed aggregate reports rather than individual records, so each table is built from complete reporting windows: ISO weeks for pull request, DORA, code metrics, and AI adoption reports, and calendar months for investment, capitalization, and effort. The teams table syncs current organizational data as a full snapshot. The current (incomplete) week or month is only synced once it has ended.

Swarmia generates FTE-based data (investment, capitalization, effort) around the 10th day of the following month, so the most recent month can lag. Incremental tables re-read a trailing window on each sync to pick up late or regenerated data.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If a table fails to sync with a permissions error, your Swarmia API token can't access that report. This usually means the matching Swarmia feature (for example investment balance or software capitalization) isn't enabled for your organization or plan.

<TroubleshootingLink />
