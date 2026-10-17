---
title: Linking Frontegg as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Frontegg
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Frontegg connector syncs identity and access management data from your Frontegg environment into the PostHog data warehouse, so you can analyze user signups, role assignments, and permission structures alongside your product data.

## Prerequisites

You need a Frontegg environment with access to the API credentials:

- **Client ID** and **API key** – find both in the Frontegg portal under **Keys & domains**.
- **Region** – know which region your Frontegg environment uses: EU, US, CA, or AU.

## Adding a data source

<SourceSetupIntro />

When linking Frontegg, you'll need:

- **Client ID** – your Frontegg environment's client ID from the Keys & domains settings.
- **API key** – your Frontegg environment's API key from the same settings page.
- **Region** – select EU (default), US, CA, or AU to match your Frontegg environment.

## Sync modes

<SyncModes />

All Frontegg tables use full refresh only. Frontegg's API doesn't expose time-based filters, so incremental syncing is not supported. Every sync reloads all data for each selected table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

| Table         | Description                                                                    | Sync method  |
| ------------- | ------------------------------------------------------------------------------ | ------------ |
| `users`       | Users in the Frontegg environment with account membership and profile details  | Full refresh |
| `roles`       | Roles with their permissions and account scope                                 | Full refresh |
| `permissions` | Permissions configured for the environment with role and category associations | Full refresh |

## Troubleshooting

- If authentication fails, verify your client ID and API key are correct and that your API key has not expired.
- If you get a permission denied error, check that your API key has the necessary permissions in Frontegg.
- Make sure you've selected the correct region (EU, US, CA, or AU) that matches your Frontegg environment.

<TroubleshootingLink />
