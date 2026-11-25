---
title: Linking Wix as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Wix
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Wix connector syncs orders, products, contacts, members, blog posts, bookings, booking services, events, event guests, RSVPs, inventory, pricing plans, and more from one Wix site into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

A Wix account with an API key, and the ID of the site you want to sync. Only an account owner, or a co-owner with full permissions, can create an API key.

## Adding a data source

<SourceSetupIntro />

Create an API key in the [Wix API Key Manager](https://manage.wix.com/account/api-keys) and give it read access to the areas you want to sync: eCommerce Orders, Stores, Contacts, Members, Blog, Pricing Plans, Inventory, Bookings, Events, and Event Tickets and Guest List.

You'll be asked for:

- **API key**: the key from the API Key Manager.
- **Site ID**: your site's ID, shown in the Wix dashboard URL after `/dashboard/`.

A key that is missing one of those permissions still connects. The table picker marks the tables it cannot read, so you can clear them and sync the rest.

## Sync modes

<SyncModes />

Orders, store categories, bookings, event guests, event RSVPs, inventory items, and pricing plans sync incrementally on `createdDate` or `updatedDate`, whichever you pick as the sync field. Order transactions and order fulfillments are child tables of orders and sync alongside them. Booking services, events, pricing plan orders, and the remaining tables are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If a table shows a permission error in the picker, the API key is missing that area's read permission. Add it in the Wix API Key Manager, then reconnect the source.
- If the connection fails and Wix cannot find the site, check the site ID belongs to the same account as the API key.

<TroubleshootingLink />
