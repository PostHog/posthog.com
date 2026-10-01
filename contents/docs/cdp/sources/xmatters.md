---
title: Linking xMatters (Everbridge) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Xmatters
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The xMatters (Everbridge) connector syncs events, people, groups, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your xMatters instance subdomain and REST API credentials to pull your xMatters data.

Use HTTP Basic auth with a REST Web Service User (or an API key as the username and its secret as the password). The account needs read access to the resources you want to sync.

You'll be asked for:

- **Company subdomain**: for example `acme`.
- **Username or API key**
- **Password or API key secret**

## Sync modes

<SyncModes />

All xMatters (Everbridge) tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the username or API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
