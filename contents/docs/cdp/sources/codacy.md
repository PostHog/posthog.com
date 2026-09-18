---
title: Linking Codacy as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Codacy
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Codacy connector syncs your code quality data – organizations, repositories, per-file analysis, issues, pull requests, and commits – into PostHog, so you can track quality grades, issue counts, complexity, duplication, and coverage trends across your repositories.

## Prerequisites

You need a Codacy Cloud account with access to the organization you want to sync. Self-hosted Codacy installations are not yet supported.

## Adding a data source

<SourceSetupIntro />

When linking Codacy, you'll need:

- **Account API token** – generate one in your [Codacy account settings](https://app.codacy.com/account/access-management). The token grants access to the organizations and repositories your Codacy account can see.
- **Git provider** – the provider hosting your organization: GitHub, GitLab, or Bitbucket.
- **Organization name** – the name of the organization on your Git provider, as it appears in Codacy.

## Sync modes

<SyncModes />

Codacy tables are full refresh only, since the Codacy API doesn't support filtering by update time. Each sync pulls the current snapshot of your organization's analysis data.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your API token is invalid or has been revoked, generate a new account API token in your Codacy account settings, then reconnect.
- If some repositories are missing, check that your Codacy account has access to them on the Git provider. After changing permissions, it can take a while for Codacy to refresh the repository list.

<TroubleshootingLink />
