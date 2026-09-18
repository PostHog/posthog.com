---
title: Linking Pipeliner as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Pipeliner
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Pipeliner connector syncs your Pipeliner CRM (Coevera) accounts, contacts, leads, opportunities, activities, and product catalog into the PostHog Data warehouse, so you can analyze your sales pipeline alongside your product data.

## Prerequisites

You need administrator access to your Pipeliner team space to create an API application. The API credentials it issues are scoped to that team space.

## Adding a data source

<SourceSetupIntro />

When linking Pipeliner, you'll need the API access details of an API application:

1. Sign in to Pipeliner and open the administration area of your team space.
2. Go to **Unit, Users & Roles → Applications** and create a new application.
3. Click **Show API Access** to reveal the connection details.

From those details, enter:

- **Service URL** – the regional API host your space is served from, for example `us-east.api.pipelinersales.com`.
- **Space ID** – the identifier of your team space.
- **API username** and **API password** – the generated API key pair. These are shown only once, so store them safely.

## Sync modes

<SyncModes />

Every table supports incremental syncs on the `modified` timestamp. Note that records deleted in Pipeliner are only removed from PostHog by a full refresh sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API credentials are invalid or have been revoked. Create a new API application in your team space's administration area, then reconnect.
- If you see a permissions error, the API application is missing the access needed to sync this data. Check the application's permissions, then reconnect.

<TroubleshootingLink />
