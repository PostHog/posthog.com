---
title: Linking Opsgenie as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Opsgenie
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Opsgenie connector pulls your Opsgenie alerting and on-call data – alerts, incidents, users, teams, schedules, escalations, services, and integrations – into the PostHog data warehouse.

<CalloutBox icon="IconWarning" title="Opsgenie end of support" type="caution">

Atlassian has announced [end of support for Opsgenie](https://support.atlassian.com/opsgenie/docs/important-update-opsgenie-end-of-support-announcement/). Opsgenie APIs are scheduled to shut down on April 5, 2027, after which this source will stop syncing.

</CalloutBox>

## Prerequisites

You need an Opsgenie API key with **Read** access. The `integrations` table additionally requires **Configuration access**. You can create a key in Opsgenie under **Settings → API key management**.

## Adding a data source

<SourceSetupIntro />

When linking Opsgenie, you need to provide:

1. Your Opsgenie **API key** from **Settings → API key management**.
2. Your Opsgenie **region** – US (`api.opsgenie.com`) or EU (`api.eu.opsgenie.com`), matching the region your Opsgenie account is hosted in.

## Sync modes

<SyncModes />

The `alerts` and `incidents` tables support incremental sync on `createdAt`. Opsgenie's search API can only filter on creation time, so incremental syncs pick up newly created rows but not later status changes to existing rows – run a periodic full refresh if you need those reflected.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If the source fails to connect, check that the API key was created under **Settings → API key management** (not an integration-specific key), that it has **Read** access, and that the selected region matches your Opsgenie account.

<TroubleshootingLink />
