---
title: Linking Yousign as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: YouSign
beta: true
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

<AlphaRelease />

The Yousign connector syncs your eSignature data – signature requests, signers, documents, contacts, users, workspaces, and labels – into PostHog, so you can analyze signing funnels and completion rates alongside your product data.

## Prerequisites

You need a Yousign account on a plan with API access (Plus, Pro, or Scale) and an API key. Yousign API keys are environment-scoped: a sandbox key can only read sandbox data and a production key can only read production data.

## Adding a data source

<SourceSetupIntro />

You need two things to connect Yousign:

1. **API key**: in the Yousign app, go to **Integrations → API keys** and create a key. A read-only, organization-scoped key is enough for syncing; automatic webhook creation additionally requires a full-access key.
2. **Environment**: pick the environment your key belongs to – **Production** or **Sandbox**.

## Sync modes

<SyncModes />

The `signature_requests` table supports incremental syncs using Yousign's server-side date filters on `created_at`, `activated_at`, or `completed_at`. Syncing on `created_at` only picks up new requests, so if you care about status changes on existing requests, either enable **webhook sync** (recommended) or sync incrementally on `completed_at` with an occasional full refresh.

The `signers` and `documents` tables are fetched one signature request at a time, so a sync issues at least one request per signature request. With Yousign's standard rate limits this can make full refreshes slow on large accounts – schedule them accordingly.

## Webhooks for real-time syncing

When you select the webhook sync method for `signature_requests`, PostHog creates a webhook subscription in your Yousign account automatically (this requires a full-access API key). Yousign signs webhook deliveries, and PostHog verifies the signature using the subscription's secret key, which is captured automatically when the webhook is created.

To set the webhook up manually instead: in the Yousign app, go to **Integrations → Webhooks**, create a subscription pointing at the webhook URL shown in PostHog, subscribe to the `signature_request.*` lifecycle events, then copy the subscription's secret key into the signing secret field in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Yousign rejected the API key**: check the key is copied correctly and hasn't been revoked, and that the environment matches the key – a sandbox key cannot access the production API and vice versa.
- **Missing signature requests**: workspace-scoped API keys only see their workspace's data. Reconnect with an organization-scoped key to sync everything.
- **Webhook creation failed**: webhook management requires a full-access API key. Either reconnect with one or create the subscription manually as described above.

<TroubleshootingLink />
