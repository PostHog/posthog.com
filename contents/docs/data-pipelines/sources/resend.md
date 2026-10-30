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

The Resend connector pulls your Resend data – audiences, broadcasts, contacts, domains, emails, suppressions, email metrics, and broadcast clicked links – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Resend.
3. Next, you need an API key from Resend. In your [Resend API keys settings](https://resend.com/api-keys), create an API key. Grant the key **full access** (or a read-enabled access token) so that all Resend data can be read. Copy the key value (it starts with `re_`).
4. Back in PostHog, enter the key in the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Resend data in PostHog.

## Available tables

| Table                     | Description                                                      | Sync method  |
| ------------------------- | ---------------------------------------------------------------- | ------------ |
| `audiences`               | Contact audiences in your Resend account                         | Full refresh |
| `broadcasts`              | Broadcasts sent through Resend                                   | Full refresh |
| `broadcast_clicked_links` | Click counts per URL for each broadcast                          | Full refresh |
| `contacts`                | Contacts across each of your audiences                           | Full refresh |
| `domains`                 | Sending domains                                                  | Full refresh |
| `emails`                  | Sent emails                                                      | Full refresh |
| `email_metrics`           | Daily email delivery, bounce, open, click, and complaint metrics | Full refresh |
| `suppressions`            | Suppressed email addresses with suppression origin               | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
