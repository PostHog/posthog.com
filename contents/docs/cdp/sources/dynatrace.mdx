---
title: Linking Dynatrace as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Dynatrace
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

Connect your Dynatrace environment to sync problems, events, entity inventory (hosts, services, applications, process groups), audit logs, vulnerabilities, metric metadata, and SLOs into the PostHog data warehouse. This is useful for reporting on incident history, availability, and infrastructure alongside your product data.

## Prerequisites

- A Dynatrace SaaS or Managed environment and its environment URL. For SaaS this looks like `https://abc12345.live.dynatrace.com`; for Managed it's `https://your-domain/e/your-environment-id`.
- Permission to create [access tokens](https://docs.dynatrace.com/docs/manage/identity-access-management/access-tokens-and-oauth-clients/access-tokens) in that environment.

## Adding a data source

<SourceSetupIntro />

When linking Dynatrace, you need two values:

- **Environment URL** - the URL where you open Dynatrace, for example `https://abc12345.live.dynatrace.com`.

- **API access token** - create one under **Settings** > **Access tokens** in Dynatrace. Grant read scopes only for the data you want to sync:
  - `problems.read` for problems
  - `events.read` for events
  - `entities.read` for hosts, services, applications, and process groups
  - `auditLogs.read` for audit logs (audit logging must be enabled in the environment)
  - `securityProblems.read` for vulnerabilities
  - `metrics.read` for metric metadata
  - `slo.read` for SLOs

Tables the token can't read are flagged in the table picker, so you can deselect them instead of granting every scope.

## Sync modes

<SyncModes />

Problems, events, and audit logs support incremental syncs based on their timestamps. The other tables are snapshots of the current state, so they use full refresh.

## Available tables

| Table               | Description                                                                       | Sync method  |
| ------------------- | --------------------------------------------------------------------------------- | ------------ |
| `problems`          | Problems detected by Dynatrace (initial sync goes back 365 days)                  | Incremental  |
| `events`            | Events (initial sync goes back 30 days)                                           | Incremental  |
| `audit_logs`        | Audit log events (initial sync goes back 30 days, requires audit logging enabled) | Incremental  |
| `security_problems` | Security vulnerabilities detected by Dynatrace                                    | Full refresh |
| `hosts`             | Host entities active in the last 30 days                                          | Full refresh |
| `services`          | Service entities active in the last 30 days                                       | Full refresh |
| `applications`      | Application entities active in the last 30 days                                   | Full refresh |
| `process_groups`    | Process group entities active in the last 30 days                                 | Full refresh |
| `metrics`           | Metric metadata (the metric catalog, not time series data)                        | Full refresh |
| `slos`              | Service level objectives with current evaluation                                  | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

- On the initial sync, problems go back 365 days, and events and audit logs go back 30 days (bounded by your environment's retention).
- The entity tables (hosts, services, applications, process groups) include entities active in the last 30 days.
- Metric time series aren't synced — the `metrics` table contains metric metadata (the metric catalog), not data points.

## Troubleshooting

- **Invalid Dynatrace API token** - the token was rejected. Check that it hasn't expired or been revoked, and that the environment URL points at the environment the token was created in.
- **Missing scope errors** - grant the read scope listed in the prerequisites for the affected table, or deselect the table.

<TroubleshootingLink />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
