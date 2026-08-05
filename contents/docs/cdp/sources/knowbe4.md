---
title: Linking KnowBe4 as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Knowbe4
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The KnowBe4 connector syncs your security awareness training and phishing simulation data into the PostHog Data warehouse, so you can analyze phishing risk scores, training completion rates, and campaign results alongside your product data.

## Prerequisites

You need admin access to a KnowBe4 account to generate a Reporting API key. Keys are generated under **Account Settings > API** and are account-wide – there are no scopes to configure.

Your API key is only valid against the region where it was generated (US, EU, CA, UK, or DE), so make sure you select the matching region when connecting.

## Adding a data source

<SourceSetupIntro />

When linking KnowBe4, you'll need:

- **API key** – generate a Reporting API key as an account admin under **Account Settings > API**. Keys are account-wide with no scopes to configure.
- **Region** – select the region matching the URL you sign in to. Options are US, EU, CA, UK, and DE. Your API key is only valid against the region it was generated in.

## Sync modes

<SyncModes />

All KnowBe4 tables sync as full refresh. The KnowBe4 API doesn't expose reliable server-side timestamp filters for incremental sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authorization error, your API key is invalid or expired. Generate a new key under **Account Settings > API** and reconnect.
- If you get an authorization error after changing the region, your API key is only valid against the region where it was generated. Make sure the selected region matches your console URL.

<TroubleshootingLink />
