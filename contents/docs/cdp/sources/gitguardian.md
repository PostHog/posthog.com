---
title: Linking GitGuardian as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Gitguardian
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The [GitGuardian](https://www.gitguardian.com) connector syncs your secret incidents, their occurrences, monitored sources, honeytokens, members, and teams into PostHog, so you can track exposure volume, remediation time, and per-repository risk alongside your other engineering data.

## Prerequisites

You need a GitGuardian workspace and an API token. Reading incidents requires a token with at least the Manager access level. EU and self-hosted GitGuardian instances are also supported.

## Adding a data source

<SourceSetupIntro />

When linking GitGuardian, you'll need:

- **API token** – create a service account token (recommended for unattended syncs) or a personal access token in your [GitGuardian API settings](https://dashboard.gitguardian.com/api). Grant the read scopes for the tables you want to sync: `incidents:read`, `sources:read`, `honeytokens:read`, `members:read`, and `teams:read`.
- **API URL** _(optional)_ – leave blank for the US SaaS instance. Workspaces on the EU instance should set it to `https://api.eu1.gitguardian.com`; self-hosted instances should enter their own API URL (must be HTTPS).

## Available tables

| Table                | Description                                                                | Sync method           |
| -------------------- | -------------------------------------------------------------------------- | --------------------- |
| `secret_incidents`   | A detected secret with its triage status and remediation timeline          | Incremental on `date` |
| `secret_occurrences` | A single place a secret was found (commit, file, ...)                      | Incremental on `date` |
| `sources`            | A monitored source (repository, ...) with scan health and incident counts  | Full refresh          |
| `honeytokens`        | Decoy credentials and whether they were triggered                          | Full refresh          |
| `members`            | Workspace members with their access level and activity                     | Full refresh          |
| `teams`              | Workspace teams                                                            | Full refresh          |

**Incremental** syncs on the incident and occurrence tables use a 7-day lookback window. Rows are detected with an immutable `date` timestamp, but triage fields like `status`, `resolved_at`, and `presence` keep changing afterwards. The lookback re-reads recently detected rows each sync to pick up those late changes; merge deduplication on the row `id` prevents duplicates. Status changes on rows older than the lookback window are only recaptured by a full refresh.

**Full refresh** tables reload all data on each sync. These are typically small and have no stable timestamp to sync on.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If syncs fail with an authorization error, the token was likely revoked or expired. Create a fresh token in your GitGuardian API settings and reconnect.
- If a specific table reports a permission error, the token is missing that table's read scope, or (for incidents) the token's access level is below Manager. Update the token's scopes and access level, then retry.
- GitGuardian rate-limits API tokens and enforces monthly call quotas. Large initial backfills on busy workspaces may be slowed down by rate limiting; syncs back off and retry automatically.

<TroubleshootingLink />
