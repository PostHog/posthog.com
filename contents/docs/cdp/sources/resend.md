---
title: Linking Resend as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Resend
---

The Resend connector can link audiences, broadcasts, domains, emails, and contacts to PostHog.

## Available tables

| Table | Description |
| ----- | ----------- |
| `audiences` | Email audiences you've created in Resend |
| `broadcasts` | Email broadcasts (bulk email campaigns) |
| `domains` | Configured sending domains |
| `emails` | Individual email messages sent through Resend |
| `contacts` | Contacts from your audiences, with an `_audience_id` field linking each contact to its parent audience |

## Linking Resend

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Resend.

3. You need an API key from Resend. Go to [resend.com/api-keys](https://resend.com/api-keys) and click **Create API Key**. Give it a name and grant at least **read access** (or full access). Copy the key value, which starts with `re_`.

4. Back in PostHog, paste the API key in the **API key** field and click **Next**.

5. Select the schemas you want to sync and configure the sync method and frequency. Once done, click **Import**.

Once the syncs are complete, you can start using Resend data in PostHog.
