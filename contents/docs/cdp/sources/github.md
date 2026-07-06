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

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The GitHub connector syncs your repository data – issues, pull requests, commits, and more – into PostHog, so you can analyze engineering activity alongside your product data.

## Prerequisites

You need access to the GitHub repository you want to sync. You can authenticate using OAuth (recommended), which connects your GitHub account automatically, or with a personal access token.

## Adding a data source

<SourceSetupIntro />

When linking GitHub, choose an **Authentication type**:

- **OAuth (GitHub App)** – the default and recommended method. Select your GitHub account and follow the prompts to connect it. This handles authentication automatically.
- **Personal access token** – create a token in your [GitHub Settings](https://github.com/settings/tokens) under **Developer settings > Personal access tokens**, then paste it into PostHog.

Then enter the **Repository** you want to sync in the format `owner/repo` (e.g. `posthog/posthog`).

## Sync modes

<SyncModes />

## Webhooks

The workflow runs and workflow jobs tables can be kept up to date in real time using a GitHub webhook, rather than re-polling. PostHog attempts to create the webhook automatically. If automatic creation fails, your token needs webhook permissions – the **admin:repo_hook** scope on a classic token, or **Repository webhooks: read and write** on a fine-grained token – or you can set the webhook up manually:

1. Go to your repository's **Settings > Webhooks** on GitHub
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
