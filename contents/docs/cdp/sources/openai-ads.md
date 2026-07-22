---
title: Linking OpenAI Ads as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: OpenAIAds
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The OpenAI Ads connector syncs your ChatGPT advertising data – campaigns, ad groups, ads, and daily performance insights – into the PostHog Data Warehouse, so you can analyze ad spend and delivery alongside your product data.

## Prerequisites

You need an OpenAI Ads Manager account with API access. OpenAI Ads is currently a beta product available to US advertisers, and each API key is scoped to a single ad account.

## Adding a data source

<SourceSetupIntro />

When linking OpenAI Ads, you'll need:

- **API key** – create one in the **Settings** tab of [OpenAI Ads Manager](https://ads.openai.com). Note this is different from an OpenAI platform API key, and the two are not interchangeable.

Because each key is scoped to one ad account, connect one source per ad account to import several accounts.

## Sync modes

<SyncModes />

The insights tables sync incrementally on `start_time` and hold one row per entity per day. Each incremental sync re-reads a trailing window of recent days, since OpenAI keeps restating recent reporting as delivery data catches up; the overlap is deduplicated automatically.

The campaigns, ad groups, and ads tables are full refresh only – the API doesn't offer a server-side date filter for them.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **401 Unauthorized** – your API key is invalid or has been revoked. Create a new one in the Settings tab of Ads Manager and reconnect.
- **403 Forbidden** – your API key doesn't have access to this ad account. Keys are scoped to a single ad account, so make sure you're using a key created for the account you want to import.

<TroubleshootingLink />
