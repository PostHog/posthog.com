---
title: Linking Temporal.io as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TemporalIO
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Temporal.io connector syncs your Temporal workflow data into PostHog, so you can analyze workflow activity alongside your product data.

## Prerequisites

You need a Temporal namespace and the mTLS client certificate and key that the namespace trusts. PostHog authenticates to your namespace's gRPC endpoint using client-certificate (mTLS) authentication.

## Adding a data source

<SourceSetupIntro />

When linking Temporal.io, you'll need:

- **Host** – the hostname of your Temporal namespace's gRPC endpoint, for example `your-namespace.account.tmprl.cloud` (without a protocol scheme or port).
- **Port** – the gRPC port for your namespace, typically `7233`.
- **Namespace** – the name of the Temporal namespace to sync.
- **Server client root CA** – the root CA certificate (PEM) for the Temporal server, including the `BEGIN` and `END` lines.
- **Client certificate** – your mTLS client certificate (PEM), including the `BEGIN` and `END` lines.
- **Client private key** – the private key for your client certificate (PEM), including the `BEGIN` and `END` lines.
- **Encryption key** *(optional)* – the key used to decrypt payloads, if your workflows use encrypted payloads.
- **Fallback decryption keys** *(optional)* – additional decryption keys (comma-separated) for payloads encrypted with rotated keys.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
