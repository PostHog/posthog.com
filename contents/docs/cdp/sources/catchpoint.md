---
title: Linking Catchpoint Systems as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Catchpoint
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Catchpoint Systems connector syncs your synthetic monitoring configuration data – tests, nodes, products, folders, and divisions – into PostHog, so you can analyze your monitoring setup alongside your product data.

> **Note:** This source syncs monitoring configuration. Alert history and performance results are not included.

## Prerequisites

You need a Catchpoint Systems account with an API key. To create one:

1. In Catchpoint, go to **Settings > Integrations > REST API**.
2. Click **Add Consumer** to generate an API key.

The key's contact permissions and client or division scope control which data the connector can access. Keys can expire or be revoked – if a sync starts failing with an authorization error, check that your key is still valid.

## Adding a data source

<SourceSetupIntro />

When linking Catchpoint Systems, you'll need:

- **API key** – the key created in Catchpoint under **Settings > Integrations > REST API > Add Consumer**.

## Sync modes

<SyncModes />

All Catchpoint tables use full refresh because the Catchpoint API does not support server-side timestamp filters for incremental syncing. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one in Catchpoint under **Settings > Integrations > REST API**, then reconnect the source.

- If a table syncs no rows, the API consumer may not have permission to access that data. Check the key's contact permissions and division scope, then try again.

<TroubleshootingLink />
