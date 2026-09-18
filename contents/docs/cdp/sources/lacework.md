---
title: Linking Lacework FortiCNAPP as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Lacework
---

import AlphaRelease from "../\_snippets/alpha-release.mdx"
import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

<AlphaRelease />

The Lacework FortiCNAPP (Fortinet) connector syncs your cloud security data – alerts, host and container vulnerabilities, compliance evaluations, machines, agents, and console audit logs – into PostHog, so you can trend cloud risk, audit control coverage, and correlate security findings with the rest of your data.

## Prerequisites

You need a Lacework FortiCNAPP account and an API key. Creating API keys requires an account admin role. In the FortiCNAPP Console, go to **Settings** > **Configuration** > **API keys**, click **Add New**, then download the generated key file to get the **key ID** and **secret key**.

## Adding a data source

<SourceSetupIntro />

When linking Lacework FortiCNAPP, you'll need:

- **Account name** – the first part of your FortiCNAPP URL: `https://<account name>.lacework.net`.
- **API key ID** – the `keyId` value from the downloaded API key file.
- **Secret key** – the `secret` value from the downloaded API key file.

## Sync modes

<SyncModes />

Most tables (vulnerabilities, compliance evaluations, machines, audit logs) are append-only histories of time-windowed records without a unique row id, so they support append and full refresh syncs. The `alerts` table also supports incremental sync on `startTime`; note that incremental syncs filter by when an alert *started*, so status changes on older alerts are only picked up by a full refresh.

The Lacework API only serves recent history, so the first sync (and any full refresh) reaches back a bounded window: 90 days for alerts, audit logs, and compliance evaluations, 30 days for vulnerabilities and machines, and 7 days for the agent inventory.

Lacework rate-limits API access to 480 requests per hour. Large environments may need more than one sync run to complete the initial backfill; syncs pick up where they left off.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
