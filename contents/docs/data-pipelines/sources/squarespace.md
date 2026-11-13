---
title: Linking Squarespace as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Squarespace
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Squarespace connector syncs your Commerce data – orders, transactions, products, inventory, store pages, profiles, contacts, discounts, and contact address books – into the PostHog Data warehouse, so you can analyze your store alongside your product data.

## Prerequisites

You need a Squarespace site where you can create a Developer API key. The Commerce APIs (orders, inventory) require the merchant to be on a Commerce plan.

## Adding a data source

<SourceSetupIntro />

When linking Squarespace, you'll need:

- **API key** – create one in your Squarespace site under **Settings → Advanced → Developer API Keys**, granting read access to the data you want to sync: Orders (orders, transactions), Products (products, inventory, store pages), Profiles (profiles), Contacts (contacts, contact address books), and Discounts (discounts).

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new API key in your Squarespace developer settings, then reconnect.
- If you see a permissions error, the key or the site's plan is missing access needed to sync this data. Grant the relevant permission, and ensure the site is on a Commerce plan for orders and inventory, then reconnect.
- If you see "Your Squarespace site's billing is expired, so Squarespace is refusing API access. Resolve the site's billing in Squarespace, then reconnect.", Squarespace refused the request with a `402 Payment Required` response. Squarespace [returns this code](https://developers.squarespace.com/commerce-apis/changelog#new-response-code-for-expired-websites) for requests on behalf of a site whose billing has expired. PostHog retries a few times, then stops retrying and disables syncing for the affected tables. Resolve the site's billing in Squarespace, then reconnect. After that, [enable syncing](/docs/data-pipelines/sources#syncing) again for each affected table.

<TroubleshootingLink />
