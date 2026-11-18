---
title: Linking Billomat as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Billomat
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Billomat connector syncs clients, suppliers, invoices, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync clients, suppliers, invoices, estimates, credit notes, incoming supplier bills, reminders, articles, delivery notes, and the activity feed from Billomat.

You'll be asked for:

- **Billomat ID (subdomain)**: the subdomain in your Billomat URL, the `acme` in `https://acme.billomat.net`.
- **API key**: generate a personal API key under Settings > Administration > Users in Billomat.

## Sync modes

<SyncModes />

Billomat tables use one of two sync modes:

- **Full refresh:** Each sync replaces the contents of the table. Used by Clients, Suppliers, Recurrings, ClientContacts, Articles, and ActivityFeed.
- **Incremental:** Only new and updated records since the last sync are fetched (based on the `date` field). Used by Invoices, Estimates, CreditNotes, Incomings, InvoicePayments, Confirmations, Reminders, and DeliveryNotes.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
