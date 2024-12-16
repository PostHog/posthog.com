---
title: Email comms
sidebar: Handbook
showTitle: true
---

We regularly send two emails. 

1. Changelog, a product announcement email sent every month. Sent via Customer.io. 
2. PostHog for Startups, an email to users of our startup program. Sent monthly, via Customer.io.

In addition, Words & Pictures also owns the onboarding email flow, which is controlled by Customer.io. 

### Changelog
The changelog email is part of [the new release process](/handbook/words-and-pictures/product-announcements) and is used for [product announcements](/handbook/words-and-pictures/product-announcements).

Every month, we use Customer.io to share a broadcast which summarizes the highlights from [the weekly changelog](/changelog) over the last month. We use our discretion to choose which updates to highlight, usually showcasing three or four of the most impactful changes. We usually reserve the top spot for making users aware of new beta features. A test is shared with the team ahead before we send to users. 

The changelog email always ends by directing users to subscribe to Product for Engineers. 

We tag these emails as `Product updates` in Customer.io, so users can manage their subscriptions. 

### PostHog for Startups
Each month, we send an email to users in our PostHog for Startup program. This email goes to all users in any org which is registered in the program, and the list of users (and their org_ids) are tracked in [the mailing list sheet](https://docs.google.com/spreadsheets/d/1ryDGzXcG0OSH-GoX-zlI2CKwNu-6Zivi7EM32WLdids/edit?usp=sharing). A test is shared with the team ahead before we send to users. 

Each month, Joe combines new orgs into [the startups cohort](https://app.posthog.com/cohorts/44794) and exports this to Customer.io for this email. 

The email is usually comprised of three sections, which inform users of new guides which are relevant to startup use-cases, new betas which are available for them to try, and a spotlight written of a new org in the program. We end by asking for feedback.

We categorize these emails as `Actually useful marketing emails` in Customer.io, so users can unsubscribe if they wish. 

### Onboarding emails
The onboarding email logic is complex, and regularly changes as we test new ideas. Any changes to it are, as with all other email campaigns, documented in [the Meta repo](https://github.com/PostHog/meta/). The latest revision is [Onboarding 5.1](https://github.com/PostHog/meta/issues/197). 

The onboarding flow is composed of several workflows, with dedicated flows for: 

- All cloud sign-ups
- All self-hosted sign-ups
- All open-source deploys
- Cloud users who have not subscribed to replays
- Cloud users who have not subscribed to feature flags

We aim for all content in these flows to be relevant and helpful to users, without being salesy. We use a mix of personal and 'designed' email styles, with personal emails coming directly from the inbox of relevant people (namely, Andy and Joe). When we get replies or feedback to these emails, we share it on Slack. 

A full description of the flows above is found in [the Onboarding 3.0 issue](https://github.com/PostHog/meta/issues/123). 

We tag all these email flows as `onboarding` in Customer.io and categorize them as `Welcome emails` so that users can easily manage their preferences. 

### Other email communications
Any ad-hoc customer communications over email are owned by the Words & Pictures team, and are usually sent via Customer.io. These can include product updates, outage alerts, or other PostHog news if needed.

These emails are usually tagged as `Service updates` in Customer.io when they include important account or product information. These emails are given a dedicated unsubscribe option in the footer, making it clear that we do not recommend users unsubscribe to these emails. 

Important service updates are the _only_ type of email we may send to unsubscribed users, and only if we feel it is warranted to do so.

> `Service updates` emails are usually part of an [engineering incident](/handbook/engineering/incidents). If an incident is declared, please ensure the Support team is aware as soon as possible by posting in the [#team-support](https://posthog.slack.com/archives/C075D3C5HST) Slack.

We are currently testing email as a channel for other activities, such as product upsells. We tag these emails as `Actually useful marketing emails` in Customer.io and have found the a personal, non-designed approach works best. 

Whenever we plan a new email activity we open an issue in [the Meta repo using the Messaging issue template](https://github.com/PostHog/meta/). This enables us to summarize information and seek approval from teams while also keeping our work open source, and without requiring everyone log in to Customer.io. Issues are closed when an email is completed. 

If you'd like to work with Words & Pictures on an email activity, please begin by opening an issue in the `meta` [repo](https://github.com/PostHog/meta/issues)https://github.com/PostHog/meta/issues. 
