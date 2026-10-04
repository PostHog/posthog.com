---
title: Linking New Relic as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: NewRelic
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The New Relic connector syncs your observability data – APM transactions, transaction errors, page views, logs, distributed tracing spans, monitored entities, and alert configuration – into PostHog, so you can query it alongside your product analytics.

## Prerequisites

You need a New Relic account and a **User API key** (it starts with `NRAK-`). License keys, browser keys, and the deprecated Insights query keys won't work. Create a User API key on the [API keys page](https://one.newrelic.com/admin-portal/api-keys/home) of your New Relic account.

You also need your New Relic **account ID**. It's shown in the URL when viewing your account, or under **Administration** → **Access management** → **Accounts**.

## Adding a data source

<SourceSetupIntro />

When linking New Relic, you'll need:

- **User API key** – the key you created on the API keys page (starts with `NRAK-`).
- **Account ID** – the numeric ID of the New Relic account to sync.
- **Region** – select **EU** if your account is hosted in New Relic's EU data center. Most accounts use **US**.

## Sync modes

<SyncModes />

Event tables (`transactions`, `transaction_errors`, `page_views`, `logs`, and `spans`) are append-only, since New Relic events are immutable. On the initial sync, only the last 30 days of events are imported, and New Relic's own data retention limits how far back data is available on your plan. The `logs` and `spans` tables can be very high volume, so they're disabled by default – toggle them on in the schema configuration if you want them.

Entity and alert configuration tables (`entities`, `alert_policies`, and `alert_conditions`) are synced with a full refresh, since New Relic doesn't expose updated-since filters for them.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Your API key is valid but has no access to account** – the key belongs to a user without access to the account ID you entered. Double-check the account ID and make sure the key was created by a user on that account.
- **Your New Relic API key is invalid or has been revoked** – create a new User API key on the [API keys page](https://one.newrelic.com/admin-portal/api-keys/home) and reconnect.

<TroubleshootingLink />
