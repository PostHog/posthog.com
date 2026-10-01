---
title: Linking Freshservice as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Freshservice
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Freshservice connector syncs tickets, problems, changes, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Freshservice domain and API key to pull your Freshservice ITSM data.

Your **domain** is the subdomain in your Freshservice URL - e.g. `acme` for `acme.freshservice.com`.

Your **API key** is on your Freshservice profile settings page (click your profile picture → **Profile settings**; the API key is shown in the right sidebar).

You'll be asked for:

- **Freshservice domain**: for example `acme`.
- **API key**

## Sync modes

<SyncModes />

All Freshservice tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
