---
title: Configuring Slack
sidebar: Docs
showTitle: true
---

> **Note** - these instructions are for self-hosted PostHog instances only. If you are using PostHog Cloud or have already configured your instance per these instructions, check out our [general Slack Integration Docs](/docs/libraries/slack)

PostHog has built in support for sending Slack notifications via Actions or Subscriptions. For self-hosted PostHog instances, a Slack App is required so that Teams can add PostHog to their Slack workspace via the standard Oauth flows.


## General configuration

> 🚧 In addition to the Slack App configuration it is important that the instance `SITE_URL` is correctly set. This is used by Slack's Oauth flow to ensure that only your instance uses the Slack App.

Creating a Slack App and configuring PostHog to use it is relatively straightforward thanks to Slack's *App Template* functionality. Visit the Slack section of your instance's **Project Settings** `https://MY_POSTHOG.DOMAIN/project/settings#slack` and follow the pre-templated instructions to setup your instance for Slack.

The creation of a Slack App is only needed **once per instance**. Once setup, each PostHog project can be linked to one Slack Workspace via a simple `Add to Slack` button in Project Settings. See the [general Slack Integration Docs](/docs/libraries/slack) for more information.
