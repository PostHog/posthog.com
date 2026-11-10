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

The Sonar (SonarSource) - SonarQube Server connector syncs code-quality data into the PostHog data warehouse – projects, their analyses, branches, and pull requests, metric definitions and values, metric history, quality gates and their status per project, coding rules, issues and their change history, security hotspots, and users – so you can trend technical debt, reliability, coverage, and issue counts alongside your product data.

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

**Issues** support incremental sync: after the first run, only issues created since the last sync are fetched (using the `createdAfter` filter on the issue creation date). Because SonarQube has no "updated since" filter for issues, status changes on existing issues (e.g. an issue being resolved) are only picked up on a full refresh. **Measures history** also syncs incrementally: after the first run, only analyses from a day before the last synced date onward are fetched (using the `from` filter). The overlap catches analyses that the server finished processing after the last sync. **Project analyses** sync incrementally the same way, on the analysis date. All other tables sync with a full refresh each run.

**Component measures** holds one row per metric for every project, directory, and file, so it can grow large on big codebases. It's off by default; turn it on when you need file-level values. For project-level trends, use **measures history**.

**Issue changelog** needs one request per issue because SonarQube returns one issue's history at a time. On instances with many issues, a sync takes a long time. It's off by default.

**Project pull requests** only has data on Developer Edition and above. Community Build doesn't analyze pull requests, so this table stays empty there.

**Users** requires the _Administer System_ permission. It's off by default.

**Hotspots** use an API that SonarQube Server 2026.4 deprecated in favor of security issues. On those versions, security findings also appear in the **issues** table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the user token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.
- If the **users** table fails to sync, the token's user needs the _Administer System_ permission. Either grant it or leave the users table unselected.
- If you see fewer issues than expected on a large project, note that SonarQube caps issue search at 10,000 results per query window. PostHog automatically pages past this by re-windowing on the issue creation date, so all issues are synced. If you still see gaps, check that the token can browse the affected projects.
- If the **project_pull_requests** table is empty, this table only has data on Developer Edition and above. Community Build doesn't analyze pull requests.
- If you see fewer hotspots than expected on a large project, note that SonarQube caps hotspot search at 10,000 results per project. PostHog can't page past this limit, so projects with more hotspots have incomplete hotspot data.

<TroubleshootingLink />
