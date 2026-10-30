---
title: Linking Linode as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Linode
beta: true
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Linode connector syncs your [Linode](https://www.linode.com) (Akamai Connected Cloud) account data – Linodes, volumes, NodeBalancers, Kubernetes clusters, domains, users, invoices, payments, and account events – into PostHog to build cost and infrastructure reporting alongside your product data.

## Prerequisites

You need a Linode (Akamai Connected Cloud) account and a **personal access token**, created in the [Linode Cloud Manager](https://cloud.linode.com/profile/tokens).

Grant the token **read-only** access to the resources you want to sync:

- **Account** – invoices, payments, events, and users
- **Linodes**
- **Volumes**
- **NodeBalancers**
- **Kubernetes**
- **Domains**

You only need to grant the scopes for the data you actually want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Linode, you'll need:

- **Personal access token** – create one in the [Linode Cloud Manager](https://cloud.linode.com/profile/tokens) with read-only access to the resources listed above.

## Sync modes

<SyncModes />

The `invoices` table supports incremental sync on its `date` field, and the `events` table syncs append-only using its monotonic `id`. All other tables use full refresh – they're resource inventories that are re-pulled on each sync so they always reflect the current state.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see a 401 error, your personal access token is invalid or has been revoked. Create a new token in the [Linode Cloud Manager](https://cloud.linode.com/profile/tokens) and reconnect.
- If a table returns no rows, confirm the token has read access to that resource – for example, `invoices` and `payments` require the **Account** read scope.

<TroubleshootingLink />
