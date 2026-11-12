---
title: Linking Simpro as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Simpro
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Simpro connector syncs your field service management data – customers, sites, jobs, quotes, invoices, employees, vendors, and more – into PostHog so you can analyze operations alongside your product data.

> **Note:** This source is in **beta**. If you run into issues, [contact support](https://us.posthog.com/#panel=support%3Asupport%3Adata_warehouse%3A%3Atrue).

## Prerequisites

You need a Simpro account with API access enabled. A Simpro administrator must create an API key for PostHog to use.

### How to create an API key

1. In Simpro, go to **System > Setup > API > Applications**.
2. Create a new application with the **API Key** grant type.
3. Download the key file.
4. Copy the **access token** from the key file – this is the value you paste into PostHog.

## Adding a data source

<SourceSetupIntro />

When linking Simpro, you need:

- **Simpro build** – the build name or URL you sign in to, such as `acme` or `acme.simprosuite.com`. Builds are hosted on `simprosuite.com` or `simprocloud.com`.
- **API key** – the access token from the key file you downloaded above.
- **Company ID** (optional) – the numeric ID of a specific company to sync. Leave blank to sync every company in a multi-company build.

## Multi-company builds

Simpro builds can contain multiple companies. If you leave the **Company ID** field blank, PostHog syncs data from all companies in the build. Each row includes a `CompanyID` column so you can filter or join by company. Builds without multi-company setup use company ID `0`.

## Sync modes

<SyncModes />

### Simpro-specific sync behavior

Most Simpro tables support **incremental** sync using the `DateModified` field. PostHog filters from the day before the last sync watermark to make sure no records are missed, then deduplicates by primary key.

The following tables use **full table** sync because changes to child records (cost centers, receipts) don't always update the parent's `DateModified`:

- **jobs**
- **customer_payments**
- **vendor_orders**
- **cost_centers**

### Archived rows

Several Simpro list endpoints hide archived rows by default. PostHog syncs both active and archived rows automatically, so your warehouse contains the full picture. Tables that include archived rows are: company_customers, individual_customers, sites, employees, catalog_items, vendors, vendor_orders, and cost_centers.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
