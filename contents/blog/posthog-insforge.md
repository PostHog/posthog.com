---
title: 'PostHog now ships with InsForge'
date: 2026-05-29
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - sara-miteva
# TODO: replace featuredImage with a re-hosted PostHog CDN URL.
# Suggested source: https://d1yrmc4hue7p9m.cloudfront.net/assets/images/insforge-posthog-analytics/cover.webp
featuredImage: ''
featuredImageType: full
category: Product updates
tags:
  - Integrations
  - Product updates
seo: {
  metaTitle: "PostHog now ships with InsForge",
  metaDescription: "InsForge users get a fully provisioned PostHog project on click – embedded analytics, retention cohorts, and session replays inside the InsForge dashboard."
}
---

If you're building on [InsForge](https://insforge.dev) – the YC-batch backend-as-a-service for AI-built apps – you now get PostHog out of the box. There's a **Connect PostHog** button on the InsForge dashboard. Click it, approve the OAuth screen, and seconds later your InsForge project has a PostHog project linked, an embedded analytics page with live data, and credentials waiting in your environment. No signup form, no copy-paste, no second login to remember. Your password manager gets the afternoon off.

The InsForge team [shipped this](https://insforge.dev/blog/insforge-posthog-analytics) last week, and it's one of the first integrations built on PostHog's new [provisioning API](/docs/integrate/provisioning). Here's what it looks like, and how it works.

**[IMAGE: cover.webp – cover image showing the PostHog Analytics view embedded in InsForge]**

## One click to connect

Open the **Analytics** tab in your InsForge dashboard. Before you're connected, it shows a single **Connect PostHog** button.

**[IMAGE: connect-posthog-empty-new.png – InsForge Analytics page with the Connect PostHog empty state]**

If you already have a PostHog account, you'll see PostHog's OAuth consent screen – pick the organization and project, approve, and you're back in InsForge with the page reloaded.

**[IMAGE: posthog-authorize.png – PostHog authorize screen requesting access for InsForge]**

If you're new to PostHog, InsForge creates an account for you in the background using the provisioning API. You'll get a welcome email with a link to set your password – but you don't have to leave InsForge to start seeing data.

Either way, the project token, host, and project ID live behind the gear icon in an **Analytics Config** dialog, ready to copy whenever you need them.

**[IMAGE: analytics-connected-new.png – Analytics Config dialog showing the connection details and PostHog credentials]**

## PostHog, embedded in the dashboard

The Analytics page itself runs on PostHog's [`/query` endpoint](/docs/api/queries), so everything you see is the same data you'd get on posthog.com – just rendered next to your database and storage views. A time-range selector at the top controls every card on the page, and an **Open in PostHog** button jumps you to the full PostHog UI when you want to dig in.

The Traffic tab shows visitor, pageview, and bounce-rate KPIs with trend charts, plus side-by-side breakdowns of top pages, countries, and device types. If the bounce rate is ugly, at least it's ugly in your own dashboard.

**[IMAGE: analytics-traffic.png – Traffic tab on the Analytics page with KPI cards, a trend chart, and breakdowns]**

User Retention shows a weekly retention cohort computed from your `$pageview` events.

**[IMAGE: analytics-retention.png – User Retention tab showing a weekly cohort table over eight weeks]**

Session Replay surfaces the most recent recordings, openable in a modal with the full PostHog player without leaving InsForge. So you can watch users rage-click without rage-clicking through tabs yourself.

**[IMAGE: analytics-session-replay.png – Session Replay tab with a recording opened in a modal showing the PostHog player]**

## Wiring up the SDK with an agent

Connecting the dashboard is only half the job – your app still needs a PostHog SDK to send events. InsForge's Analytics Config dialog includes a **Setup Prompt** tab with a one-line prompt you can paste into Claude Code, Cursor, or any agent that runs the InsForge skill. The skill points the agent at the official [PostHog SDK installation wizard](/docs/getting-started/install), which detects your framework, installs the right SDK, and wires up the provider with your project token. You write the prompt; the agent does the typing.

For headless or CI setups, `npx @insforge/cli posthog setup` runs the same flow from the terminal.

## How the handshake works

The one-click flow uses PostHog's [provisioning API](/docs/integrate/provisioning) – OAuth 2.0 with PKCE and a [Client ID Metadata Document](https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/) (CIMD), so there are no shared secrets to manage. InsForge hosts a small JSON document at a URL on its domain, and that URL is its `client_id` with PostHog.

When you click **Connect PostHog**, InsForge calls three endpoints in sequence: `/account_requests` to create the account or surface the consent URL, `/oauth/token` to exchange the authorization code, and `/resources` to provision the PostHog project and return your credentials. The whole dance takes about a second – more click than choreography.

_If you run a platform and want to ship PostHog the way InsForge does, [the provisioning docs](/docs/integrate/provisioning) walk through the full flow with a Node.js example. Email team-growth@posthog.com if you'd like higher rate limits for production use._
