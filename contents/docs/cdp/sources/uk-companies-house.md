---
title: Linking Companies House (UK government) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: UkCompaniesHouse
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Companies House (UK government) connector syncs companies, officers, persons with significant control, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync UK company registry data for the companies you care about, keyed by company number.

Get a free API key by registering an application on the [Companies House developer hub](https://developer.company-information.service.gov.uk/), then create a live key for the Public Data API.

Every table is fetched per company number, so start with the companies you want to enrich rather than the whole register. Companies House allows 600 requests every five minutes.

You'll be asked for:

- **API key**
- **Company numbers**: one company number per line, or separated by commas. Numbers shorter than eight digits are padded with leading zeros.

## Sync modes

<SyncModes />

All Companies House (UK government) tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
