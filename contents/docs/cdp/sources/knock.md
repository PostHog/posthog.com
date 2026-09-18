---
title: Linking Knock as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Knock
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Knock connector syncs your notification data – messages, users, tenants, and workflow recipient runs – into PostHog, so you can analyze notification delivery and engagement alongside your product data.

## Prerequisites

You need a Knock account with access to the **secret API key** for the environment you want to import from. Knock API keys are scoped to a single environment (like development or production), so pick the key for the environment whose data you want.

## Adding a data source

<SourceSetupIntro />

You need your Knock secret API key (it starts with `sk_`). Find it in the Knock dashboard under **Developers** → **API keys**. Public keys (`pk_`) only support client-side identification and won't work for syncing data.

## Sync modes

<SyncModes />

The `messages` and `workflow_recipient_runs` tables support incremental sync on `inserted_at` using Knock's server-side date filters, so ongoing syncs only fetch new rows. Engagement fields that change on existing messages after delivery (like `read_at`, `seen_at`, and `interacted_at`) are only refreshed by a full refresh, so consider scheduling periodic full refreshes of `messages` if you rely on those fields.

The `users` and `tenants` tables don't have a server-side updated-since filter in Knock's API, so they always sync as a full refresh.

Knock also excludes messages outside your account's retention window from its API, so the `messages` table only backfills as far as your Knock retention allows.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If the source fails to connect or a sync stops with an authorization error, your secret API key is likely invalid or revoked – generate a new key in the Knock dashboard under **Developers** → **API keys** and update the source credentials. If a table is unexpectedly empty, check that you connected the key for the right Knock environment, since each key only sees its own environment's data.

<TroubleshootingLink />
