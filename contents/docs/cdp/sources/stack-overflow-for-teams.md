---
title: Linking Stack Overflow for Teams as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: StackOverflowForTeams
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Stack Overflow for Teams connector syncs your internal Q&A knowledge base into the PostHog Data warehouse – questions, answers, articles, tags, users, and collections. This is for [Stack Overflow for Teams](https://stackoverflowteams.com/) (the private, enterprise knowledge base by Prosus/Stack Exchange), not the public Stack Overflow website.

Once synced, you can query your knowledge base data alongside your product data, join it with other sources, and use it in insights and dashboards.

## Prerequisites

You need a [Stack Overflow for Teams](https://stackoverflowteams.com/) account with permission to create personal access tokens. You don't need admin access – read-only (Basic) access is sufficient.

## Adding a data source

<SourceSetupIntro />

When linking Stack Overflow for Teams, you need:

- **Team name** – the name of your Stack Overflow for Teams team (for example, `engineering`). This is the slug that appears in your team's URL at `stackoverflowteams.com`.
- **Personal access token** – create one under **Account Settings → Personal access tokens** in your Stack Overflow for Teams account. Scope the token to the team you want to connect. Read-only (Basic) access is sufficient – you don't need to grant write access.

## Sync modes

<SyncModes />

All Stack Overflow for Teams tables use full refresh only. The Stack Overflow for Teams v3 API doesn't expose reliable server-side timestamp filters, so each sync reloads all data.

| Table         | Sync method  |
| ------------- | ------------ |
| `Questions`   | Full refresh |
| `Answers`     | Full refresh |
| `Articles`    | Full refresh |
| `Tags`        | Full refresh |
| `Users`       | Full refresh |
| `Collections` | Full refresh |

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Available tables

| Table         | Description                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------ |
| `Questions`   | Questions posted to your knowledge base, including title, body, tags, score, and view count.     |
| `Answers`     | Answers posted to questions, including body, score, accepted status, and the parent question ID. |
| `Articles`    | Knowledge-base articles (Business/Enterprise tier), including title, body, type, and tags.       |
| `Tags`        | Tags used to categorize questions and articles, with post counts and watcher counts.             |
| `Users`       | Users on your team site, including name, email, department, job title, and reputation.           |
| `Collections` | Curated collections of questions and articles, including title, description, and tags.           |

> **Note:** The `Articles` table is only available on Stack Overflow for Teams Business and Enterprise plans.

## Troubleshooting

- **Authorization error (401)** – your personal access token is invalid or has expired. Create a new token under **Account Settings → Personal access tokens** in Stack Overflow for Teams, then reconnect.
- **Permission error (403)** – your personal access token doesn't have access to this team or resource. Check that the token is scoped to the correct team, then reconnect.
- **Missing articles** – articles are only available on Stack Overflow for Teams Business and Enterprise plans. If your team is on the Basic plan, the `Articles` table won't return data.

<TroubleshootingLink />
