---
title: Linking Chatwoot as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Chatwoot
beta: true
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

<AlphaRelease />

The Chatwoot connector syncs your customer support data – conversations, messages, contacts, inboxes, agents, teams, and more – into PostHog, whether you use Chatwoot Cloud or a self-hosted instance.

## Prerequisites

You need a Chatwoot account and a user API access token. Use an **administrator's** token: agent tokens only see conversations in their assigned inboxes, and only administrators can manage webhooks (needed for real-time syncing).

## Adding a data source

<SourceSetupIntro />

You need three things to connect Chatwoot:

1. **API access token**: in Chatwoot, click your avatar, open **Profile settings**, and copy the token under **Access token**.
2. **Account ID**: the number in your Chatwoot URL, e.g. `app.chatwoot.com/app/accounts/<account ID>`.
3. **Instance URL** (self-hosted only): your Chatwoot instance URL, for example `https://chatwoot.example.com`. It must use HTTPS. Leave this empty for Chatwoot Cloud.

## Sync modes

<SyncModes />

Chatwoot's API has no "updated since" filter, so scheduled syncs are always full refreshes. For the `conversations` and `messages` tables we recommend **webhook sync**: after an initial backfill, Chatwoot pushes changes to PostHog in real time, which is both fresher and much cheaper than re-walking the API on every sync. This matters most for `messages`, which is fetched one conversation at a time, so full refreshes on large accounts issue at least one request per conversation.

## Webhooks for real-time syncing

When you select the webhook sync method for `conversations` or `messages`, PostHog creates the webhook in your Chatwoot account automatically (this requires an administrator token). Recent Chatwoot versions sign webhook deliveries with a per-webhook secret, which PostHog verifies; the secret is captured automatically when the webhook is created.

To set the webhook up manually instead: in Chatwoot, go to **Settings → Integrations → Webhooks**, add the webhook URL shown in PostHog, and subscribe to the conversation and message events. Older self-hosted Chatwoot versions don't sign deliveries – in that case, enable the signature bypass toggle on the webhook function in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Chatwoot rejected your API access token**: check the token is copied correctly from **Profile settings → Access token** and that its user is a member of the configured account.
- **Account not found**: the account ID doesn't exist on the configured instance. Check the number in your Chatwoot URL and, for self-hosted instances, the instance URL.
- **Missing conversations**: agent tokens only see conversations in their assigned inboxes. Reconnect with an administrator's token.
- **Contacts look incomplete**: Chatwoot's contact list only returns contacts with an email, phone number, or identifier, so anonymous web-widget visitors are not included.

<TroubleshootingLink />
