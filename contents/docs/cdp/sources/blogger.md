---
title: Linking Blogger as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Blogger
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Blogger connector syncs your publicly visible Blogger content – posts, pages, and comments – into the PostHog Data warehouse, so you can analyze your published content alongside your product data.

## Prerequisites

You need a Google account with a project in the [Google Cloud console](https://console.cloud.google.com/apis/credentials) where you can create an API key and enable the Blogger API v3. The API key reads publicly visible content only. Drafts and admin-only data require OAuth, which isn't supported yet.

## Adding a data source

<SourceSetupIntro />

When linking Blogger, you'll need:

- **API key** – create one in the [Google Cloud console](https://console.cloud.google.com/apis/credentials) and enable the **Blogger API v3** for the project.
- **Blog ID** – shown in the Blogger dashboard URL (`blogger.com/blog/posts/<blogId>`).

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new key in the Google Cloud console with the Blogger API enabled, then reconnect.
- If you see a permissions error, the key cannot access this blog. Enable the Blogger API for your Google Cloud project and confirm the blog is publicly visible, then reconnect.

<TroubleshootingLink />
