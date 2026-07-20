---
title: Linking Jellyfish as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Jellyfish
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Jellyfish connector syncs your engineering intelligence data into PostHog, so you can analyze R&D allocations, delivery deliverables, and engineering metrics alongside your product and financial data.

## Prerequisites

You need a Jellyfish subscription with the API Export feature enabled, and an Admin user role in Jellyfish to generate an API token.

## Adding a data source

<SourceSetupIntro />

When linking Jellyfish, you'll need:

- **API token** – generate one in Jellyfish under **Settings → Data Connections → API Export**. Tokens are created with an expiry, so reconnect with a fresh token when yours expires.

## Sync modes

<SyncModes />

Jellyfish tables sync as full refreshes: reference tables (engineers, teams, work categories) are small lists, and the analytics tables re-export a rolling two-year window of monthly data on each sync, so restated periods are always picked up.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API token may be invalid or expired. Generate a new token under **Settings → Data Connections → API Export** in Jellyfish, then reconnect.

<TroubleshootingLink />
