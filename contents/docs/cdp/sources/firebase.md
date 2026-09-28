---
title: Linking Firebase as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Firebase
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Firebase connector syncs your database data into the PostHog data warehouse, so you can analyze it alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect a Firebase project to pull Cloud Firestore collections, Firebase Auth users, and Realtime Database paths.

Create a service account key in the Firebase console under Project settings, Service accounts, Generate new private key, then upload that JSON file here. Grant the service account **Firebase Viewer** to read Auth users, **Cloud Datastore Viewer** to read Firestore, and **Firebase Realtime Database Viewer** to read the Realtime Database.

You'll be asked for:

- **Firebase service account JSON key file**

## Sync modes

<SyncModes />

All Firebase tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the firebase service account JSON key file is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
