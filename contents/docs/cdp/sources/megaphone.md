---
title: Linking Megaphone as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Megaphone
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Megaphone connector syncs your podcast catalog – networks, podcasts, and episodes – into the PostHog data warehouse, so you can analyze your episode metadata alongside your product and marketing data. Download and impression metrics are not available through the Megaphone API.

> **Alpha:** This source is in alpha. If you run into issues, please [let us know](https://app.posthog.com/home#supportModal).

## Prerequisites

You need a Megaphone account with API access. Specifically:

- An **API token** created under **Settings > Generate new token** in Megaphone.
- Your **Organization ID**, found in the address bar after `/organizations/` when you're signed in to Megaphone.

## Adding a data source

<SourceSetupIntro />

When linking Megaphone, you'll need:

- **API token** – create one under **Settings > Generate new token** in your Megaphone account.
- **Organization ID** – copy it from the Megaphone address bar after `/organizations/` when signed in. It should only contain letters, numbers, and hyphens (e.g. `3ea516ea-a2d1-11e6-8e62-83147939747c`).

## Sync modes

<SyncModes />

The `networks` and `podcasts` tables are full refresh only, since the API exposes no incremental sync filter for these resources. The `episodes` table supports incremental sync on `updatedAt`.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get a **401 Unauthorized** error, your API token is invalid or has been revoked. Create a new token in Megaphone under **Settings > Generate new token**, then reconnect the source.

- If you get a **403 Forbidden** error, your API token doesn't have access to this organization. Check the organization ID and ensure the token's user role can read the organization, then reconnect.

- If you see **"Invalid Megaphone organization ID"**, copy the organization ID directly from the Megaphone address bar. It should only contain letters, numbers, and hyphens.

<TroubleshootingLink />
