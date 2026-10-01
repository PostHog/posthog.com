---
title: Linking SFTP as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SFTP
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The SFTP connector syncs your file storage data into the PostHog data warehouse, so you can analyze it alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Import CSV and JSON files from an SFTP server. PostHog lists the files in the folder you point it at, including subfolders, and creates one table per file, or one combined table if you prefer. Every sync reads the files in full, so each table matches what's on the server right now.

You'll be asked for:

- **Host**: for example `sftp.example.com`.
- **Port**: for example `22`.
- **Username**: for example `posthog`.
- **Authentication type**: choose between Password and SSH private key.
- **Folder**: for example `/incoming`.
- **File format**: choose between Detect from file extension, CSV, JSON Lines and JSON.

## Sync modes

<SyncModes />

All SFTP tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the password is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
