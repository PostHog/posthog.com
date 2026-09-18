---
title: Linking BoldSign as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: BoldSign
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The BoldSign connector syncs your eSignature data – documents, templates, and contacts – into PostHog, so you can analyze your signing workflows alongside your product data.

## Prerequisites

You need a BoldSign account with access to its account settings so you can create an API key, and you need to know which region your account is hosted in.

## Adding a data source

<SourceSetupIntro />

When linking BoldSign, you'll need:

- **API key** – create one in your [BoldSign account settings](https://app.boldsign.com/settings) under **API** → **API Key**. API keys carry all scopes by default.
- **Region** – pick the region your BoldSign account lives in. Accounts are hosted on either the US (`api.boldsign.com`) or EU (`api-eu.boldsign.com`) host.

## Sync modes

<SyncModes />

BoldSign tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your API key is invalid or has been revoked, create a new key in your BoldSign account settings, then reconnect.
- If your API key does not have permission to access the data, check the key's permissions, then reconnect.

<TroubleshootingLink />
