---
title: Linking crates.io as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CratesIO
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The crates.io connector syncs crates, versions, downloads, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

None. The crates.io API is public, so no account or API key is needed.

## Adding a data source

<SourceSetupIntro />

Pull metadata, versions, owners, and daily download counts for Rust crates from the [crates.io](https://crates.io) API.

crates.io's read APIs are public, so no credentials are required. There is no practical way to sync the whole registry, so enter the crate names you want to track, one per line (or comma-separated). For example:

```
serde
tokio
posthog-rs
```

Each sync fetches the current data for every configured crate. crates.io has no server-side "changed since" filter, and daily download counts only cover the trailing ~90 days, so all tables sync as a full refresh.

You'll be asked for:

- **Crates**: for example `serde
tokio
posthog-rs`.

## Sync modes

<SyncModes />

All crates.io tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
