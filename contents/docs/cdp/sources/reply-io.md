---
title: Linking Reply.io as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ReplyIo
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Reply.io connector syncs your sales engagement data into the PostHog Data warehouse, so you can analyze your contacts, sequences, tasks, and inbox activity alongside your product data.

## Prerequisites

You need a Reply account with API access so you can create an API key. API keys are scoped, so make sure the key you use grants read access to the data you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Reply.io, you'll need:

- **API key** – create one under **Settings → API Keys** in your Reply account. To sync every table, the key needs the `contacts:read`, `sequences:read`, `tasks:read`, `channels:read`, and `inbox:read` scopes (or broader scopes that include them). Tables whose scope is missing can be deselected in the table picker.

## Sync modes

<SyncModes />

All Reply.io tables are full refresh only, since the Reply API exposes no incremental sync filter.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authorization error, your Reply API key is invalid or has been revoked. Create a new key under **Settings → API Keys**, then reconnect.
- If you get a permission error on a specific table, your API key is missing the scope that table requires. Grant the missing scope to the key (or create a new key with it), then reconnect.

<TroubleshootingLink />
