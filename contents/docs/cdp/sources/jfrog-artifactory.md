---
title: Linking JFrog as a source
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

<CalloutBox icon="IconFlask" title="Alpha source" type="action">

The JFrog source is currently in **alpha**. If you run into issues, please let us know.

</CalloutBox>

The JFrog connector syncs data from your JFrog Platform (Artifactory) instance – repositories, artifacts, builds, and per-repository storage usage – into PostHog, so you can analyze your artifact registry alongside your product data. It works with both JFrog SaaS (`<company>.jfrog.io`) and self-hosted installs.

## Prerequisites

You need:

- Your **JFrog Platform URL**, e.g. `https://mycompany.jfrog.io` for SaaS, or your own domain for a self-hosted install. On PostHog Cloud the URL must use `https`.
- An **access token** with read access to the data you want to sync. Generate one from your JFrog user profile under **Edit Profile > Generate an Identity Token**, or, as an admin, under **Administration > User Management > Access Tokens**.

The `artifacts` and `repositories` tables work with any authenticated token that can read your repositories. The `builds` and `storage_summary` tables require an admin user (or a token scoped to those APIs) – deselect them during setup if your token can't access them.

## Adding a data source

<SourceSetupIntro />

When linking JFrog, provide:

1. **Platform URL**: your JFrog Platform origin, e.g. `https://mycompany.jfrog.io`. Enter the platform URL itself, without a trailing `/artifactory` path.
2. **Access token**: the token created above.

Then select the tables you want to sync. The `builds` and `storage_summary` tables aren't selected by default, since they require an admin token.

## Sync modes

<SyncModes />

The `artifacts` and `builds` tables support incremental syncing – JFrog's Artifactory Query Language (AQL) filters both server-side, so incremental syncs only fetch rows changed since the last sync. `artifacts` can sync incrementally on `modified` (default) or `created`; `builds` syncs on `created`.

The `repositories` table has no server-side timestamp filter, so it uses full refresh. The `storage_summary` table is a point-in-time snapshot of per-repository storage usage, and is fully reloaded on every sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

The `builds` and `storage_summary` tables require an admin user or a token scoped to the relevant JFrog API. If your access token can't reach them, deselect them during setup or reconnect with a token that has the required access.

## Troubleshooting

<TroubleshootingLink />
