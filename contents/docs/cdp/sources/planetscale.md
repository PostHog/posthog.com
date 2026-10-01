---
title: Linking PlanetScale as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: PlanetScaleMySQL
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"
import InboundIpAddresses from "../_snippets/inbound-ip-addresses.mdx"

<AlphaRelease />

The PlanetScale connector links your PlanetScale database tables to PostHog, so you can query them alongside your product data. PlanetScale offers both MySQL and Postgres databases, and PostHog has a source for each.

## Prerequisites

A PlanetScale database, and a role or password with read access to the tables you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Pick **PlanetScale MySQL** or **PlanetScale Postgres** to match your database.

### PlanetScale MySQL

In the PlanetScale dashboard, open your database, pick the branch, and click **Connect**. Create a password there and copy the host, username, and password it shows.

- **Host**: looks like `aws.connect.psdb.cloud`.
- **Port**: `3306`.
- **Database**: the database name, shown in the connection details.
- **Username** and **Password**: the credentials created by **Connect**.
- **Schema**: optional. Leave blank to include every database on the branch.

### PlanetScale Postgres

In the PlanetScale dashboard, open your database and click **Connect** to create a role and read its connection details. You can paste the whole connection string instead of filling the fields one by one.

- **Host**: looks like `xxxxxxxxxx-useast1-1.horizon.psdb.cloud`.
- **Port**: use `5432` for a direct connection. Port `6432` goes through PSBouncer, which works for standard syncs but not for change data capture. PSBouncer pools in transaction mode, and logical replication cannot run over it.
- **Database**: the database name, usually `postgres`.
- **User**: PlanetScale usernames carry the branch id, so they look like `postgres.xxxxxxxxxx`.
- **Password**: the password for that role.
- **Schema**: optional, defaults to `public`.

PlanetScale always connects over TLS, which PostHog uses by default.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the username or password is wrong or has been revoked. Create new credentials with **Connect** in the PlanetScale dashboard, then reconnect the source.
- If PostHog cannot reach your database, check that PlanetScale allows connections from the PostHog IP addresses below.

<InboundIpAddresses />

<TroubleshootingLink />
