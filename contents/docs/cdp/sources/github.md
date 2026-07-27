---
title: Linking GitHub as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Github
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The GitHub connector syncs your repository data – issues, pull requests, commits, and more – into PostHog, so you can analyze engineering activity alongside your product data. You can sync multiple repositories in a single source.

## Prerequisites

You need access to the GitHub repositories you want to sync. You can authenticate using OAuth (recommended), which connects your GitHub account automatically, or with a personal access token.

## Adding a data source

<SourceSetupIntro />

When linking GitHub, choose an **Authentication type**:

- **OAuth (GitHub App)** – the default and recommended method. Select your GitHub account and follow the prompts to connect it. This handles authentication automatically.
- **Personal access token** – create a token in your [GitHub Settings](https://github.com/settings/tokens) under **Developer settings > Personal access tokens**, then paste it into PostHog.

Then select the **Repositories** you want to sync. You can add up to 100 repositories per source.

- With **OAuth**, PostHog lists the repositories available to your connected GitHub App installation. Use the search field to filter.
- With a **personal access token**, type each repository in `owner/repo` format (e.g. `posthog/posthog`) and press Enter.

### Table naming

PostHog creates a table for each repository and endpoint combination. Table names follow the pattern `github_owner_repo__endpoint`. For example, syncing `posthog/posthog` produces tables like `github_posthog_posthog__issues` and `github_posthog_posthog__pull_requests`.

## Sync modes

<SyncModes />

## Webhooks

The workflow runs and workflow jobs tables can be kept up to date in real time using GitHub webhooks, rather than re-polling. PostHog creates one webhook per repository, all sharing the same signing secret. If automatic creation fails, your token needs webhook permissions – the **admin:repo_hook** scope on a classic token, or **Repository webhooks: read and write** on a fine-grained token – or you can set the webhooks up manually.

Repeat the following steps for each repository, using the **same Secret** every time:

1. Go to the repository's **Settings > Webhooks** on GitHub
2. Click **Add webhook**
3. Paste the webhook URL shown during setup into the **Payload URL** field
4. Set **Content type** to **application/json**
5. Enter a **Secret** and add the same value to the **Signing secret** field in PostHog
6. Under **Which events would you like to trigger this webhook?**, choose **Let me select individual events** and tick **Workflow jobs** and **Workflow runs**
7. Click **Add webhook**

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
