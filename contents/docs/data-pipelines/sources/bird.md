---
title: Linking Bird as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Bird
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Bird connector syncs your [Bird](https://bird.com) communication data into the PostHog data warehouse, so you can analyze contacts, audiences, email, SMS, and WhatsApp messages, broadcasts, templates, and daily sending stats alongside your product data.

> **Beta:** This source is in beta. If you run into issues, let us know.

## Prerequisites

You need a Bird account with access to create API keys. Create one in your Bird dashboard under **Platform tools > API keys**.

Keys from the older Bird Engagement Platform (api.bird.com) or MessageBird don't work with this connector. You need a key from the current bird.com platform – these keys start with `bk_`.

## Adding a data source

<SourceSetupIntro />

When linking Bird, you'll need:

- **API key** – Create an API key in your Bird dashboard under **Platform tools > API keys**. Keys start with `bk_` followed by your region code (e.g. `bk_us1_...` or `bk_eu1_...`). Give the key read access to the scopes for the tables you want to sync, such as `emails`, `email_marketing`, `email_management`, `sms`, `whatsapp`, and `numbers`.

## Sync modes

<SyncModes />

Most Bird tables are full refresh only. Message tables (`email_messages`, `sms_messages`, `whatsapp_messages`, `email_broadcasts`, `whatsapp_conversations`) don't support incremental sync because message status changes after creation and the Bird API only filters on creation time.

The one exception is `email_inbound_messages`, which syncs incrementally on `received_at`. Bird keeps inbound email for 30 days, so incremental sync is important to avoid losing older messages.

Daily stats tables (`email_daily_stats`, `sms_daily_stats`, `whatsapp_daily_stats`) return data for the last 365 days on each sync and are not paginated.

`email_suppressions` is replaced on each sync because removed suppressions disappear from Bird's listing.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid API key format:** Bird API keys start with `bk_` followed by the region (e.g. `bk_us1_` or `bk_eu1_`). Copy the full key from your Bird dashboard under **Platform tools > API keys**.

- **API key rejected or revoked:** Check that your key hasn't been revoked or expired. Create a new key in your Bird dashboard if needed.

- **Permission error on a specific table:** Your API key is missing the read scope required for that table. Add the scope in your Bird dashboard under **Platform tools > API keys**, or deselect that table from syncing.

- **Wrong region error:** The region prefix in your key doesn't match where your Bird organization is hosted. Copy the complete key from your Bird dashboard – the region is embedded in the key automatically.

<TroubleshootingLink />
