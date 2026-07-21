---
title: Linking Fulcrum as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Fulcrum
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Fulcrum connector syncs your [Fulcrum (Spatial Networks)](https://www.fulcrumapp.com) field-data-collection data – records, forms, choice lists, media metadata, and more – into PostHog, so you can analyze your inspections and geospatial field data alongside your product data.

## Prerequisites

You need a Fulcrum account with an active **Developer Pack** subscription (REST API access is gated behind this paid tier) and an API token. Each token is scoped to a single organization.

Create a token in your [Fulcrum account settings](https://web.fulcrumapp.com/settings/api).

## Adding a data source

<SourceSetupIntro />

When linking Fulcrum, you'll need:

- **API token** – the token you created in your Fulcrum account settings, sent as the `X-ApiToken` header on every request.

## Sync modes

<SyncModes />

The `records` table syncs incrementally on `updated_at` using Fulcrum's server-side `updated_since` filter, so each run only fetches records changed since the last sync. All other tables use full refresh, because Fulcrum doesn't expose a server-side change filter for them.

Fulcrum enforces an hourly request cap (roughly 5,000 requests per hour), so very large record volumes may take several syncs to backfill fully.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
