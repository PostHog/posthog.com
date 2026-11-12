---
title: Linking Virtuous as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Virtuous
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Virtuous connector syncs your nonprofit CRM data – contacts, gifts, recurring gifts, pledges, projects, campaigns, events, and more – into PostHog, so you can analyze donor and fundraising data alongside your product data.

## Prerequisites

You need a Virtuous CRM+ account with API key access. Create an API key in Virtuous under **Settings** > **Connectivity** > **API keys**. The key's permission group determines which tables it can read.

## Adding a data source

<SourceSetupIntro />

When linking Virtuous:

- **API key** – Paste the API key you created in Virtuous. The key is stored securely and used to authenticate all requests.

## Sync modes

<SyncModes />

Most Virtuous tables support incremental sync using the `modifiedDateTimeUtc` field. Incremental syncs include a one-day lookback window because Virtuous compares the "Last Modified Date" filter in the organization's time zone, and day-level precision means a short overlap is needed to avoid missing records near the boundary.

The following tables only support full refresh because they lack a reliable modified timestamp:

- `gift_designations`
- `tasks`
- `tags`
- `organization_groups`
- `segments`

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

| Table                 | Description                                                                         | Incremental sync |
| --------------------- | ----------------------------------------------------------------------------------- | ---------------- |
| `contacts`            | Contacts (households, organizations, foundations and other donor records)           | ✅               |
| `contact_individuals` | Individuals: the people that belong to a contact                                    | ✅               |
| `contact_notes`       | Notes recorded on contacts                                                          | ✅               |
| `gifts`               | Gifts (donations) with full details, including designations, premiums, and payments | ✅               |
| `gift_designations`   | The part of a gift's amount assigned to a project                                   | ❌               |
| `gift_asks`           | Requests for a gift made to a contact                                               | ✅               |
| `planned_gifts`       | Planned gifts, such as bequests and other future commitments                        | ✅               |
| `pledges`             | Promises to give an amount over time                                                | ✅               |
| `recurring_gifts`     | Repeating donations on a schedule                                                   | ✅               |
| `premiums`            | Items given to donors in exchange for a gift                                        | ✅               |
| `campaigns`           | Fundraising efforts that group communications and segments                          | ✅               |
| `projects`            | The funds, programs, and causes gifts are designated to                             | ✅               |
| `events`              | Events the organization runs, such as galas and fundraisers                         | ✅               |
| `event_attendees`     | Invitations to events, with RSVP and attendance status                              | ✅               |
| `grants`              | Grants the organization applies for or receives                                     | ✅               |
| `tasks`               | Tasks assigned to users, often linked to a contact                                  | ❌               |
| `tags`                | Tags that can be applied to contacts                                                | ❌               |
| `organization_groups` | Groups of contacts, such as churches, chapters, or teams                            | ❌               |
| `segments`            | The audiences of a campaign communication that gifts are attributed to              | ❌               |

## Troubleshooting

<TroubleshootingLink />
