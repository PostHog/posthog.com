---
title: Linking OpenAI as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: OpenAI
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The OpenAI connector syncs your organization's API usage, spend, and admin data into the PostHog Data Warehouse, so you can analyze your AI usage and costs per project, model, user, and API key alongside your product data.

## Prerequisites

You need an OpenAI organization and an Admin API key. Only organization owners can create Admin API keys, and a regular project API key can't read organization usage or costs.

## Adding a data source

<SourceSetupIntro />

When linking OpenAI, you'll need:

- **Admin API key** – create one in your [OpenAI organization settings](https://platform.openai.com/settings/organization/admin-keys) by clicking **Create admin key**. The key starts with `sk-admin`.

## Sync modes

<SyncModes />

The usage and costs tables sync incrementally on `start_time`, and audit logs on `effective_at`. Each incremental sync re-reads the trailing day of usage and cost buckets, since OpenAI keeps restating a day's bucket as late usage lands; the overlap is deduplicated automatically.

Usage and cost rows are daily buckets broken down by project, API key, model, and the other dimensions OpenAI supports for each endpoint. The `id` column is a synthesized key derived from the bucket start and those dimensions.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **401 Unauthorized** – your Admin API key is invalid or has been revoked. Create a new one and reconnect.
- **403 Forbidden** – your key isn't an Admin API key. Ask an organization owner to create one in the [organization settings](https://platform.openai.com/settings/organization/admin-keys).

<TroubleshootingLink />
