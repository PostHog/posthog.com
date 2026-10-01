---
title: Linking MotherDuck as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Motherduck
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The MotherDuck connector links your MotherDuck tables to PostHog, so you can query your DuckDB data alongside your product data.

## Prerequisites

A MotherDuck account, and an access token that can read the databases you want to sync.

## Adding a data source

<SourceSetupIntro />

Create an access token in your MotherDuck account settings, then enter it here.

- **Access token**: the token from your MotherDuck account settings.
- **Database**: optional. Leave blank to connect to every database in the account.
- **Schema**: optional. Leave blank to import every schema.

PostHog opens the connection read-only, so it never modifies your data.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the access token is wrong or has been revoked. Create a new token in MotherDuck, then reconnect the source.
- If a database or schema is missing from the table picker, check that the token can read it, or leave the database and schema fields blank to browse everything the token can reach.

<TroubleshootingLink />
