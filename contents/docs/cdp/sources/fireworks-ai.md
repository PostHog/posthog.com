---
title: Linking Fireworks AI as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: FireworksAI
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Fireworks AI connector syncs models, datasets, deployments, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Fireworks AI API key and account ID to sync your models, datasets, deployments, fine-tuning jobs, batch inference jobs, evaluations, and account users.

You can find or create an API key in your [Fireworks AI account settings](https://app.fireworks.ai/settings/users/api-keys). Your account ID is shown in your account settings and in every resource name (`accounts/<account-id>/...`).

You'll be asked for:

- **API key**
- **Account ID**: for example `my-account`.

## Sync modes

<SyncModes />

All Fireworks AI tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
