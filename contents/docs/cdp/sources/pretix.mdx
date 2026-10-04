---
title: Linking pretix as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Pretix
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The pretix connector syncs your event ticketing data – events, orders, invoices, customers, gift cards, products, vouchers, check-in lists, and more – into the PostHog data warehouse. Use it to combine ticket sales and attendee data with your product analytics.

## Prerequisites

- A pretix organizer account on [pretix.eu](https://pretix.eu) or a self-hosted pretix installation reachable over HTTPS.
- A team API token with read permissions for the resources you want to sync. For example, **Can view orders** for orders and invoices, **Can view vouchers** for vouchers.

## Adding a data source

<SourceSetupIntro />

When linking pretix, you'll need:

1. **Organizer short name** – the slug that appears in your pretix URLs (for example `my-organizer` in `https://pretix.eu/my-organizer/`).

2. **API token** – go to your organizer's control panel, open **Organizer settings → Teams**, select or create a team with the read permissions you need, then create an API token for it.

3. **API URL** (self-hosted only) – set this to your own pretix host (for example `https://tickets.example.com`). Leave it blank to use hosted pretix at `https://pretix.eu`.

## Sync modes

<SyncModes />

The `orders` table supports incremental sync using pretix's `modified_since` filter on the `last_modified` field, so re-syncs only fetch changed orders. All other tables are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Event-scoped tables (such as `items`, `quotas`, and `vouchers`) include an `event_slug` column added during sync so rows from different events stay distinct.

## Troubleshooting

- **"Your pretix API token does not have access to this organizer"** – check that the organizer short name matches your pretix URLs exactly and that the token belongs to a team of that organizer.

- **Permission errors on specific tables** – pretix team tokens carry per-resource permissions. Grant the team the matching read permission (for example **Can view orders**) or deselect the table.

- **API URL must use HTTPS** – self-hosted pretix URLs must use `https://`. Update the API URL and try again.

<TroubleshootingLink />
