---
title: Linking BoldDesk as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: BoldDesk
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The BoldDesk connector syncs your help desk data – tickets, ticket updates, ticket worklogs, contacts, contact groups, agents, satisfaction ratings, groups, and brands – into PostHog, so you can analyze support activity alongside your product data.

## Prerequisites

You need a BoldDesk account with API access. You'll need your BoldDesk subdomain and an API key.

## Adding a data source

<SourceSetupIntro />

When linking BoldDesk, you'll need:

- **Subdomain** – the subdomain of your BoldDesk account. For `https://yourcompany.bolddesk.com/`, the subdomain is `yourcompany`. If you use a custom domain, enter your `bolddesk.com` subdomain instead.
- **API key** – create one in BoldDesk under **Profile → API keys** (`https://yourcompany.bolddesk.com/agent/personal-settings`). The API key reads the same tickets and records as the agent who created it.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

### Table details

| Table                  | Description                                 | Sync method  |
| ---------------------- | ------------------------------------------- | ------------ |
| `tickets`              | Support tickets                             | Incremental  |
| `ticket_updates`       | Replies and notes added to tickets          | Incremental  |
| `ticket_worklogs`      | Time logged against tickets                 | Incremental  |
| `contacts`             | Customer contacts                           | Incremental  |
| `contact_groups`       | Contact groups (usually customer companies) | Incremental  |
| `agents`               | Help desk users                             | Incremental  |
| `satisfaction_ratings` | Customer satisfaction (CSAT) ratings        | Incremental  |
| `groups`               | Agent groups                                | Full refresh |
| `brands`               | Help desk portals                           | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Troubleshooting

<TroubleshootingLink />
