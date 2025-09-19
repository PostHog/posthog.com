---
title: "Messaging overview"
---

## Introduction

Messaging is PostHog’s no-code drag-and-drop tool for building automated campaigns.  
Think of it as a way to **message your users** – you decide which users should receive which messages, when, and through which channel.

Campaigns are made up of:

- **A Trigger** – what starts the campaign. We let you start a campaign when an event is performed (e.g. a user signs up), or programmatically via a webhook.
- **Actions** – the messages you send, Email, Slack, SMS, Webhook, or any PostHog [real time destinations](/docs/cdp/destinations).
- **Delays** – wait steps such as "wait 2 days" or "wait until condition is true."
- **Audience splits** – Target and split the users you message with more specificity or try a/b testing with random branching.
- **PostHog Actions** - Change a person's properties, or trigger other events, once a person reaches a specific point in your campaign.

A campaign always starts with a trigger and ends with an exit, but you can add as much logic in between as you like.

![Example workflow](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/complete_onboarding_workflow_09c6e2c6ad.png)

---

## Why use Messaging?

- **Leverage PostHog Analytics**: use PostHog’s events to quickly message the right people based on the actions they take on your site or app, without a complex integration.
- **No-code** builder: drag, drop, and publish quickly, avoid brittle hardcoded twilio or mailgun campaigns.
- **Composable CDP**: any PostHog real-time destination (see [CDP destinations](/docs/cdp/destinations)) can be dropped into a campaign as a messaging step.


---

## Getting started

After setting up your messaging channels or CDP destinations, [email example here](/docs/messaging/set-up/design-campaign)

There are just 2 steps to launching a campaign:

1. **Design the workflow** – drag and drop steps in the builder.
2. **Design the workflow** – drag and drop steps in the builder.
3. **Review and launch** – test, monitor, and iterate.

> **Note:** Check out our email drip campaign [guide](/tutorials/email-drip-campaign), to see step by step instructions with an example