---
title: Linking Sigma Computing as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SigmaComputing
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Sigma Computing connector syncs workbooks, data models, connections, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect Sigma Computing to pull your workbook, data model, connection, and membership metadata.

Generate a client ID and secret from **Administration > Developer Access** in Sigma, then pick the deployment region shown on that same page (or under **Account > General Settings**).

You'll be asked for:

- **Deployment region**: choose between GCP - United States (Iowa), GCP - Saudi Arabia (Dammam), AWS - United States West (Oregon), AWS - United States East (N. Virginia), AWS - Canada (Central), AWS - Europe (Frankfurt), AWS - Asia Pacific (Sydney), AWS - United Kingdom (London), Azure - United States (Virginia), Azure - Europe (Netherlands), Azure - Canada (Toronto), Azure - United Kingdom (London) and Azure - Australia (New South Wales).
- **Client ID**
- **Client secret**

## Sync modes

<SyncModes />

All Sigma Computing tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the client secret is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
