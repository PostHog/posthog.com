---
title: Linking OwnerRez as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Ownerrez
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The OwnerRez connector syncs bookings, payments, guests, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your OwnerRez account email and personal access token to pull your bookings, guests, payments, and property data.

Create a personal access token under **Settings → Advanced Tools → Developer/API Settings** in your OwnerRez account. OwnerRez rate limits personal access tokens per IP address to two accounts every 24 hours, so this connection method suits a single OwnerRez account rather than many.

You'll be asked for:

- **Account email**: for example `you@example.com`.
- **Personal access token**: for example `pt_...`.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

<CalloutBox icon="IconWarning" title="Listings table requires premium" type="caution">

The **Listings** table requires the **WordPress Plugin + Integrated Websites** premium add-on in your OwnerRez account. Without this add-on, OwnerRez returns a 402 error and the table is not available in the table picker.

</CalloutBox>

## Troubleshooting

- If the connection fails with an authorization error, the personal access token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.
- If the Listings table shows as unavailable or syncs fail with a 402 error, your OwnerRez account does not have the WordPress Plugin + Integrated Websites premium add-on. Enable the add-on in OwnerRez, then reconnect the source.

<TroubleshootingLink />
