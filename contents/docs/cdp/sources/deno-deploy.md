---
title: Linking Deno Deploy as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: DenoDeploy
beta: true
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Deno Deploy connector syncs your [Deno Deploy](https://deno.com/deploy) data – apps, revisions, domains, usage analytics, and runtime logs – into PostHog, so you can analyze your serverless deployments and traffic alongside your product data.

## Prerequisites

You need a [Deno Deploy](https://app.deno.com) account and an **organization access token**. Create one in your Deno Deploy dashboard under **Settings → Access Tokens**.

The token is scoped to a single organization, so one connection syncs one Deno Deploy organization. To sync more than one organization, add a separate source for each.

## Adding a data source

<SourceSetupIntro />

When linking Deno Deploy, you'll need:

- **Access token** – create an organization access token (`ddo_...`) under **Settings → Access Tokens** in your [Deno Deploy dashboard](https://app.deno.com).

## Sync modes

<SyncModes />

- **Analytics** and **logs** support **incremental** sync – analytics on the 15-minute bucket `time`, and logs on `timestamp`.
- **Apps**, **revisions**, and **domains** sync via **full refresh**.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If validation fails, confirm the token is an **organization access token** (`ddo_...`) created under **Settings → Access Tokens**, and that it hasn't been revoked.
- If a table is missing data you expect, check that the token is scoped to the organization that owns those apps – tokens are scoped to a single organization.
- Runtime **logs** cover only a recent time window, so older log lines may not be available to sync.

<TroubleshootingLink />
