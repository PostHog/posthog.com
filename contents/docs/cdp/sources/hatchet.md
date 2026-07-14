---
title: Linking Hatchet as a source
sidebar: Docs
showTitle: true
availability: { free: full, selfServe: full, enterprise: full }
sourceId: Hatchet
beta: true
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

[Hatchet](https://hatchet.run/) is a Postgres-backed task queue and durable workflow orchestrator, popular for AI agent and background-job workloads. This connector pulls your Hatchet execution history — workflow runs, individual task runs, ingested events, and event keys — into the PostHog Data warehouse so you can analyze job throughput, failure rates, and event volume alongside your product data.

## Prerequisites

You need a Hatchet account and a tenant-scoped API token. Create one in your Hatchet dashboard under **Settings > API Tokens**.

## Adding a data source

<SourceSetupIntro />

When linking Hatchet, you'll need:

- **API token** – create a tenant-scoped token in your Hatchet dashboard under **Settings > API Tokens**. The token encodes your tenant and server URL, so that's usually all you need.
- **Host** (optional) – set this if you self-host Hatchet, or if the token can't be decoded, to point the connection at your instance (for example `https://cloud.onhatchet.run`).
- **Tenant id** (optional) – derived from the token when left blank. Set it manually if the token can't be decoded.

## Sync modes

<SyncModes />

**Workflow runs**, **Tasks**, and **Events** support incremental sync — they advance a `created_at` cursor over the API's `since`/`until` window and re-read a short trailing window each run, because a run's status and output can change after it is created. **Event keys** is a small, timestamp-free reference list, so it syncs as full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **401 Unauthorized** — the API token is invalid or has expired. Create a new token in your Hatchet dashboard and reconnect.
- **403 Forbidden** — the token is valid but does not have access to this tenant. Check the token's tenant scope and reconnect.
- **The token can't be decoded** — enter the **Host** and **Tenant id** manually so the connection can reach your instance.

<TroubleshootingLink />
