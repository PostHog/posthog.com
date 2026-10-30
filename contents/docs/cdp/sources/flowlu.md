---
title: Linking Flowlu as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Flowlu
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Flowlu connector syncs your CRM, project, task, and finance data from Flowlu into the PostHog data warehouse. Use it to combine your accounts, opportunities, invoices, and time tracking with the product analytics data already in PostHog and query across all of it.

## Prerequisites

You need a Flowlu account with an API key. You can create one under **Portal Settings → API Settings** in Flowlu.

## Adding a data source

<SourceSetupIntro />

When linking Flowlu, you'll need:

- **API key** – create one under **Portal Settings → API Settings** in Flowlu.
- **Account subdomain** – the first part of your portal URL. For `acme.flowlu.com`, the subdomain is `acme`.

## Available tables

| Table               | Description                                                                    |
| ------------------- | ------------------------------------------------------------------------------ |
| `accounts`          | CRM accounts – organizations or contacts you do business with                  |
| `leads`             | CRM opportunities tracked through a sales pipeline (Flowlu's API keeps the legacy `lead` name) |
| `pipelines`         | CRM sales pipelines that opportunities move through                            |
| `tasks`             | Tasks from Flowlu's task management module                                     |
| `projects`          | Projects from Flowlu's project management module                               |
| `invoices`          | Invoices issued to customers in the finance module                             |
| `estimates`         | Estimates (quotes) prepared for customers in the finance module                |
| `customer_payments` | Payments received from customers, typically applied against invoices           |
| `transactions`      | Money transactions (income or expense) recorded in the finance module          |
| `agile_issues`      | Issues (user stories, tasks, or bugs) on agile boards                          |
| `agile_sprints`     | Sprints within agile projects                                                  |
| `timesheets`        | Time-tracking entries logged against tasks or projects                         |
| `products`          | Products and services from the product catalog                                 |

## Sync modes

All Flowlu tables are **full refresh** only – the whole table is reloaded on every sync. Flowlu's list endpoints don't expose a server-side timestamp filter, so there's no reliable cursor for incremental sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your Flowlu API key may be invalid or revoked. Generate a new key under **Portal Settings → API Settings** in Flowlu, then reconnect.
- If your API key doesn't have access to the data you expect, check the key's permissions in Flowlu, then reconnect.

<TroubleshootingLink />
