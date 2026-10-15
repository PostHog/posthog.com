---
title: Linking Lokalise as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Lokalise
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Lokalise connector syncs your localization and translation data into the PostHog data warehouse, so you can analyze your translation projects alongside your product data.

## Prerequisites

You need a Lokalise account with permission to create API tokens. A read-only token is sufficient.

## Adding a data source

<SourceSetupIntro />

When linking Lokalise, you'll need:

- **API token** – create one in your [Lokalise personal profile settings](https://app.lokalise.com/profile). A read-only token is sufficient.

The token must have read access to the projects you want to sync. The source imports data from all projects the token can access.

## Sync modes

<SyncModes />

All Lokalise tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API token is invalid or has been revoked. Create a new token in your Lokalise profile settings, then reconnect.
- If a table syncs no rows, the token may not have access to that project. Check the token's project permissions in Lokalise, then reconnect.

<TroubleshootingLink />
