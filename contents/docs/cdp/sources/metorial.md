---
title: Linking Metorial as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Metorial
beta: true
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Metorial connector syncs your [Metorial](https://metorial.com) MCP data – sessions, session messages and errors, provider runs, tool calls, provider deployments, and the provider catalog – into PostHog, so you can analyze how clients interact with your MCP servers alongside your product data.

## Prerequisites

You need a [Metorial](https://metorial.com) account with a **secret** API key. Create one in your Metorial dashboard.

Metorial API keys are **project-scoped**, so connect one source per project you want to sync. Use a secret key (`metorial_sk_...`) – a publishable key (`metorial_pk_...`) only exposes public data and will not work here.

## Adding a data source

<SourceSetupIntro />

When linking Metorial, you'll need:

- **Secret API key** – create a secret key (`metorial_sk_...`) in your [Metorial dashboard](https://metorial.com). The key is scoped to a single project.

## Sync modes

<SyncModes />

Most Metorial tables – sessions, session messages, session errors, provider runs, tool calls, and provider deployments – support **incremental** sync using `created_at` (and `updated_at` where available). The **providers** catalog is a read-only, slowly-changing list with no cursor, so it always syncs via full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If validation fails, confirm you're using a secret key (`metorial_sk_...`) and not a publishable key (`metorial_pk_...`), which only exposes public data.
- If a table is missing rows you expect, check that the key is scoped to the project that owns that data – keys are project-scoped, so you may need a separate source per project.

<TroubleshootingLink />
