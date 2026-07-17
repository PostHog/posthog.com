---
title: Linking Netlify as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Netlify
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Netlify connector syncs your Netlify sites, deploys, builds, forms, form submissions, DNS zones, accounts, and members into the PostHog data warehouse for engineering and marketing analytics.

## Prerequisites

You need a Netlify account and a personal access token. The token has full access to the resources your account can reach, so no extra scopes are required.

## Adding a data source

<SourceSetupIntro />

You need a Netlify personal access token. Create one under **User settings > Applications > Personal access tokens** in the [Netlify UI](https://app.netlify.com/user/applications).

> **Note:** Netlify invalidates tokens on password reset. SAML SSO teams must opt tokens in during generation.

## Sync modes

<SyncModes />

All Netlify tables are full refresh only, since the API exposes no server-side timestamp filter.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an access-denied error, your token may be invalid or revoked (Netlify invalidates tokens on password reset). Create a new token and reconnect.

<TroubleshootingLink />
