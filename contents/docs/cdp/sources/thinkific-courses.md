---
title: Linking Thinkific Courses as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ThinkificCourses
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Thinkific Courses connector syncs courses, collections, course reviews, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Thinkific API key and account subdomain to pull your Thinkific course, review, enrollment, and order data.

You can create an API key under **Settings → Code & analytics → API** in your Thinkific admin. The subdomain is the `<subdomain>` part of your `<subdomain>.thinkific.com` admin URL.

You'll be asked for:

- **API key**
- **Subdomain**: for example `mycompany`.

## Sync modes

<SyncModes />

Some Thinkific Courses tables sync incrementally, so later runs only fetch new or updated rows. The rest are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
