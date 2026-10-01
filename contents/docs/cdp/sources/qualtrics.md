---
title: Linking Qualtrics as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Qualtrics
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Qualtrics connector syncs surveys, users, groups, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Qualtrics datacenter ID and credentials to pull surveys, responses and account metadata.

Find your datacenter ID under **Account settings > Qualtrics IDs**. It looks like `iad1` or `fra1`. If your brand uses a custom domain, paste the full hostname instead.

The quickest way to connect is an API token from **Account settings > Qualtrics IDs**. The Qualtrics user needs the "Access API" permission plus read access to the surveys, users, groups, divisions and distributions you want to sync.

You can also connect with an OAuth client: create one under **Account settings > Qualtrics IDs**, pick the client credentials grant, and give it read access to surveys, survey responses, survey definitions, users, groups, divisions and distributions.

Survey responses sync incrementally on `recordedDate`. Every other table is a full refresh, because Qualtrics has no modified-since filter on its collection endpoints.

You'll be asked for:

- **Datacenter ID**: for example `iad1`.
- **Authentication method**: choose between API token and OAuth client credentials.

## Sync modes

<SyncModes />

All Qualtrics tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
