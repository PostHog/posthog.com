---
title: Linking World Health Organization Global Health Observatory (GHO) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: WhoGho
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The World Health Organization Global Health Observatory (GHO) connector syncs indicators, dimensions, dimension values, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

None. The World Health Organization Global Health Observatory (GHO) API is public, so no account or API key is needed.

## Adding a data source

<SourceSetupIntro />

Pull public health statistics from the [WHO Global Health Observatory](https://www.who.int/data/gho).

The API is open, so no credentials are required. WHO publishes over 2,000 indicator series, which is far too much to sync wholesale, so enter the indicator codes you want, one per line. For example:

```
WHOSIS_000001
WHOSIS_000002
NCD_BMI_30A
```

You can look codes up in the `indicators` table or in the [GHO OData API documentation](https://www.who.int/data/gho/info/gho-odata-api). Observations for every code you enter land in a single `indicator_data` table.

WHO refreshes each indicator on its own publication cycle, typically annually, so a daily or weekly sync is more than enough to pick up changes.

You'll be asked for:

- **Indicator codes**: for example `WHOSIS_000001
WHOSIS_000002
NCD_BMI_30A`.

## Sync modes

<SyncModes />

All World Health Organization Global Health Observatory (GHO) tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
