---
title: Linking JetBrains TeamCity as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Teamcity
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The JetBrains TeamCity connector syncs your CI/CD data - builds, test results, build problems, VCS changes, projects, and agents - into the PostHog Data warehouse, so you can analyze build duration, pass rates, and deployment frequency alongside your product data.

## Prerequisites

You need a TeamCity server (self-hosted or TeamCity Cloud) that PostHog can reach over HTTPS, and a user account with view permissions on the projects and builds you want to sync. The connector reads data through TeamCity's REST API using an access token, which inherits the token owner's permissions.

## Adding a data source

<SourceSetupIntro />

When linking TeamCity, you'll need:

- **Server URL** – the root URL of your TeamCity server, for example `https://teamcity.example.com`. If your server runs under a context path, include it, for example `https://ci.example.com/teamcity`.
- **Access token** – create one in TeamCity under **Your profile → Access Tokens**.

## Sync modes

The `builds` and `changes` tables support incremental syncs: only builds finished (or changes committed) after the last sync are fetched. The `test_occurrences` and `problem_occurrences` tables are fetched per build, so their incremental syncs only cover newly finished builds. Because a first sync of these two tables walks your server's whole retained build history one build at a time, they are not selected by default - enable them deliberately if you want per-test and per-problem history.

Synced builds cover all branches, not just the default branch, and only include finished builds (running, canceled, and personal builds are excluded).

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your access token is invalid or has expired. Create a new token under **Your profile → Access Tokens**, then reconnect.
- If you see a permissions error, the token owner is missing view permissions on some projects. TeamCity only returns data the token owner can see, so grant the right project permissions, then reconnect.
- If some projects or builds are missing, check the token owner's roles - the connector can only sync what that user can view in the TeamCity UI.

<TroubleshootingLink />
