---
title: Linking Amazon DocumentDB as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AwsDocumentDB
---

> **Note:** This source is in **alpha**. It works the same way as the [MongoDB source](/docs/data-pipelines/sources/mongodb) under the hood, but hasn't been tested with as many configurations yet.

The Amazon DocumentDB connector can link your DocumentDB collections to PostHog.

## Prerequisites

DocumentDB clusters only accept connections from inside their VPC. Before linking, you need to make your cluster reachable from PostHog. A common approach is to place a Network Load Balancer (NLB) in front of the cluster:

1. Create an NLB in the same VPC as your DocumentDB cluster.
2. Add a target group that points to your cluster's endpoint on port 27017.
3. Allow PostHog's IP addresses in the cluster's security group (see [below](#inbound-ip-addresses)).
4. Use the NLB's public DNS name as the host in your connection string and add `directConnection=true&tlsAllowInvalidHostnames=true` to the query parameters.

## Linking DocumentDB

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and the sources tab in PostHog.
2. Click **New source** and select **Amazon DocumentDB**.
3. Enter your connection string. In the Amazon DocumentDB console, open your cluster, copy the string under **Connectivity & security**, and replace `<insertYourPassword>` with your password. If you're connecting through a load balancer, replace the host with your load balancer's address.
4. Enter the **Database name**. DocumentDB connection strings don't include a database name, so this field is required.
5. Click **Next**, select the collections you want to sync, as well as the [sync method](/docs/data-pipelines/sources#incremental-vs-full-table), and then press **Import**.

An example connection string through an NLB looks like:

```
mongodb://username:password@my-nlb.elb.us-east-1.amazonaws.com:27017/?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false&directConnection=true&tlsAllowInvalidHostnames=true
```

PostHog already trusts the AWS certificate bundle, so you don't need to provide a CA file.

Once the syncs are complete, you can start using DocumentDB data in PostHog.

> **Note:** DocumentDB data is unstructured so the returned columns are an `_id` field and a `data` column that contain the entire document contents. Data fields can be selected with dot notation (e.g. `data.field1`)

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

### Incremental and append-only syncing

Amazon DocumentDB supports incremental and append-only sync methods. For a field to be available for these sync methods, it must:

1. **Have an index** — only indexed fields are eligible.
2. **Be a supported type** — the following BSON types work:
   - `date` or `timestamp`
   - `int` or `long`
   - `double` or `decimal`
   - `objectId` (only for the `_id` field)

PostHog infers field types from the first 10,000 documents in the collection, so fields with mixed types may resolve to an unsupported type.

## Troubleshooting

### Connection timed out

PostHog can't reach the DocumentDB cluster. This usually means the cluster isn't accessible from outside its VPC.

- **No public route** – DocumentDB endpoints only resolve inside the VPC. Set up a Network Load Balancer or another proxy to make the cluster reachable, and use the proxy's public address in your connection string.

- **Security group blocks PostHog** – The cluster's security group must allow inbound traffic on port 27017 from PostHog's IP addresses.

- **Missing connection parameters** – When connecting through a load balancer, add `directConnection=true&tlsAllowInvalidHostnames=true` to your connection string. Without these, the driver may try to contact internal replica set members that aren't reachable.

### TLS or certificate errors

PostHog bundles the AWS global CA certificate, so TLS works out of the box. If you see a certificate error:

- **Custom `tlsCAFile` in connection string** – PostHog strips `tlsCAFile` from the connection string and uses its own bundle. Remove `tlsCAFile` from the string if present.

- **`tlsCRLFile` or `tlsCertificateKeyFile` in connection string** – These options reference files on the originating machine and aren't supported. Remove them from the connection string. PostHog returns a non-retryable error if they're present.

### No collections found

PostHog connected to DocumentDB but reports no collections in the selected database. This usually means one of the following:

- **Wrong database name** – Double-check that the **Database name** field matches the database that holds your data. DocumentDB connection strings don't include a database, so this must be set manually.

- **Missing read permissions** – Collection listing is filtered by authorization. Ensure your database user has a read role (such as `read` or `readAnyDatabase`) on the target database.

import InboundIpAddresses from '../\_snippets/inbound-ip-addresses.mdx'

<InboundIpAddresses />
