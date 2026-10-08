---
title: Linking DeepSource as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Deepsource
beta: true
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The DeepSource connector pulls your static analysis and code health data into the PostHog data warehouse: repositories, analysis runs, open issues and their occurrences, dependency vulnerabilities, code quality metrics, and compliance reports. This lets you trend code quality across repositories over time and join it with the rest of your data.

## Prerequisites

- A DeepSource account with at least one repository activated for analysis.
- A DeepSource personal access token. Generate one from the **Tokens** tab in your [DeepSource user settings](https://app.deepsource.com/). The token is scoped to your account, so it can read every account and repository you have access to.

## Adding a data source

<SourceSetupIntro />

You need three values to connect:

- **Personal access token**: generated from the **Tokens** tab in your DeepSource user settings.
- **Account login**: the organization or user name exactly as it appears in DeepSource. For a GitHub organization, this is the organization's login.
- **VCS provider**: the version control system your DeepSource account is connected to (GitHub, GitLab, Bitbucket, and others).

Only PostHog Cloud connections to DeepSource Cloud (`api.deepsource.com`) are supported. Self-hosted DeepSource instances aren't supported yet.

## Sync modes

<SyncModes />

DeepSource's GraphQL API doesn't expose server-side timestamp filters, so all DeepSource tables sync as full refresh. Only repositories activated for analysis on DeepSource are scanned for runs, issues, metrics, and reports.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **"Invalid DeepSource personal access token"**: the token is wrong, expired, or was revoked. Generate a new token from the **Tokens** tab in your DeepSource user settings and reconnect.
- **"DeepSource account not found"**: the account login or VCS provider doesn't match an account your token can access. Check both values against how the account appears in DeepSource.
- **Slow syncs on large accounts**: DeepSource rate-limits API usage to 5,000 requests per hour per account. Accounts with many activated repositories may take a while to sync; the sync backs off and resumes automatically when rate limited.

<TroubleshootingLink />
