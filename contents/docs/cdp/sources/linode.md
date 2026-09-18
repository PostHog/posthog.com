---
title: Linking Linode as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Linode
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

Sync your Linode (Akamai Connected Cloud) account data — infrastructure inventory, billing history, and audit events — into the PostHog data warehouse to join it with your product data.

## Prerequisites

You need a Linode account with permission to create a personal access token. Grant read-only access to the resources you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Linode, you'll need:

- **Personal access token** – create one in the [Linode Cloud Manager](https://cloud.linode.com/profile/tokens) under **Profile → API Tokens**. Grant **read-only** access to the resources you plan to sync (Account, Linodes, Volumes, NodeBalancers, Kubernetes, Domains).

## Sync modes

<SyncModes />

Account events sync in append-only mode (an immutable audit log; the Linode API only retains the last 90 days). Invoices sync incrementally by date. Infrastructure inventories (linodes, volumes, nodebalancers, LIKE clusters, domains, users, payments) use full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
