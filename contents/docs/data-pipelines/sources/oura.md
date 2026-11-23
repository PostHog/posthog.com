---
title: Linking Oura as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Oura
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Oura connector syncs your Oura Ring health data into PostHog, so you can analyze your health and activity metrics alongside your product data.

## Prerequisites

You need an Oura account with access to the data you want to sync. A PostHog project admin must connect the Oura account before other project members can select it.

## Adding a data source

<SourceSetupIntro />

When you reach the credentials step, use the **Oura account** field:

1. Click **Choose Oura connection**, then **Connect to Oura**. If your project already has an Oura connection, you can select it instead.
2. Sign in to Oura and authorize PostHog to access your data.
3. After you return to PostHog, confirm the Oura connection is selected, then click **Next** to choose your tables.

PostHog requests the `email`, `personal`, `daily`, `heartrate`, `workout`, `tag`, `session`, `spo2`, and `heart_health` scopes. The `email` and `personal` scopes identify your connected account. The remaining scopes provide access to your health and activity data. Grant access to the data types you want to sync.

PostHog refreshes expired access tokens automatically.

## Reconnecting an existing source

Oura retired personal access tokens in December 2025. If you previously connected with a personal access token, reconnect using OAuth:

1. In the [Sources tab](https://app.posthog.com/data-management/sources), open your existing Oura source and select **Configuration**.
2. Under **Oura account**, use **Choose Oura connection** (or **Change** if a connection is already selected) to connect your Oura account. Sign in to Oura and authorize access.
3. Return to your existing source's **Configuration** tab, select the authorized Oura connection under **Oura account**, and click **Save**.

Existing sources do not switch to OAuth automatically. If your source reports **Reconnect your Oura account**, follow these steps to update its connection.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Authentication error or missing connection:** [Reconnect your Oura account](#reconnecting-an-existing-source) if access has been revoked or the connection was deleted.
- **Permission error:** Reconnect your Oura account and grant access to the data type you want to sync. Also check that your Oura membership is active.
- **Oura app not configured:** [Contact PostHog support](/support).

<TroubleshootingLink />
