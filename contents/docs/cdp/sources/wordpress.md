---
title: Linking WordPress as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Wordpress
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The WordPress connector syncs posts, pages, comments, media, categories, tags, and users from a self-hosted WordPress site into the PostHog Data warehouse via the core REST API (`/wp-json/wp/v2`).

## Prerequisites

You need a self-hosted WordPress site with the core REST API available. Public, published content syncs without credentials. To sync private content or authenticate, you need WordPress 5.6+ on an HTTPS site so you can create an application password.

## Adding a data source

<SourceSetupIntro />

When linking WordPress, you'll need:

- **Site URL** – your WordPress site URL, for example `https://example.com`.
- **Username** – optional. Required only to authenticate or sync private content.
- **Application password** – optional. Create one under **Users > Profile > Application Passwords** ([application password docs](https://wordpress.org/documentation/article/application-passwords/)). Required only to authenticate or sync private content, and requires WordPress 5.6+ on an HTTPS site.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your username or application password may be invalid. Create a new application password and reconnect.
- If you see a permissions error, check the user's role has permission to read this data, then try again.
- If the site URL is rejected, use a publicly reachable URL, and make sure it uses HTTPS when you provide credentials.

<TroubleshootingLink />
