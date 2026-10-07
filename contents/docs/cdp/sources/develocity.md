---
title: Linking Develocity as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Develocity
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Develocity connector syncs Build Scan data into the PostHog data warehouse, so you can analyze build performance alongside your product data.

## Prerequisites

- A public HTTPS Develocity instance.
- An access key with the **Access build data via the API** permission. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

See the [Develocity API documentation](https://docs.develocity.ai/2026.3/reference/develocity-api/) for more details on the API.

Create an access key in Develocity under **My settings > Access keys**. The account needs the **Access build data via the API** permission.

You'll be asked for:

- **Instance URL**: The HTTPS URL of your Develocity instance (e.g., `https://develocity.example.com`).
- **Access key**: Your Develocity API access key.

## Sync modes

<SyncModes />

All Develocity tables support both incremental and full refresh sync. Incremental sync uses the `availableAt` timestamp to fetch only new or updated builds since the last sync.

If a build is edited or deleted after it was synced, you'll need to run a full refresh to update the data.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

### Table details

- **builds**: Build Scans received by Develocity, across all build tools.
- **gradle_builds**: Gradle Build Scans with build attributes, cache performance, and test performance models.
- **maven_builds**: Maven Build Scans with build attributes, cache performance, and test performance models.

## Troubleshooting

- **Authorization error**: Your access key is invalid or expired. Generate a new one in **My settings > Access keys**, then reconnect the source.
- **Forbidden error**: Your account doesn't have the **Access build data via the API** permission. Contact your Develocity administrator.
- **Invalid URL error**: Enter an HTTPS Develocity instance URL without a path, query, or embedded credentials (e.g., `https://develocity.example.com`).
- **No rows synced**: The credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
