---
title: Linking Leadfeeder as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Leadfeeder
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Leadfeeder (Dealfront) connector syncs your website visitor and lead data into PostHog, so you can analyze your leads alongside your product data.

## Prerequisites

You need a Leadfeeder (Dealfront) account with an API token. This uses the legacy Leadfeeder API, which syncs the Accounts, Leads, and Visits tables.

## Adding a data source

<SourceSetupIntro />

When linking Leadfeeder, you'll need:

- **API token** – generate it in your [Leadfeeder API settings](https://app.leadfeeder.com/settings/api).
- **Start date** – optionally set this to bound the initial sync. Leave it blank to pull the last year of leads and visits.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
