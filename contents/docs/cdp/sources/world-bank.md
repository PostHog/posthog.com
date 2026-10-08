---
title: Linking World Bank Open Data as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: WorldBank
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The World Bank Open Data connector syncs countries, indicators, sources, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

None. The World Bank Open Data API is public, so no account or API key is needed.

## Adding a data source

<SourceSetupIntro />

Pull country-level development statistics from the [World Bank Indicators API](https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information).

The API is open, so no credentials are required. The World Bank publishes around 16,000 indicator series, which is far too much to sync wholesale, so enter the indicator codes you want (up to 50), one per line. For example:

```
SP.POP.TOTL
NY.GDP.PCAP.CD
IT.NET.USER.ZS
```

You can look codes up in the `indicators` table or on [data.worldbank.org](https://data.worldbank.org/indicator). Observations for every code you enter land in a single `indicator_data` table.

The API has no "changed since" filter, and the World Bank revises historical values on each quarterly release, so every table syncs as a full refresh.

You'll be asked for:

- **Indicator codes**: for example `SP.POP.TOTL
NY.GDP.PCAP.CD
IT.NET.USER.ZS`.

## Sync modes

<SyncModes />

All World Bank Open Data tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
