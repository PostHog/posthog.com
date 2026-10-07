---
title: Linking Scrunch as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Scrunch
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Scrunch connector syncs AI brand monitoring data into the PostHog Data warehouse, so you can analyze how your brand appears in AI-generated responses alongside your product data.

Scrunch tracks how brands are mentioned in AI platforms like ChatGPT and Claude, including sentiment analysis, citations, competitor mentions, and brand positioning.

## Prerequisites

You need a Scrunch account with an **Agency** or **Enterprise** plan to create an API key. API access may also be enabled by Scrunch on request.

The API key must have **Query scope** and access to the brands you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Scrunch, you'll need:

- **API key** – create one under **Organization menu → API Keys** in your Scrunch account. Select **Query** scope and grant access to the brands you want to sync.

## Sync modes

<SyncModes />

For the `responses` table, incremental sync uses the `created_at` field as the watermark. Response imports exclude the current UTC day to ensure complete data. Older reevaluations may require a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

The following tables are available:

| Table         | Sync mode                   | Description                                                                              |
| ------------- | --------------------------- | ---------------------------------------------------------------------------------------- |
| `brands`      | Full refresh                | Brands available to the API key                                                          |
| `prompts`     | Full refresh                | Tracked prompts, including active, paused, and archived                                  |
| `competitors` | Full refresh                | Competitors configured for each brand                                                    |
| `personas`    | Full refresh                | Personas configured for each brand                                                       |
| `responses`   | Incremental or full refresh | AI answers to tracked prompts with brand evaluations, citations, and competitor mentions |

## Troubleshooting

- **Authentication error**: Your API key is invalid or has been revoked. Create a new key in your organization's API Keys menu, then reconnect.
- **Permission error (403 or 402)**: The key is missing brand access or Query scope. API access requires an Agency or Enterprise plan, or an override from Scrunch.

<TroubleshootingLink />
