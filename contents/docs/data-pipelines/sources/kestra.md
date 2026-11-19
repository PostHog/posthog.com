---
title: Linking Kestra as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Kestra
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Kestra connector syncs workflow executions, task runs, task outputs, metrics, daily execution statistics, flow definitions, flow revisions, trigger state, and logs from your [Kestra](https://kestra.io/) instance into the PostHog data warehouse, so you can analyze orchestration data alongside your product data.

## Prerequisites

- A Kestra instance that's publicly reachable over HTTPS (Cloud, Enterprise, or self-hosted)
- Your tenant ID – use `main` for Open Source, or your Cloud/Enterprise tenant ID
- Credentials to authenticate (API token or Basic auth – see below)

## Creating credentials

Kestra supports two authentication methods. Choose the one that matches your deployment.

### API token (Cloud or Enterprise)

1. In Kestra, go to **Settings** > **API Tokens**.
2. Create a new token and grant **read** access to flows, executions, and triggers for your tenant.
3. Copy the token – you'll paste it into PostHog when linking the source.

### Basic authentication (self-hosted)

If your self-hosted Kestra instance uses Basic authentication, you can enter your username and password directly in PostHog instead of an API token.

## Adding a data source

<SourceSetupIntro />

You'll be asked for:

- **Instance URL** – your Kestra HTTPS origin, for example `https://kestra.example.com`. Don't include a path or query string.
- **Tenant ID** – use `main` for Open Source, or your Cloud/Enterprise tenant ID.
- **Authentication** – select **API token** or **Basic authentication** and enter the corresponding credentials.

## Sync modes

<SyncModes />

| Table                        | Supported modes             |
| ---------------------------- | --------------------------- |
| `executions`                 | Incremental or full refresh |
| `task_runs`                  | Incremental or full refresh |
| `execution_metrics`          | Incremental or full refresh |
| `flows`                      | Full refresh                |
| `flow_revisions`             | Full refresh                |
| `triggers`                   | Full refresh                |
| `logs`                       | Incremental or full refresh |
| `task_outputs`               | Incremental or full refresh |
| `daily_execution_statistics` | Incremental or full refresh |

The `executions` table uses `start_date` as its incremental cursor. By default, each incremental sync re-reads the previous seven days so that recently updated executions are captured. To pick up changes older than seven days, run a full refresh.

The `task_runs` and `execution_metrics` tables fan out over executions, fetching detailed data for each execution in the sync window. They use `execution_start_date` as their incremental cursor and share the same seven-day lookback as `executions`.

The `task_outputs` table fans out over executions too. For each execution in the sync window, it lists the task runs that stored outputs, then fetches the outputs of each task run. It uses `execution_start_date` as its incremental cursor and shares the same seven-day lookback as `executions`. The `task_outputs` table is disabled by default in the schema picker because it makes one request for each task run that stored outputs.

The `daily_execution_statistics` table contains one row for each day, with execution counts and durations across every tenant of the instance. Each sync reads the last 30 days, which is the maximum window that Kestra allows, and uses `start_date` as its incremental cursor. Rows for days older than 30 days stay in PostHog after they leave the window.

The `logs` table uses `timestamp` as its incremental cursor. Because workers write logs asynchronously, each incremental sync re-reads the last hour to capture late-arriving entries. The `logs` table is disabled by default in the schema picker since it can contain a large volume of data.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync behavior

- The `task_runs` and `execution_metrics` tables request detail data for every execution in the sync window. For large execution volumes, these syncs can take longer than the base `executions` sync.
- The `task_outputs` table makes one request for each execution in the sync window, and one more request for each task run that stored outputs. For large execution volumes, this sync can take much longer than the base `executions` sync.
- The `outputs` column of the `task_outputs` table maps each output name to its value. Output names differ for each task.
- The `daily_execution_statistics` table drops the oldest day in the 30-day window, because Kestra counts only part of that day. This keeps a sync from replacing the full count that an earlier sync stored.
- The `flow_revisions` table fetches all revisions for each flow. This is always a full refresh since revisions are immutable.
- If an execution or flow is deleted between the list request and the detail request, the sync continues and returns zero rows for that parent rather than failing.
- Deleted or purged executions can't be recovered from the API. If executions are removed from Kestra, those rows won't reappear in PostHog.
- Log and metric entries don't have native identifiers in Kestra. PostHog generates an `entry_id` column using a hash of the entry content, which serves as the primary key for merges.
- Offset pagination can shift if records are deleted during a sync, which may cause rows to be skipped or duplicated in that run.

## Troubleshooting

- **"Kestra rejected your credentials"** – your API token or Basic auth details are wrong, expired, or revoked. Create a new token in **Settings** > **API Tokens** (or check your username and password), then reconnect the source.
- **"Kestra denied access"** – your credentials don't have read permission for the selected table. Grant read access in the Kestra tenant, then retry the sync.
- **Older executions aren't updating** – incremental syncs only re-read the last seven days. Run a full refresh to update older execution rows.
- **Task runs or metrics missing for long-running executions** – `task_runs` and `execution_metrics` share the same seven-day lookback as `executions`. If an execution runs for more than seven days, its task run data won't be refreshed after the watermark passes. Run a full refresh to update these rows.
- **Logs table has high data volume** – the `logs` table captures every log line from every task, which can be substantial. If you don't need log data, leave the table disabled in the schema picker.

<TroubleshootingLink />
