---
title: Linking Listmonk as a source
sidebar: Docs
showTitle: true
availability: { free: full, selfServe: full, enterprise: full }
sourceId: Listmonk
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

> **Alpha:** This source is in alpha. If you run into issues, reach out to [our support team](/docs/support).

The Listmonk connector syncs subscribers, lists, campaigns, bounces and daily campaign analytics from your self-hosted Listmonk instance into PostHog.

## Prerequisites

You need:

- A Listmonk instance that PostHog can reach over the internet. PostHog Cloud connects over https only.
- An API user and its token. Create one in Listmonk under **Admin > Users** with the **API** user type. Its role needs `subscribers:get_all`, `lists:get_all`, `campaigns:get_all`, `bounces:get` and `campaigns:get_analytics`.
- For incremental subscriber syncs, the `subscribers:sql_query` permission on the role.

## Adding a data source

<SourceSetupIntro />

Enter your instance URL, for example `https://listmonk.example.com`, the API user name and the token.

## Sync modes

<SyncModes />

`subscribers` supports incremental sync on `updated_at`. It also picks up subscribers whose list subscriptions changed, such as an opt-in confirmation or an unsubscribe. A subscriber removed from a list leaves nothing to detect, so that change appears only after a full refresh. The other tables sync with a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

**Listmonk rejected the API user or token.** Check the user name and token, and that the user's role can read lists.

**A 403 error on one table.** The API user's role lacks a permission that table needs. Check the permissions listed under [Prerequisites](#prerequisites). Incremental `subscribers` syncs also need `subscribers:sql_query`; grant it or switch the table to full refresh.

<TroubleshootingLink />
