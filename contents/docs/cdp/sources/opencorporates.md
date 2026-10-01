---
title: Linking OpenCorporates as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Opencorporates
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The OpenCorporates connector syncs companies, officers, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your OpenCorporates API token and a search term to pull matching company and officer records.

Get an API token from [OpenCorporates](https://opencorporates.com/api_accounts/new). The free open-data tier is limited to around 50 requests a day and 200 a month, so scope your search with a jurisdiction to stay within it.

You'll be asked for:

- **API token**
- **Search term**: openCorporates is a search API, not a full export — this matches against company and officer names.

## Sync modes

<SyncModes />

Some OpenCorporates tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
