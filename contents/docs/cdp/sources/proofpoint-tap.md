---
title: Linking Proofpoint TAP as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ProofpointTap
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Proofpoint TAP (Targeted Attack Protection) connector syncs your email security data – blocked and permitted clicks, blocked and delivered messages – into PostHog, so you can analyze email threat activity, track attack patterns, and correlate security findings with the rest of your data.

## Prerequisites

You need a Proofpoint TAP subscription and a service principal with a secret. In the TAP dashboard, go to **Settings** > **Connected Applications**, create a new service principal, and save the generated credentials.

## Adding a data source

<SourceSetupIntro />

When linking Proofpoint TAP, you'll need:

- **Service principal** – the service principal ID from Connected Applications.
- **Secret** – the secret key associated with your service principal.

## Sync modes

<SyncModes />

All tables (`clicks_blocked`, `clicks_permitted`, `messages_blocked`, `messages_delivered`) support incremental and full refresh syncs. Incremental syncs use the `query_end_time` cursor field and merge records by their unique IDs.

The Proofpoint TAP API retains only seven days of event history, so the first sync (and any full refresh) reaches back almost seven days with a two-minute buffer at the retention boundary. We recommend syncing at least once daily to avoid losing data.

Proofpoint TAP rate-limits API access to 1,800 requests per rolling day for the `clicks_permitted` endpoint, with 1,800 requests shared across the other three endpoints.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

| Table                | Primary key | Event time field | Description                              |
| -------------------- | ----------- | ---------------- | ---------------------------------------- |
| `clicks_blocked`     | `id`        | `clickTime`      | Blocked URL clicks from email messages   |
| `clicks_permitted`   | `id`        | `clickTime`      | Permitted URL clicks from email messages |
| `messages_blocked`   | `GUID`      | `messageTime`    | Blocked email messages                   |
| `messages_delivered` | `GUID`      | `messageTime`    | Delivered email messages                 |

## Troubleshooting

If you see **401 errors**, your service principal or secret is incorrect. Double-check your credentials in the TAP dashboard under **Settings** > **Connected Applications**.

If you see **403 errors**, your credentials don't have permission to access this customer's data. Verify access permissions in the TAP dashboard.

<TroubleshootingLink />
