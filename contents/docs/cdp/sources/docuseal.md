---
title: Linking DocuSeal as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Docuseal
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The DocuSeal connector syncs your document signing data – templates, submissions, and submitters – into the PostHog Data warehouse, so you can analyze your signing workflows alongside your product data.

## Prerequisites

You need a DocuSeal account with access to create an API key. The key has full account access, as DocuSeal does not offer per-resource scopes. Self-hosted deployments are not supported yet.

## Adding a data source

<SourceSetupIntro />

When linking DocuSeal, you'll need:

- **API key** – create one under **Settings → API** in your [DocuSeal console](https://console.docuseal.com/api).
- **Region** – pick the region your DocuSeal account is hosted in, either Global (`api.docuseal.com`) or EU (`api.docuseal.eu`).

## Sync modes

<SyncModes />

This source is full-refresh only. DocuSeal has no server-side timestamp filter, and its records mutate as submission statuses change, so every table is fully re-synced on each run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new key in your DocuSeal account settings, then reconnect.
- If you see a permissions error, the key does not have access to this data. Check the key in your DocuSeal account settings, then reconnect.

<TroubleshootingLink />
