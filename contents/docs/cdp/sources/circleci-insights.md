---
title: Linking CircleCI Insights as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CircleciInsights
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The CircleCI Insights connector syncs workflow metrics, workflow runs, job metrics, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your CircleCI personal API token and project slugs to pull pipeline health metrics - workflow and job durations, success rates, credit usage, recent runs, and flaky tests - from the CircleCI Insights API.

You can create a personal API token in your [CircleCI user settings](https://app.circleci.com/settings/user/tokens). Note that CircleCI retains Insights data for roughly 90 days.

You'll be asked for:

- **Personal API token**
- **Project slugs**: comma-separated project slugs in `vcs/org/repo` format, e.g. `gh/your-org/your-repo`. You can find a project's slug in its URL on CircleCI.

## Sync modes

<SyncModes />

All CircleCI Insights tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the personal API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
