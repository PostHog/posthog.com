---
title: Linking NuGet as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Nuget
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The NuGet connector syncs packages, package versions, catalog events, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

None. The NuGet API is public, so no account or API key is needed.

## Adding a data source

<SourceSetupIntro />

Track adoption of.NET libraries over time: package metadata, per-version download counts, and publish/delete events for the NuGet packages you care about.

The public NuGet V3 API allows anonymous read access, so no API key is needed. Enter the package IDs you want to track, separated by commas or new lines - e.g. `Newtonsoft.Json, Serilog`.

You'll be asked for:

- **Package IDs**: for example `Newtonsoft.Json, Serilog, Microsoft.Extensions.Logging`.

## Sync modes

<SyncModes />

Some NuGet tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
