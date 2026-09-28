---
title: Linking Atlassian Bitbucket Cloud as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Bitbucket
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Atlassian Bitbucket Cloud connector syncs repositories, pull requests, commits, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect your Bitbucket Cloud workspace to sync repositories, pull requests, commits, pipelines, and more.

Your credentials need the **repository**, **pullrequest**, **pipeline**, **project**, and **account** read scopes. Avoid app passwords - Atlassian is retiring them; use an API token or an access token instead.

You'll be asked for:

- **Workspace**: your workspace ID — the part after `bitbucket.org/` in your workspace URL.
- **Authentication type**: choose between Atlassian API token and Access token.

## Sync modes

<SyncModes />

All Atlassian Bitbucket Cloud tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
