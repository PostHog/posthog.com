---
title: Linking Kubecost (IBM / Apptio) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Kubecost
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Kubecost (IBM / Apptio) connector syncs allocation by namespace, allocation by controller, allocation by pod, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect your Kubecost deployment to pull Kubernetes cost allocation and infrastructure asset costs.

Enter the URL where your Kubecost cost-model API is reachable (e.g. `https://kubecost.example.com` - with or without the `/model` suffix). Self-hosted Kubecost ships with no built-in auth, so the API must be exposed to PostHog, typically behind an ingress or auth proxy. If your deployment or proxy requires a token (e.g. Kubecost Cloud), provide it as the API key and it is sent as a bearer token - this requires an `https://` URL so the key is never sent in plaintext.

You'll be asked for:

- **Kubecost API URL**: for example `https://kubecost.example.com`.

## Sync modes

<SyncModes />

All Kubecost (IBM / Apptio) tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key (optional) is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
