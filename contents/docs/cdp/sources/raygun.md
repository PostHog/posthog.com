---
title: Linking Raygun as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Raygun
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Raygun connector syncs applications, error groups, deployments, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter a Raygun [personal access token](https://raygun.com/documentation/product-guides/apis/personal-access-tokens/) to pull your Raygun crash reporting and real user monitoring data.

Grant the token these read scopes for the tables you want to sync:
- `applications:read` - Applications
- `cr.errors:read` - Error groups
- `deployments:read` - Deployments
- `customers:read` - Customers
- `rum.sessions:read` - Sessions
- `rum.pages:read` - Pages

You'll be asked for:

- **Personal access token**

## Sync modes

<SyncModes />

All Raygun tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the personal access token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
