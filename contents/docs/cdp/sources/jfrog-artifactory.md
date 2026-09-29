---
title: Linking JFrog (Artifactory / JFrog Platform) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: JfrogArtifactory
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The JFrog (Artifactory / JFrog Platform) connector syncs repositories, artifacts, builds, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect your JFrog Platform instance to pull your Artifactory data.

Enter your platform URL (e.g. `https://mycompany.jfrog.io`, or your own domain for self-hosted installs) and an access token. Generate a token from your JFrog user profile (**Edit Profile → Generate an Identity Token**) or, as an admin, under **Administration → User Management → Access Tokens**.

The `artifacts` and `repositories` tables work with any authenticated token that can read your repositories. The `builds` and `storage_summary` tables require an admin user (or a token scoped to those APIs); deselect them if your token can't access them.

You'll be asked for:

- **Platform URL**: for example `https://mycompany.jfrog.io`.
- **Access token**

## Sync modes

<SyncModes />

Some JFrog (Artifactory / JFrog Platform) tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the access token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
