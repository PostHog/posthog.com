---
title: Linking Gitea as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Gitea
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

<CalloutBox icon="IconFlask" title="Alpha source" type="action">

The Gitea source is currently in **alpha**. If you run into issues, please let us know.

</CalloutBox>

The Gitea connector syncs repository data from your self-hosted Gitea (or Forgejo) instance – issues, pull requests, commits, releases, labels, and milestones – into PostHog, so you can analyze engineering activity alongside your product data.

## Prerequisites

You need:

- A Gitea instance reachable over HTTPS from the internet. Plain `http://` instance URLs are not supported.
- An access token with read access to the repository you want to sync. Create one on your instance under **Settings > Applications > Manage access tokens** with the `read:repository` and `read:issue` scopes.

To let PostHog create the real-time webhook automatically, the token also needs admin access to the repository. This is optional – you can set the webhook up manually, or skip webhooks entirely and rely on scheduled syncs.

## Adding a data source

<SourceSetupIntro />

When linking Gitea, provide:

1. **Instance URL**: your Gitea host, e.g. `https://gitea.example.com`.
2. **Access token**: the token created above.
3. **Repository**: the repository to sync, in the format `owner/repo`.

## Sync modes

<SyncModes />

Issues and commits support incremental syncing: Gitea filters both server-side, so incremental syncs only fetch what changed since the last sync. Pull requests, releases, labels, and milestones don't expose a server-side filter in Gitea's API, so those tables use full refresh.

## Webhooks

The issues and pull requests tables can be kept up to date in real time using a Gitea webhook instead of re-polling. PostHog attempts to create the webhook automatically; if your token lacks admin access to the repository, you can set it up manually:

1. Go to your repository's **Settings > Webhooks** on your Gitea instance
2. Click **Add webhook** and choose **Gitea**
3. Paste the webhook URL shown during setup into the **Target URL** field
4. Set **HTTP method** to **POST** and **POST content type** to **application/json**
5. Enter a **Secret** and add the same value to the **Signing secret** field in PostHog
6. Under **Trigger on**, choose **Custom events** and tick **Issues** and **Pull request**
7. Click **Add webhook**

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
