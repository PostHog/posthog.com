---
title: Linking Zendesk Sunshine as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ZendeskSunshine
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Zendesk Sunshine connector syncs custom objects, custom object records, custom object fields, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Import your Zendesk custom objects: object definitions, their records, and field schemas.

New sources use Zendesk's current custom objects API. The legacy Sunshine API (v1) is still supported for existing sources, but Zendesk is removing it on June 30, 2026. Authenticate with your Zendesk email address and an API token (token access must be enabled for your account).

You'll be asked for:

- **Zendesk subdomain**
- **API token**
- **Zendesk email address**

## Sync modes

<SyncModes />

All Zendesk Sunshine tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
