---
title: Linking Klarna as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Klarna
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

> **Alpha:** This source is in alpha. Please share feedback in the [PostHog community](/community).

The Klarna connector syncs your settlement data – payouts and transactions – into PostHog, so you can reconcile payments and analyze revenue alongside your product data.

## Prerequisites

You need a Klarna merchant account with access to the [Merchant Portal](https://portal.klarna.com/) to create an API key. The key needs read access to the [Settlements API](https://docs.klarna.com/acquirer/klarna/api/settlements/).

## Adding a data source

<SourceSetupIntro />

When linking Klarna, you'll need:

- **API key** – create one in your [Klarna Merchant Portal](https://portal.klarna.com/). Grant the key read access to the Settlements API.
- **Username (optional)** – for HTTP Basic authentication, enter the UUID supplied with your API key.
- **Region** – select the region for your merchant account: Europe, North America, or Oceania.
- **Environment** – choose Live for production data or Playground for testing.

## Sync modes

<SyncModes />

Klarna tables are full refresh only. The Settlements API does not expose filters for incremental syncing, so each sync reloads all data.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **401 error:** Klarna rejected your credentials. Reactivate or replace the key in the Merchant Portal.
- **403 error:** Klarna denied access. Check that your credentials can read settlements in the selected region.

<TroubleshootingLink />
