---
title: Linking Calendarific as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Calendarific
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Calendarific connector syncs holiday, country, and language data from the [Calendarific API](https://calendarific.com/api-documentation) into the PostHog data warehouse, so you can analyze them alongside your product data.

Each connection imports holidays for one configured country and year. The country and language tables contain all entries supported by Calendarific, regardless of the country and year you choose.

## Prerequisites

You need a [Calendarific](https://calendarific.com/) account and an API key. The free plan includes 500 API requests per month. You can find your API key in your [Calendarific dashboard](https://calendarific.com/account).

## Adding a data source

<SourceSetupIntro />

You'll be asked for:

- **API key**: copy this from your [Calendarific dashboard](https://calendarific.com/account).

- **Country code**: the two-letter ISO country code for the holidays you want to import (e.g., `US`).

- **Year**: the four-digit year for holiday imports (e.g., `2026`).

> **Note:** The country code and year only affect the `holidays` table. The `countries` and `languages` tables always contain all supported entries.

## Sync modes

<SyncModes />

All Calendarific tables use full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Authorization error (401):** Calendarific rejected your API key. Copy the key from your [Calendarific dashboard](https://calendarific.com/account) and reconnect.

- **Subscription error (403):** Your Calendarific subscription has expired. Renew it in your Calendarific account and reconnect.

- **Empty holidays table:** Double-check that your country code and year are valid. Calendarific may not have data for every country and year combination.

<TroubleshootingLink />
