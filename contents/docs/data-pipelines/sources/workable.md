---
title: Linking Workable as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Workable
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Workable connector syncs your recruiting data into the PostHog Data warehouse, so you can analyze your jobs and candidates alongside your product data.

## Prerequisites

You need a Workable account with admin access so you can create an access token.

## Adding a data source

<SourceSetupIntro />

When linking Workable, you'll need:

- **Account subdomain** – the subdomain from `https://<subdomain>.workable.com`.
- **API access token**: create one in your Workable account under **Settings > Integrations > Access Tokens** (admins only). Grant the `r_jobs` and `r_candidates` read scopes. Also grant `r_requisitions` for the `requisitions` table and `r_time_tracking` for the `time_entries` table. The `requisitions` table requires the Hiring Plan feature.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authorization error, your Workable access token is invalid or has expired. Create a new token in your Workable account settings, then reconnect.
- If you get a permission error, check that your access token has the read scopes for the tables you selected, including `r_requisitions` for `requisitions` and `r_time_tracking` for `time_entries`. The `requisitions` table also requires the Hiring Plan feature. Grant the scopes in your Workable account settings, then reconnect.
- If your subdomain is rejected, use just the account subdomain from `https://<subdomain>.workable.com`.

<TroubleshootingLink />
