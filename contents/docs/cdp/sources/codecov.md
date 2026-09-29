---
title: Linking Codecov (Sentry) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Codecov
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Codecov (Sentry) connector syncs repos, branches, commits, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Codecov API token to automatically pull your code coverage data.

You can generate a personal API token under **Settings → Access** in your [Codecov account](https://app.codecov.io/). The token mirrors your own permissions on the git provider, so it can read every repository you can.

By default all of the owner's active repositories are synced; enter a comma-separated list of repository names to limit the import.

You'll be asked for:

- **Git provider**: choose between GitHub, GitLab, Bitbucket, GitHub Enterprise, GitLab Enterprise and Bitbucket Server.
- **Owner username**: for example `my-org`.
- **API token**

## Sync modes

<SyncModes />

All Codecov (Sentry) tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
