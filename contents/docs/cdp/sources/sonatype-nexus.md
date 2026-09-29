---
title: Linking Sonatype (Nexus Repository) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SonatypeNexus
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Sonatype (Nexus Repository) connector syncs repositories, components, assets, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect your Sonatype Nexus Repository instance to pull your artifact inventory.

Enter your instance URL (e.g. `https://nexus.example.com`) and the username and password of a user with read access to the repositories you want to sync. A [user token](https://help.sonatype.com/en/user-tokens.html) also works: use the token name code as the username and the pass code as the password.

The tasks table additionally requires the `nx-tasks-read` privilege; deselect it if your user doesn't have it.

You'll be asked for:

- **Instance URL**: for example `https://nexus.example.com`.
- **Username**
- **Password**

## Sync modes

<SyncModes />

All Sonatype (Nexus Repository) tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the password is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
