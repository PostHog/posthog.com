---
title: Linking Storage by Zapier as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ZapierSupportedStorage
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

[Storage by Zapier](https://help.zapier.com/hc/en-us/articles/8496293271053) is a simple key/value store built into Zapier. This connector syncs your store into the PostHog data warehouse as one row per key, so you can query the values your Zaps read and write alongside the rest of your data.

## Prerequisites

- A Storage by Zapier store secret. This is the per-store UUID you use with the Storage by Zapier app – the `secret` value passed to `StoreClient`, or the `X-Secret` header you send to `store.zapier.com`. It both identifies and authorizes the store, so treat it like a password.

## Adding a data source

<SourceSetupIntro />

When linking Storage by Zapier, you'll need:

- **Store secret** – the per-store UUID4 used with the [Storage by Zapier](https://help.zapier.com/hc/en-us/articles/8496293271053) app. It looks like `xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx`.

## Sync modes

<SyncModes />

Storage by Zapier is full refresh only. The store carries no created or updated timestamps and exposes no pagination, so every sync pulls the entire store.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

The `records` table contains every key/value pair in the store, one row per key. Values are returned as strings (JSON-encoded when not already a string).

## Troubleshooting

- If the connection fails to validate, copy the store secret exactly and reconnect. The secret must be a valid UUID4 – a `400 Bad Request` means it isn't a valid UUID, and a `401 Unauthorized` means the secret is unknown.

<TroubleshootingLink />
