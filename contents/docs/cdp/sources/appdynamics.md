---
title: Linking Splunk AppDynamics (Cisco) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Appdynamics
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Splunk AppDynamics (Cisco) connector syncs your APM data into the PostHog Data warehouse, including applications, business transactions, tiers, nodes, health rule violations, and metric time series. This lets you join application performance signals with your product data for SLA and SLO reporting.

## Prerequisites

You need access to an AppDynamics controller (SaaS or on-premises) and either:

- an **API client** created under **Administration → API Clients** in your controller (recommended), or
- a **username and password** for a local controller user.

The API client or user needs read access to the applications you want to sync. If your account signs in via Cisco Identity Provider, basic authentication is disabled and an API client is required.

## Adding a data source

<SourceSetupIntro />

When linking AppDynamics, you'll need:

- **Controller URL** – your controller's base URL, e.g. `https://mycompany.saas.appdynamics.com`.
- **Account name** – your controller account name, e.g. `mycompany`. You can find it under **Settings → License** in the controller.
- **Authentication** – either an API client name and client secret, or a username and password.
- **Metric paths** (optional) – the metric browser paths to sync into the `metric_data` table, one per line. Wildcards are supported, e.g. `Business Transaction Performance|*|*|Average Response Time (ms)`. Defaults to `Overall Application Performance|*`.

## Sync modes

<SyncModes />

The `health_rule_violations` and `metric_data` tables sync incrementally using the row's start time (`startTimeInMillis`). Violations are synced when they start, so status changes to previously synced violations (for example, a violation resolving) are only picked up on a full refresh. The other tables support full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your credentials are invalid or expired, or the OAuth token exchange failed. Check your controller URL, account name, and API client name and secret, then reconnect.
- If you see a permissions error, your user or API client is missing read access to application data. Grant the required roles in the controller, then reconnect.
- If the `metric_data` table is empty, check that your configured metric paths match entries in the controller's metric browser for the synced applications.

<TroubleshootingLink />
