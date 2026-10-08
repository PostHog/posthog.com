---
title: Linking ZapSign as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ZapSign
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The ZapSign connector syncs your e-signature data – documents, signers, and templates – into PostHog, so you can analyze signing funnels and completion rates alongside your product data. With webhooks enabled, document events (created, signed, refused, deleted) arrive in real time.

## Prerequisites

You need a ZapSign account with API access. The API token is available in ZapSign under **Settings** > **Integrations** > **ZapSign API**.

## Adding a data source

<SourceSetupIntro />

When linking ZapSign, you'll need:

- **API token** – found in ZapSign under **Settings** > **Integrations** > **ZapSign API**.
- **Environment** – choose **Production** for your live account, or **Sandbox** if the token belongs to a sandbox account (`sandbox.api.zapsign.com.br`).

## Sync modes

<SyncModes />

Documents support incremental syncs on their creation date (`created_at`). ZapSign's API can only filter by creation date, so an incremental sync picks up newly created documents but not status changes on older ones – enable webhooks to keep document statuses current, or use full refresh. Signers and templates always sync with full refresh.

The signers table is built by fetching each document's detail, so syncing it makes one API request per document.

## Webhooks

With webhooks enabled on the documents table, ZapSign pushes document events (created, signed, refused, deleted) to PostHog as they happen.

1. Go to your ZapSign source in the [data pipeline sources tab](https://app.posthog.com/data-management/sources) and open the **Webhook** tab.
2. Click **Create webhook**. PostHog registers the webhook in ZapSign using your API token and generates a secret authorization header to verify deliveries.

If automatic registration fails, create the webhook manually:

1. Copy the **webhook URL** from the **Webhook** tab.
2. In ZapSign, go to **Settings** > **Integrations** > **ZapSign API** > **Webhooks** and add a webhook pointing at that URL, subscribed to all document events.
3. Add an **Authorization** header with a secret value you generate, and paste the same value into the **Authorization header** field in PostHog.

> ZapSign's API has no way to look up or remove webhooks later, so if you disconnect the source, delete the webhook in ZapSign manually.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

The `original_file` and `signed_file` columns contain temporary download links that expire about 60 minutes after they're generated – re-fetch the document from the ZapSign API when you need a fresh link.

If syncs fail with a `403 Forbidden` error, the API token is missing or invalid (ZapSign responds with `403` rather than `401` for bad tokens). Copy a fresh token from **Settings** > **Integrations** > **ZapSign API** and update the source.

<TroubleshootingLink />
