---
title: Linking Vantage as a source
sidebar: Docs
showTitle: true
availability: { free: full, selfServe: full, enterprise: full }
sourceId: Vantage
beta: true
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

[Vantage](https://www.vantage.sh) is a FinOps and cloud cost management platform that aggregates and analyzes spend across AWS, Azure, GCP, and other providers. This connector syncs your Vantage cost reports, budgets, dashboards, alerts, recommendations, and related configuration into the PostHog data warehouse so you can join cloud spend with your product and revenue data.

## Prerequisites

To connect Vantage, you need a Vantage account and an API access token with the `read` scope. Any account member can create a personal access token; account owners can also create account-scoped service tokens.

## Adding a data source

<SourceSetupIntro />

You'll need a Vantage **API access token**:

1. Sign in to Vantage and open your [access tokens settings](https://console.vantage.sh/settings/access_tokens).
2. Create a new access token (or service token) and grant it the **`read`** scope. The write scope is not required for imports.
3. Copy the token and paste it into the **API access token** field in PostHog.

## Sync modes

<SyncModes />

Vantage's configuration and report objects don't expose a server-side "updated after" filter, so every table syncs as a full refresh. Each sync re-reads the current state and merges on the object's `token`, so rows stay up to date without creating duplicates.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid or expired token** - if syncs fail with an authorization error, your token may have been revoked or lack the `read` scope. Create a new read-scoped token in your Vantage access tokens settings and reconnect the source.
- **Rate limits** - Vantage enforces per-account and per-key rate limits (and stricter limits on cost data endpoints). PostHog automatically backs off and retries when it's throttled, so transient rate-limit errors resolve on their own.

<TroubleshootingLink />
