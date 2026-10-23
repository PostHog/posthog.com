---
title: Linking Netlify as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Netlify
beta: true
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Netlify connector syncs your [Netlify](https://www.netlify.com) data – sites, deploys, builds, forms, form submissions, DNS zones, accounts, and members – into PostHog, so you can analyze your deployment and hosting activity alongside your product data.

## Prerequisites

You need a Netlify account and a **personal access token**. The token has full access to the resources your account can reach, so no extra scopes are needed.

## Adding a data source

<SourceSetupIntro />

When linking Netlify, you'll need:

- **Personal access token** – create one under **User settings > Applications > Personal access tokens** in the [Netlify UI](https://app.netlify.com/user/applications). Netlify tokens are prefixed with `nfp_`.

## Sync modes

<SyncModes />

All Netlify tables sync as full refresh, so each run re-pulls the current state and always reflects the latest sites, deploys, and submissions.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see a 401 error, your personal access token is invalid or has been revoked. Create a new token under **User settings > Applications > Personal access tokens** and reconnect.
- If the `forms` or `submissions` tables are empty, the sites in your account may not use Netlify Forms – these tables reflect the forms actually configured on your sites.

<TroubleshootingLink />
