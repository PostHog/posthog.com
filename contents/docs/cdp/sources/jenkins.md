---
title: Linking Jenkins as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Jenkins
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Jenkins connector syncs jobs, builds, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Jenkins URL, username, and API token to sync your CI/CD data.

Jenkins is self-hosted, so enter the base URL of your own instance (for example `https://jenkins.example.com`).

Create an API token from your Jenkins user page under **Configure > API Token**. The account needs **Overall/Read** plus **Job/Read** permission on the jobs you want to sync.

You'll be asked for:

- **Jenkins URL**: for example `https://jenkins.example.com`.
- **Username**: for example `jenkins-user`.
- **API token**

## Sync modes

<SyncModes />

All Jenkins tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
