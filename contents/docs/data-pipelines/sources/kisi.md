---
title: Linking Kisi as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Kisi
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Kisi connector syncs locks, places, users, groups, role assignments, controllers, and readers into the PostHog data warehouse, so you can analyze physical access control data alongside your product data.

## Prerequisites

A Kisi API key with organization owner or administrator rights. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Generate an API key in your Kisi account: go to **My Account > API** and click **Add API Key**. Your account must have organization owner or administrator rights.

You'll be asked for:

- **API key**

## Sync modes

<SyncModes />

All Kisi tables use full refresh. Each sync replaces the contents of the table. This is because Kisi's API endpoints have no time filters for incremental syncing.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one in **My Account > API**, then reconnect the source.

- If a table syncs no rows, the credential may not have access to that data. Ensure your account has organization owner or administrator rights.

<TroubleshootingLink />
