---
title: Linking Trunk.io as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TrunkIo
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Trunk.io connector syncs flaky test data from your CI pipelines into the PostHog data warehouse, so you can analyze test health and stability alongside your product data.

## Prerequisites

You need a Trunk.io account with API access. You'll also need access to the repository you want to sync data from.

## Adding a data source

<SourceSetupIntro />

When linking Trunk.io, you'll need:

- **API token** – create one in the Trunk app under **Settings** > **Organization** > **General** > **API**.
- **Organization slug** – find this at [app.trunk.io/trunk/settings](https://app.trunk.io/trunk/settings) under **Organization Name** > **Slug**.
- **Repository host** – for example, `github.com`.
- **Repository owner** – the GitHub organization or user that owns the repository.
- **Repository name** – the name of the repository you want to sync data from.

## Available tables

New Trunk.io sources use API v2 and sync all of the tables below. Existing sources remain on v1 and see only the repository-scoped tables.

### Repository tables

| Table              | Description                                                                     | Sync method  |
| ------------------ | ------------------------------------------------------------------------------- | ------------ |
| `UnhealthyTests`   | Tests Trunk currently considers flaky or broken, combining both status filters. | Full refresh |
| `QuarantinedTests` | Tests currently quarantined (failures suppressed) in this repository.           | Full refresh |
| `FailingTests`     | Distinct tests that failed at least once within a given time window.            | Incremental  |

### Test collection tables (v2 only)

Available for organizations that use [test collections](https://docs.trunk.io/flaky-tests/reference/api-reference).

| Table             | Description                                                                     | Sync method  |
| ----------------- | ------------------------------------------------------------------------------- | ------------ |
| `TestCollections` | Test collections in the organization, with test counts and quarantine settings. | Full refresh |
| `Tests`           | Tests across every test collection, with current status and quarantine state.   | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API token may be invalid or revoked. Create a new token in your Trunk organization settings and reconnect.
- If data isn't syncing, verify that the organization slug and repository details (host, owner, name) are correct.

<TroubleshootingLink />
