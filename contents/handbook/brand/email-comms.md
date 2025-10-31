---
title: Email comms
sidebar: Handbook
showTitle: true
---

Our email communications can be broadly divided into broadcasts (one-off emails to specific lists, like a newsletter), campaigns (repeatable workflows which users move through dynamically), and API triggered emails (self-explanatory).

This page doesn't deal with [our Product for Engineers newsletter](https://newsletter.posthog.com/), which is sent through Substack and managed by the Content & Docs team. 

## Email broadcasts
We regularly send two email broadcasts. 

1. Changelog, a product announcement email sent every month. Sent via Customer.io. 
2. PostHog for Startups, an email to users of our startup program. Sent monthly, via Customer.io.

Occasionally we send other, ad-hoc email broadcasts for specific activities such as outages, reminders, announcements, or deprecations. 

### Changelog
The changelog email is part of [the new release process](/handbook/brand/product-announcements) and is used for [product announcements](/handbook/brand/product-announcements).

Every month, we use Customer.io to share a broadcast which summarizes the highlights from [the weekly changelog](/changelog) over the last month. We use our discretion to choose which updates to highlight, usually showcasing three or four of the most impactful changes. We usually reserve the top spot for making users aware of new beta features. A test is shared with the team ahead before we send to users. 

We tag these emails as `Product updates` in Customer.io, so users can manage their subscriptions. In order to maintain high deliverability, we target this email to users in the `Recently Engaged (4 months)` segment which includes everyone who has logged in the last quarter. 

### PostHog for Startups
Each month, we send an email to users in our PostHog for Startup program. A test is shared with the team ahead before we send to users. This email is targeted to users in the following segments, all at once: `PostHog for Startups (Old)`, `Users in the YC program, old and new`, `Old startup teams (Backfill only)`, and `PostHog for Startups and YC (new)`.

The email is usually comprised of three sections, which inform users of new guides which are relevant to startup use-cases, new betas which are available for them to try, and a spotlight written of a new org in the program. We end by asking for feedback.

We categorize these emails as `Actually useful marketing emails` in Customer.io, so users can unsubscribe if they wish. This email usually comes directly from Joe. 

### Other broadcasts
Any ad-hoc customer email broadcasts are owned by the Brand team, and are usually sent via Customer.io. These can include product updates, outage alerts, or other PostHog news if needed.

These emails are usually tagged as `Service updates` in Customer.io when they include important account or product information. These emails are given a dedicated unsubscribe option in the footer, making it clear that we do not recommend users unsubscribe to these emails. 

Important service updates are the _only_ type of email we may send to unsubscribed users, and only if we feel it is warranted to do so.

> `Service updates` emails are often part of an [engineering incident](/handbook/engineering/operations/incidents). We handle comms for those too. 

Whenever we need to send an email broadcast like this we begin by creating an issue in [the Meta repo](https://github.com/PostHog/meta/), unless it involves discussion of personal information - in which case it is discussed in [Company Internal](https://github.com/PostHog/company-internal). This enables us to summarize information and seek approval from teams while also keeping our work open source, and without requiring everyone log in to Customer.io. Issues are closed when an email is sent. 

If you'd like to work with Brand on an email activity, please begin by opening an issue in the `meta` [repo](https://github.com/PostHog/meta/issues).

## Email campaigns
We maintain many email campaigns to help users get the most out of the product. The most developed and documented of these are our four onboarding campaigns.  

### Onboarding emails
Generally, when we talk about onboarding emails we refer specifically to the flow for PostHog Cloud sign-ups, but there are also other flows in use for other occasions.

#### PostHog Cloud onboarding emails
The latest revision is [Onboarding 7](https://github.com/PostHog/meta/issues/289). You can [read about old revisions on the blog](/blog/how-we-built-email-onboarding). 

The onboarding flow regularly changes as we test new ideas. Any changes to it are, as with all other email campaigns, documented in [the Meta repo](https://github.com/PostHog/meta/). 

We aim for all content in this flow to be relevant and helpful to users, without being salesy. All emails come directly from Joe and he triages replies on a daily basis, answering or redirecting as needed. The campaign is triggered when a user signs up for the first time and has a goal of users achieving `billing product activated` within 7 days of opening any email in the flow. 

We tag all these email flows as `onboarding` in Customer.io and categorize them as `Welcome emails` so that users can easily manage their preferences.

#### Self-hosted and open source onboarding emails
We sunset our paid self-hosted product a long time ago, but some users still try to use the legacy version. For this reason we run a dedicated self-hosted onboarding campaign which includes three emails sent over a course of six weeks. These emails come from the `hey@posthog.com` email address. 

The goal of this flow is to set expectations for what the self-hosted experience is like and to encourage users to move to the PostHog Cloud product for a better experienmce. 

Our open source onboarding email is essentially identical to the self-hosted onboarding flow, but excludes information about the sunsetting of the self-hosted product. 

#### Beta onboarding emails
When a user opts in to a beta via [the feature preview menu](https://app.posthog.com/settings/user-feature-previews) we enter them into an email flow designed to help us collect feedback from users. 

This flow currently comprises a single, personal email from either Joe or the team lead working on the beta feature. This email is sent one week after the user joins the beta and features tailored content based on which beta the user joined. 

When responses come in, Joe generally triages replies and directs feedback to the relevant team, as well as rewarding users with merch as thanks for their feedback. 

> **Launching a beta?** It helps to let the Brand team know in [the team Slack](https://posthog.slack.com/archives/C083V7C6GKE). The team can then add your beta to the beta onboarding flow, and plan ahead for marketing announcements as needed. 

#### Onboarding - new hires
This is an internal email flow for new hires, which triggers whenever a new user signs up with a PostHog email address. We currently exclude most old-time hires from this flow, to avoid blocking their inboxes. 

This campaign runs for a new hire's first 30 days and sends them 7 emails with information to help them get setup at PostHog. 

There's no way to unsubscribe from these emails, but if you're triggering them with test accounts then let the Brand team know and they can exclude you from the campaign. 

### Other email campaigns
We run a series of other, small campaigns with smaller volumes. These include:

- **The replay recommender** is a campaign which encourages users who have ingested a large number of unwatched replays to watch some of the recordings. 
- **Teams upsells & cancellations** are two separate campaigns. The first triggers when a team invites their sixth and ninth team member, suggesting the Teams add-on to boost collaboration. The second triggers when the add-on is disabled, comes from Zach, and requests feedback. 
- **G2 review Requester** is described in [Testimonials & G2](/handbook/brand/testimonials)
- **Startup & YC updates** is a series of campaigns for the startups and YC programs. These broadly notify users when they join the program, and use 50%, 75% and 100% of their available credit. 

## API triggered emails
We maintain a series of API triggered emails by working with the Growth team. These are found in Customer.io's transactional tool and broadly encompass billing and security updates, such as an upcoming bill or a change to 2FA settings. These emails are triggered by API in order to keep them highly relevant and with high deliverability. 

Transactional emails feature Liquid code to help personalize their content. All transactional emails should contain in the main body content the Liquid to clearly indicate to the user which project or organization the email is regarding, with suitable fallbacks. For example:

```
We turned the free allowance for {{ trigger.product_name | default: "a product" }} on {% if trigger.team_name %}{{ trigger.team_name }}{% else %}your account{% endif %} off and on again, giving you another month of free usage.
```




