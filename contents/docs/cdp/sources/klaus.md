---
title: Linking Klaus as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Klaus
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Klaus connector syncs your Zendesk QA (formerly Klaus) quality assurance data – conversation reviews, AutoQA results, CSAT responses, disputes, scorecards, calibration sessions, and quizzes – into PostHog.

## Prerequisites

You need a Zendesk QA account with API access. Only admins and account managers can create the API token the connector uses.

## Adding a data source

<SourceSetupIntro />

When linking Zendesk QA, you'll need:

- **Zendesk subdomain** – the first part of your Zendesk URL. For `yourcompany.zendesk.com`, enter `yourcompany`.
- **API token** – created by an admin or account manager in Zendesk QA under **Settings > Auto QA and integrations > API**.

## Sync modes

<SyncModes />

The Zendesk QA public API is heavily rate limited, so large initial syncs can take a while. Syncs pace themselves around the rate limit and resume automatically if interrupted. We recommend incremental sync where available to keep follow-up syncs small.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid credentials**: check the subdomain matches your Zendesk URL and that the API token was created by an admin or account manager and hasn't been revoked.
- **Slow syncs**: the Zendesk QA public API enforces a strict rate limit, so a full history import can take hours on large accounts. Later incremental syncs only fetch recent data and finish much faster.

<TroubleshootingLink />
