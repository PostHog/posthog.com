---
title: Linking Honeybadger as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Honeybadger
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Honeybadger connector syncs your error monitoring data – projects, errors (faults), error occurrences (notices), deployments, and uptime checks – into PostHog, so you can track error rates across environments and correlate error spikes with releases.

## Prerequisites

You need a Honeybadger account and your personal authentication token, available on your [Honeybadger profile page](https://app.honeybadger.io/users/edit). The token grants read access to every project your Honeybadger user can see.

## Adding a data source

<SourceSetupIntro />

When linking Honeybadger, you'll need:

- **Personal authentication token** – found on your [Honeybadger profile page](https://app.honeybadger.io/users/edit) under **Authentication token**.

## Sync modes

<SyncModes />

We recommend incremental sync for the `faults`, `notices`, and `deploys` tables. Honeybadger's API allows 360 requests per hour with at most 25 rows per page, so full refreshes of large accounts are slow – incremental syncs only fetch what changed since the last run.

The `notices` table is disabled by default because it is fetched one fault at a time, which can use up the API quota quickly on accounts with many errors. Enable it if you need per-occurrence detail such as request context and backtraces.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If a sync fails with an access denied error, your authentication token is invalid or was revoked – copy a fresh token from your Honeybadger profile page and update the source credentials.

Syncs that hit Honeybadger's 360 requests/hour rate limit pause and retry automatically, so a large initial backfill can take several hours to complete.

<TroubleshootingLink />
