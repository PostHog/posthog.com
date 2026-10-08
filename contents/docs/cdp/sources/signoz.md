---
title: Linking SigNoz as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SigNoz
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

Connect your SigNoz workspace to sync logs, traces, alert rules, dashboards, and notification channels into the PostHog data warehouse. This lets you join observability data with product analytics, for example correlating error logs or slow traces with user behavior.

## Prerequisites

- A SigNoz Cloud workspace (e.g. `example.signoz.io`) or a self-hosted SigNoz instance reachable over HTTPS.
- A SigNoz API key. API keys are created from service accounts, and only users with the **Admin** role can create service accounts. A key with the **Viewer** role is enough for syncing.

## Adding a data source

<SourceSetupIntro />

You'll need your SigNoz host and an API key:

1. Your **SigNoz host** is your SigNoz Cloud tenant hostname (e.g. `example.signoz.io`) or your self-hosted instance URL.
2. To create an **API key**, in SigNoz go to **Settings** > **Service Accounts**, create a service account, then generate a key from its **Keys** tab.
3. Back in PostHog, enter the host and API key, then click **Next**.
4. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

## Sync modes

<SyncModes />

The `logs` and `traces` tables support incremental syncs on their `timestamp` field and are bounded by your SigNoz retention window on the initial sync. Alert rules, dashboards, and notification channels are small configuration tables that fully refresh on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid SigNoz API key**: the key was rejected. Generate a new key from a service account in **Settings** > **Service Accounts** and reconnect.
- **Missing permissions**: the service account's role doesn't allow reading this data. Check the role and reconnect.
- **Older logs or traces are missing**: the initial sync can only reach back as far as your SigNoz retention window.

<TroubleshootingLink />
