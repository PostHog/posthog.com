---
title: Linking ConfigCat as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ConfigCat
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The ConfigCat connector syncs your feature-flag account structure into the PostHog data warehouse, including your organizations and products.

## Prerequisites

You need a ConfigCat account with **Public Management API credentials**. These are a username and password pair — separate from your SDK keys — that grant read access to your account data through the [ConfigCat Public Management API](https://api.configcat.com/docs).

## Adding a data source

<SourceSetupIntro />

When linking ConfigCat, you'll need:

- **Public API username** – the username from your Public Management API credential.
- **Public API password** – the password from your Public Management API credential.

Create these under **Public Management API credentials** in your [ConfigCat dashboard](https://app.configcat.com/my-account/public-api-credentials).

## Available tables

| Table           | Description                                                                  | Sync method  |
| --------------- | ---------------------------------------------------------------------------- | ------------ |
| `products`      | The top-level container that groups configs, environments, and feature flags | Full refresh |
| `organizations` | The account-level owner of products and members                              | Full refresh |

All tables use **full refresh** syncing — the entire table is reloaded on each sync. Incremental sync is not available because the ConfigCat API does not expose pagination or server-side timestamp filters.

> **Note:** Deeper resources like configs, environments, settings, and feature flag values are not included in this initial release. Only top-level products and organizations are synced.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an **authentication error** (401), your Public API credentials are invalid or have been revoked. Generate a new credential in your [ConfigCat dashboard](https://app.configcat.com/my-account/public-api-credentials), then reconnect.
- If you see a **permissions error** (403), your Public API credentials do not have access to this data. Check the credential's permissions, then reconnect.

<TroubleshootingLink />
