---
title: Linking Recurly as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Recurly
---

The Recurly connector syncs your subscription billing data into PostHog, including accounts, subscriptions, invoices, transactions, and more.

To link Recurly:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Recurly.

3. You need a private API key from Recurly. In your Recurly dashboard, go to **Integrations** > **API Credentials** and create a new private API key. Copy the key value.

4. Back in PostHog, paste the API key in the `API key` field.

5. Select the **Region** that matches your Recurly site — either **US** (`v3.recurly.com`) or **EU** (`v3.eu.recurly.com`). The region must match where your Recurly site is hosted.

6. Click **Next**.

7. On the next page, set up the schemas you want to sync and modify the method and frequency as needed. Once done, click **Import**.

Once the syncs are complete, you can start using Recurly data in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
