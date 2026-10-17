---
title: Linking Amazon DocumentDB as a source
sidebar: Docs
showTitle: true
availability: { free: full, selfServe: full, enterprise: full }
sourceId: AwsDocumentDB
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import InboundIpAddresses from "../_snippets/inbound-ip-addresses.mdx"

> **Alpha:** This source is in alpha. If you run into issues, reach out to [our support team](/docs/support).

The Amazon DocumentDB connector syncs collections from a DocumentDB cluster into the PostHog data warehouse. DocumentDB is MongoDB-compatible, so this source works the same way as the [MongoDB source](/docs/cdp/sources/mongodb). This page covers what is different for DocumentDB.

## Prerequisites

DocumentDB clusters only accept connections from inside their VPC. Before you link the cluster, make it reachable from PostHog:

1. Put the cluster behind something PostHog can reach from the internet, for example a Network Load Balancer.
2. Allow PostHog's IP addresses in the cluster's security group. They are listed under [Inbound IP addresses](#inbound-ip-addresses).

PostHog rejects hosts that resolve to a private address, so the connection string must use an address that is reachable from the public internet, such as the load balancer's.

You also need a database user with read access to the collections you want to sync.

PostHog doesn't support SSH tunnels for DocumentDB.

<InboundIpAddresses />

## Adding a data source

<SourceSetupIntro />

When linking Amazon DocumentDB, you'll need:

- **Connection string**: in the Amazon DocumentDB console, open your cluster and copy the connection string under **Connectivity & security**. Replace `<insertYourPassword>` with your password.
- **Database name**: the database to import. This is required, because DocumentDB connection strings don't include one.

If you connect through a load balancer, use the load balancer's address as the host, and add `directConnection=true&tlsAllowInvalidHostnames=true` to the connection string options.

PostHog already trusts the AWS certificate bundle, so you don't need to download a certificate. If the connection string you copy names a certificate file with `tlsCAFile`, you can leave it in. PostHog ignores it.

## Sync modes

<SyncModes />

Incremental and append-only syncs work the same way as for MongoDB. See [incremental and append-only syncing](/docs/cdp/sources/mongodb#incremental-and-append-only-syncing) on the MongoDB page for which fields you can use.

Each collection syncs as an `_id` column and a `data` column that holds the whole document. Select fields with dot notation, for example `data.field1`.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

Error messages for this source refer to MongoDB, because DocumentDB uses the MongoDB connector. See [Troubleshooting](/docs/cdp/sources/mongodb#troubleshooting) on the MongoDB page for errors the two sources share.

- **Could not reach your MongoDB cluster**: check that the cluster is running, that it is reachable from outside its VPC, and that PostHog's IP addresses are allowed in its security group.
- **PostHog rejected this source's database host**: the host in the connection string resolves to a private address. Use an address that is reachable from the public internet, such as your load balancer's.
- **MongoDB authentication failed**: check the username and password in the connection string.
- **Database name is required**: fill in the **Database name** field.

<TroubleshootingLink />
