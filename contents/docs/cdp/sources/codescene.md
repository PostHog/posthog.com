---
title: Linking CodeScene as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Codescene
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The CodeScene connector syncs your engineering analytics data – projects, per-file Code Health metrics, and architectural components – into PostHog, so you can correlate code quality with product usage.

## Prerequisites

You need a CodeScene account (Cloud or on-prem) with API access. To generate an API token, you must have an Admin, Architect, or RestApi role in CodeScene.

## Adding a data source

<SourceSetupIntro />

When linking CodeScene, you'll need:

- **API token** – generate a Personal Access Token from the [CodeScene API tokens page](https://docs.enterprise.codescene.io/latest/integrations/rest-api.html). The token must have the Admin, Architect, or RestApi role.
- **API base URL** (optional) – leave blank to use CodeScene Cloud (`https://api.codescene.io/v2`), or enter your on-prem CodeScene server's API URL (for example `https://codescene.yourcompany.com:3003/api/v2`).

## Sync modes

<SyncModes />

CodeScene tables are full refresh only, since the CodeScene API doesn't support filtering by update time. Each sync pulls the current snapshot of your projects' latest analysis data.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your API token is invalid or has been revoked, generate a new Personal Access Token from the CodeScene API tokens page, then reconnect.
- If you receive a 403 error, verify your API token has the Admin, Architect, or RestApi role required by the API.
- For on-prem CodeScene installations, ensure the API base URL includes the full path (e.g., `https://codescene.yourcompany.com:3003/api/v2`).

<TroubleshootingLink />
