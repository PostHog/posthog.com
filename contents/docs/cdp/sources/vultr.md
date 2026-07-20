---
title: Linking Vultr as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Vultr
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Vultr connector syncs your cloud infrastructure inventory and billing data into PostHog – instances, bare metal servers, Kubernetes clusters, block storage, snapshots, load balancers, managed databases, users, billing history, and invoices. Use it to join spend and resource usage with your product and revenue data, or to build cost dashboards across your compute, storage, and managed services.

## Prerequisites

You need a Vultr account with API access enabled and a personal access token.

## Adding a data source

<SourceSetupIntro />

When linking Vultr, you'll need an **API key**:

1. Sign in to the [Vultr customer portal](https://my.vultr.com).
2. Go to **Account > API** ([my.vultr.com/settings/#settingsapi](https://my.vultr.com/settings/#settingsapi)).
3. Copy your **Personal Access Token**. If you don't have one, click **Enable API** and generate a token.
4. If **Access Control** is enabled for the API, add PostHog's egress IP addresses to the allowlist (or allow all IPs) so PostHog can reach the Vultr API.

Paste the token into the **API key** field when adding the source in PostHog.

## Sync modes

<SyncModes />

The Vultr API doesn't expose an updated-since filter or webhooks on any list endpoint, so every table syncs with a full refresh on each run. Vultr accounts typically hold a small number of resources per table, so a full refresh is inexpensive.

| Table                 | Sync method  |
| --------------------- | ------------ |
| `instances`           | Full refresh |
| `bare_metals`         | Full refresh |
| `kubernetes_clusters` | Full refresh |
| `block_storage`       | Full refresh |
| `snapshots`           | Full refresh |
| `load_balancers`      | Full refresh |
| `managed_databases`   | Full refresh |
| `users`               | Full refresh |
| `billing_history`     | Full refresh |
| `invoices`            | Full refresh |

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid API key** – regenerate the token under **Account > API** in the Vultr portal and reconnect the source.
- **Requests blocked / 403** – your token is valid but Vultr's API access control list is blocking PostHog. Add PostHog's egress IPs to the API key's allowlist, or temporarily allow all IPs.

<TroubleshootingLink />
