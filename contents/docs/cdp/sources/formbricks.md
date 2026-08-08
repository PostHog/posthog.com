---
title: Linking Formbricks as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Formbricks
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Formbricks connector syncs your surveys, responses, contacts, and more from Formbricks into the PostHog data warehouse. Use it to analyze survey results and respondent behavior alongside the product analytics data already in PostHog.

## Prerequisites

You need a Formbricks account with an API key. Create one under **Organization settings → API keys** in Formbricks. API keys are scoped to a single environment, so the connector imports that environment's data.

The connector works with both Formbricks Cloud and self-hosted Formbricks. If you self-host, your instance must be reachable over HTTPS from the public internet.

## Adding a data source

<SourceSetupIntro />

When linking Formbricks, you'll need:

- **API key** – create one under **Organization settings → API keys** in Formbricks.
- **Instance URL** – only required for self-hosted Formbricks. Enter your instance URL, for example `https://formbricks.example.com`. Leave it empty to use Formbricks Cloud (`https://app.formbricks.com`).

## Available tables

| Table                    | Description                                                                             | Sync method |
| ------------------------ | --------------------------------------------------------------------------------------- | ----------- |
| `surveys`                | Surveys in the environment, including their questions, triggers, and display settings   | Full refresh |
| `responses`              | Individual survey responses, including submitted answers and respondent metadata        | Incremental (by `updatedAt` or `createdAt`) |
| `contacts`               | Contacts (people) tracked in the environment                                            | Full refresh |
| `contact_attributes`     | Attribute values set on contacts                                                        | Full refresh |
| `contact_attribute_keys` | Attribute key definitions describing data that can be stored on contacts                | Full refresh |
| `action_classes`         | Action classes (user actions) that can trigger surveys                                  | Full refresh |
| `webhooks`               | Webhooks registered in the environment, fired when responses are created, updated, or finished | Full refresh |

## Sync modes

<SyncModes />

The `responses` table supports **incremental** sync using either `updatedAt` (the default, which also catches edits to existing responses) or `createdAt`. All other tables are **full refresh** only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your Formbricks API key may be invalid, revoked, or scoped to a different environment. Generate a new key under **Organization settings → API keys** in Formbricks, then reconnect.
- For self-hosted instances, make sure your instance URL uses `https://` and points directly at Formbricks (not a login or proxy page), and that it's reachable from the public internet.

<TroubleshootingLink />
