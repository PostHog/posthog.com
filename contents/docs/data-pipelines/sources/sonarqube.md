---
title: Linking Sonar (SonarSource) - SonarQube Server as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Sonarqube
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Sonar (SonarSource) - SonarQube Server connector syncs projects, metric definitions and values, metric history, quality gates and their status per project, coding rules, issues, security hotspots, and users into the PostHog data warehouse, so you can analyze technical debt, reliability, coverage, and issue counts alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect your self-hosted SonarQube Server to pull code-quality data.

Using SonarQube Cloud (sonarcloud.io or sonarqube.us)? Connect it with the Sonar Cloud source instead.

Enter your server URL (e.g. `https://sonarqube.yourcompany.com`) and a user token. Create a token under **My Account → Security → Generate Tokens** in your SonarQube instance. The token inherits your permissions, so it can read the projects, issues, and rules you can see. Syncing the **users** table additionally requires the _Administer System_ permission.

You'll be asked for:

- **Server URL**: for example `https://sonarqube.yourcompany.com`.
- **User token**

## Sync modes

<SyncModes />

**Issues** support incremental sync: after the first run, only issues created since the last sync are fetched. Because SonarQube exposes no "updated since" filter for issues, status changes on existing issues (for example, an issue being resolved) are only picked up on a full refresh. **Measures history** also supports incremental sync: after the first run, only analyses from a day before the last synced analysis date onward are fetched. The overlap catches analyses that the server finished processing after the last sync. Every other table syncs with a full refresh each run.

**Component measures** holds one row per metric for every project, directory, and file, so it can grow large on big codebases. It is off by default; turn it on when you need file-level values. For project-level trends, use **measures history**.

**Hotspots** use an API that SonarQube Server 2026.4 deprecated in favor of security issues. On those versions, security findings also appear in the **issues** table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the user token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.
- **Fewer hotspots than expected on a large project.** SonarQube caps hotspot search results at 10,000 per project. Projects exceeding this limit have incomplete hotspot data.

<TroubleshootingLink />
