---
title: Linking Docker Hub as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Dockerhub
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Docker Hub connector syncs repositories, tags, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Docker Hub username and a personal access token to pull your container repositories and tags.

You can create a personal access token with **Read** access under **Account settings → Personal access tokens** in [Docker Hub](https://app.docker.com/settings/personal-access-tokens). To import an organization's repositories instead of your own, set the namespace field to the organization name.

You'll be asked for:

- **Username**
- **Personal access token**

## Sync modes

<SyncModes />

All Docker Hub tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the personal access token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
