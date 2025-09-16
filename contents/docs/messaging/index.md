---
title: "Messaging Overview"
---

## Introduction

Messaging is PostHog’s no-code drag-and-drop tool for building automated campaigns.  
Think of it as a way to **message your users** – you decide which users should receive which messages, when, and through which channel.

Campaigns are made up of:

- **A Triggers** – what starts the campaign. We let you start a campaign why an event (e.g. a user signs up), or programmitcally via a webhook
- **Actions** – the messages you send (Email, Slack, SMS, Webhook, or any PostHog CDP destination).
- **Delays** – wait steps such as "wait 2 days" or "wait until condition is true."
- **Audience splits** – Target and split the users you message with more specificity or try a/b testing with random branching.

A campaign always starts with a trigger and ends with an exit, but you can add as much logic in between as you like.

![Example workflow](/images/docs/messaging/workflow-example.png)

---

## Why use Messaging?

- **Native email support** with PostHog – no extra integrations needed.
- **Composable CDP**: any PostHog real-time destination (see [CDP destinations](/docs/cdp)) can be dropped into a campaign as a messaging step.
- **No-code** builder: drag, drop, and publish.
- **Analytics-native**: use PostHog’s events, cohorts, and feature flags to target the right people.

---

## Getting started

There are three steps to launching a campaign:

1. **Design the workflow** – drag and drop steps in the builder.
2. **Set up your messaging channels** – email is supported out of the box, but you can configure others.
3. **Review and launch** – test, monitor, and iterate.
