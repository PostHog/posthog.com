---
title: How to enrich customer data by connecting PostHog with Variance
sidebar: Docs
showTitle: true
author:
  - noah-brier
tags:
  - apps
  - cdp
date: 2022-07-01T00:00:00.000Z
---

_Estimated reading time: 6 minutes_ ☕☕

Variance lets revenue teams get more out of their analytics data. Using the [Variance integration](/apps/variance-connector) to integrate Variance with PostHog makes it easy to send your event data on to Variance for processing. 

To get the most out of [Variance](https://www.variance.com/), there are a few key use cases:

- **Account-level activity**: Revenue teams at B2B companies need to see account level data to be effective, but many teams still capture data at the user level, making it a challenge to aggregate it up to accounts or workspaces. Variance rolls everything up at the account level to make this easy.

- **Milestones**: In sales scenarios, it’s common to want to see the progress a specific prospect or customer has made across all of their journey stages. Milestones make it easy to describe those sales stages in a data-driven way and monitor them in real-time on all accounts and contacts.

- **Real-time alerts and synthetic events**: Variance lets sales personnel create specific, customisable alerts for customer activity on accounts they own. Variance also lets teams create “synthetic events”, such as when a customer is fully onboarded or has reached PQL.

- **CRM sync**: Most CRM tools can't understand event-driven data, so Variance reshapes it into a format that makes sense, making it easy to create views or kick off campaigns in your CRM using product data.

If any of that sounds interesting, then follow along as we break down those common use cases...

## Account-level activity
This is probably the most common use case for Variance, and also one of the simplest. The Variance Connector offers a few different methods for generating accounts based on your product data, the most common of which is to use specific properties as an account name or ID (or both).

When you set up PostHog in Variance, you’ll be asked for your “account matching” method. If you want to explicitly match accounts, you’ll choose the option to use identify with custom traits.

![Variance Connector for PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/variance/variance-connector-posthog.png)

There you’ll enter any properties you send with your `identify` call that you want to use to generate accounts that are associated with that user. We recommend using `company.name` and `company.id` if possible, but anything is fine. If you don’t have any of that data, you can also just use the domain of the `email` you pass through.

By doing this, we make it easy to see all that activity rolled up on an account profile:

![Variance Connector for PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/variance/variance-connector-posthog-2.png)

## Milestones
Milestones are how Variance describes data-driven sales or customer journey stages. Essentially, they’re a partner to the more typical sales stages you would see inside a B2B software organization, but instead of being based on intuition, they’re based on the actual actions of your prospects and customers on your website and in your product. 

Common Milestones used inside SaaS companies include Onboarded, Activated, and PQL ([product-qualified lead](https://www.variance.com/guides/product-qualified-leads-pql)). 

Getting started with building Milestones in Variance is easy. You just use our Milestone builder to describe the events, thresholds, properties, and even time windows that you want to use to define these stages.

![Variance Connector for PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/variance/variance-connector-posthog-3.png)

While it’s easy to build Milestones, the most common question we get is about what those Milestones should be. To that end, we recommend starting with what we call “[Minimum Viable Milestones](https://www.variance.com/posts/mvm-minimum-viable-milestones)”. Those are:

- Signed Up
- Onboarded
- Product Qualified (PQL)
- Transacted
- Expansion Qualified (EQL)

The beauty of those five is that they form a straightforward product funnel that should be an excellent place to start for any GTM team.

## Real-time alerts and Synthetic Events
Variance enables you to take any event data in the system and route it through a “Stream” that can notify you in Slack or Zapier whenever that event has occurred. 

Those streams can be configured in any way you want, by following specific accounts or contacts, all accounts or contacts in a specific Milestone stage, cut by key pricing, onboarding, or integration events, or just about anything else you want to do. Rather than writing a query for these event streams, you just configure them in the UI:

![Variance Connector for PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/variance/variance-connector-posthog-4.png)

It’s not just those events that you have explicitly captured that are available here, though, we also generate “synthetic events” from all your Milestones and Smart Events. Each time an account makes progress against a PQL, for instance, you might want to get informed in Slack. We send a “Milestone Updated” event with details about the action that the account took to push their PQL score forward.

![Variance Connector for PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/variance/variance-connector-posthog-5.png)

## CRM Sync
Finally, most of the focus up to now has been on how to see this data in Variance or Slack, but for revenue teams, it’s also critical they can see that data in their CRM. To that end, we have a super simple way to keep data synced to Hubspot and Salesforce. 

Say you want to keep track of the PQL progress for all your accounts in [Salesforce](/apps/salesforce-connector) or [Hubspot](/apps/hubspot-connector). All you have to do is find the property that Milestone generates on the Account and toggle on syncing.

![Variance Connector for PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/variance/variance-connector-posthog-5.png)

From there how you use that data is really up to you. Some users use it in CRM views for their sales team, to kick off automation flows, and a whole host of other scenarios. As we said at the beginning, a big part of the value of Variance is transforming analytics data into the structure of revenue, which means making it easy to work with in your CRM.

Ready to get started? [Sign-up to Variance for free](https://www.variance.com/) and install the connector app in just a few minutes. 
