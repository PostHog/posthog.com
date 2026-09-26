---
title: Linking Upstash as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Upstash
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

[Upstash](https://upstash.com) provides serverless Redis and vector databases. This connector syncs your Upstash account data – Redis databases, their usage and billing stats, teams, vector indexes, and audit logs – into the PostHog data warehouse, so you can track your Upstash usage and spend alongside the rest of your data.

## Prerequisites

- A native Upstash account. The Developer (management) API is only available to native Upstash accounts, not Vercel or Fly.io marketplace accounts.
- The email address for your Upstash account.
- A management API key, which you can create in the [Upstash console](https://console.upstash.com/account/api) under **Account > Management API**.

## Adding a data source

<SourceSetupIntro />

When linking Upstash, you'll need:

- **Account email** – the email address for your Upstash account.
- **Management API key** – create one in the [Upstash console](https://console.upstash.com/account/api) under **Account > Management API**.

## Available tables

| Table             | Description                                                                       | Sync method  |
| ----------------- | --------------------------------------------------------------------------------- | ------------ |
| `redis_databases` | Every Upstash Redis database, with its configuration, plan, region, and state     | Full refresh |
| `redis_stats`     | Usage and billing statistics per database (commands, bandwidth, storage, latency) | Full refresh |
| `teams`           | Teams the account belongs to                                                      | Full refresh |
| `vector_indexes`  | Upstash Vector indexes, with their configuration, plan, and limits                | Full refresh |
| `audit_logs`      | Chronological record of actions on the account and its databases                  | Full refresh |

Every Upstash management endpoint is **full refresh** only: none documents pagination or a server-side "updated since" filter. Entity volumes are small (an account rarely has more than dozens of databases or indexes), so a full refresh over each collection is cheap.

The write-capable index credentials (`token` and `read_only_token`) are stripped from `vector_indexes` rows before they reach the warehouse.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails to validate, confirm your account email is correct and that the management API key is active in the [Upstash console](https://console.upstash.com/account/api). A `401 Unauthorized` means the email or key is invalid or has been revoked – create a new key and reconnect.
- If you get a `403 Forbidden`, the key isn't authorized for the resource being synced. Check the key's permissions and reconnect.
- If no data appears, confirm you're using a native Upstash account. The Developer API isn't available to Vercel or Fly.io marketplace accounts.

<TroubleshootingLink />
