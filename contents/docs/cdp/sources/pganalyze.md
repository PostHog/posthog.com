---
title: Linking pganalyze as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: PgAnalyze
---

The pganalyze connector syncs your Postgres database performance data into PostHog, including servers and issues (performance findings like missing indexes, vacuum problems, and slow queries).

To link pganalyze:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to pganalyze.
3. Enter your pganalyze **API key**. To create one, go to your pganalyze organization settings and generate a read-only API key.
4. Enter your **organization slug**. This is the slug from your pganalyze URL (e.g., if your URL is `https://app.pganalyze.com/organizations/acme`, the slug is `acme`).
5. _Optional:_ If you're using pganalyze Enterprise Server (self-hosted), enter your custom **API URL**. Leave this blank for pganalyze Cloud.
6. _Optional:_ Add a prefix to your table names.
7. Click **Next**.

The data warehouse then starts syncing your pganalyze data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Available tables

| Table | Description |
|-------|-------------|
| servers | Your Postgres servers monitored by pganalyze, including server names and metadata |
| issues | Performance findings from pganalyze checks, such as missing indexes, vacuum lag, slow queries, and schema recommendations |

## Configuration

<SourceParameters />

## Using pganalyze data in the Inbox

Once linked, pganalyze issues can feed into PostHog's [Inbox](/docs/support/overview) as signals. This surfaces database performance findings alongside other customer-facing signals from sources like Zendesk, Linear, and GitHub.

To enable pganalyze signals in the Inbox:

1. Go to [Inbox](https://app.posthog.com/inbox) in PostHog.
2. Click **Sources**.
3. Find **pganalyze** and click **Enable**.

pganalyze issues then appear as signals in your Inbox, grouped and summarized alongside your other signal sources.
