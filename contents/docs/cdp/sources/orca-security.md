---
title: Linking Orca Security as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: OrcaSecurity
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Orca Security connector syncs alerts, assets, cloud accounts, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Orca Security API token to pull your cloud security posture data.

Create an API token in Orca under **Settings → Users & Permissions → API**. A user with the **Viewer** role is enough to read alerts, assets, cloud accounts, and vulnerabilities.

Pick the **region** that matches the URL you sign in to - the token is only valid for the region it was created in.

You'll be asked for:

- **API token**
- **Region**: choose between Global (api.orcasecurity.io), US (app.us.orcasecurity.io) and EU (app.eu.orcasecurity.io).

## Sync modes

<SyncModes />

All Orca Security tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
