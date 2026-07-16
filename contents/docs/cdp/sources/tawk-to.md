---
title: Linking tawk.to as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TawkTo
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The tawk.to connector syncs your live chat and support data – chats with their message transcripts, tickets, properties, and property members – into the PostHog Data warehouse, so you can analyze support conversations alongside your product data.

## Prerequisites

tawk.to's REST API is available by request. Submit the [REST API Access Request Form](https://help.tawk.to/article/rest-api) and wait for approval (usually under 24 hours). Once approved, generate an API key in your tawk.to dashboard under **Edit Profile → REST API Keys**.

## Adding a data source

<SourceSetupIntro />

When linking tawk.to, you'll need:

- **API key** – generated under **Edit Profile → REST API Keys** in your tawk.to dashboard after your REST API access request is approved. The key needs read access to properties, chat history, tickets, and members.
- **Property ID** (optional) – the ID of a single property to sync. Leave it blank to sync data from every property your API key can access.

## Sync modes

<SyncModes />

All tawk.to tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If the connection fails with an authentication error, check that your REST API access request was approved and that the API key is active in **Edit Profile → REST API Keys**. Keys are rejected with an `auth_error` until access is granted.

<TroubleshootingLink />
