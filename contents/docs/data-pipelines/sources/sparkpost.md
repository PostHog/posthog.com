---
title: Linking SparkPost as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SparkPost
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The SparkPost connector syncs your email data into the PostHog Data warehouse, including message events, deliverability metrics, suppression lists, recipient lists, templates, sending domains, subaccounts, and webhooks, so you can analyze your email program alongside your product data.

## Prerequisites

You need a SparkPost account with API access so you can create an API key. SparkPost runs independent US and EU stacks that do not share data, so you'll need to know which region your account is on.

## Adding a data source

<SourceSetupIntro />

When linking SparkPost, you'll need:

- **Region** – pick the region your account is on: US (api.sparkpost.com) or EU (api.eu.sparkpost.com).
- **API key** – create one in your [SparkPost account settings](https://app.sparkpost.com/account/api-keys) (or the EU console at app.eu.sparkpost.com). Grant the read permissions for the data you want to sync, for example `Events: Read-only`, `Metrics: Read-only`, `Suppression Lists: Read-only`, `Recipient Lists: Read-only`, `Templates: Read-only`, `Sending Domains: Read-only`, `Subaccounts: Read-only`, and `Webhooks: Read-only`.

## Sync modes

<SyncModes />

SparkPost data retention varies by endpoint:

- **Message events** – retained for 10 days, so the initial events sync can only reach back that far.
- **Deliverability metrics** – retained for 6 months, so the initial metrics sync covers up to 180 days of historical data.

The deliverability metrics tables (`deliverability_time_series`, `deliverability_by_template`, `bounce_reasons`, `bounce_reasons_by_domain`, `rejection_reasons`, `rejection_reasons_by_domain`, `delay_reasons`, and `delay_reasons_by_domain`) use incremental sync with a `date` field. Each row represents one UTC day of aggregated data. These tables don't support append mode because each sync re-fetches the latest day to capture final totals.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authorization error, your SparkPost API key is invalid. Generate a valid key and reconnect.
- If you get a permission error, your API key is missing the read permissions for this data. Grant the required permissions and reconnect.

<TroubleshootingLink />
