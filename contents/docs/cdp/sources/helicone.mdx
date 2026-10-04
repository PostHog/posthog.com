---
title: Linking Helicone as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Helicone
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

<AlphaRelease />

The Helicone connector syncs your logged LLM requests, sessions, per-user usage aggregates, and prompts from [Helicone](https://www.helicone.ai/) into PostHog. This lets you join LLM cost, token usage, and latency data with your product analytics.

## Prerequisites

You need a Helicone account with an API key. Any Helicone plan works, but the amount of request history you can sync depends on your plan's data retention.

## Adding a data source

<SourceSetupIntro />

To connect, you need:

- **API key** – generate one in your [Helicone dashboard](https://us.helicone.ai/settings/api-keys) under **Settings** → **API Keys**.
- **Region** – pick **US** or **EU** to match where your Helicone organization is hosted.

## Sync modes

<SyncModes />

The `requests` table is an append-only log, so incremental sync on `request_created_at` is recommended. Only the last 365 days are pulled on the initial incremental sync; subsequent runs fetch only newer requests. The `sessions`, `users`, and `prompts` tables contain aggregates and metadata that change in place, so they sync as full refreshes.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync limitations

Request and response bodies above Helicone's size limits are offloaded to storage and referenced by a short-lived `signed_body_url` on each request row, rather than being embedded in the synced data. The per-user `users` table is an aggregate over your full request history and is fetched in a single request, without pagination.

## Troubleshooting

If credential validation fails, check that the key was created in the same Helicone region you selected – a US key won't authenticate against the EU host, and vice versa.

<TroubleshootingLink />
