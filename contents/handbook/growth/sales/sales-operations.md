---
title: Sales operations
sidebar: Handbook
showTitle: true
---

## Overview

This page outlines how we manage customers, differentiating those who make contact via booking a meeting with us (hands-on) versus those who sign up and get going themselves (self-serve).

If you are looking for guidance on how to manage customers in HubSpot specifically, visit our [CRM page](/handbook/growth/sales/overview).


## Hands-on Process 

1. Customer will either:
   1. Fill in the contact form on the [contact](/contact-sales) page, which captures what they are interested in as well as metrics such as MAUs, event count etc.
   1. Email us directly at sales@
1. We'll do some ICP scoring and either route them to self-serve or email them introducing ourselves and answering any questions they've shared as well as offering up a call/demo to discuss their needs further.
1. On the initial call we'll spend some time understanding what they want and then optionally give a [demo](/handbook/growth/sales/demos) if that's what they are there for.
1. Ensure call notes go into HubSpot against the contact/company/deal so that they are shared amongst the wider team
1. If they are ready to get started with PostHog, we should either:
   1. For lower volume customers we should send them a getting started templated email which providers pointers on how to get set up as well as where to get help if they get stuck.
   2. For higher volume customers we can create a Slack Connect channel in our Company Slack, this allows us to provide more focused support to ensure that they are successful.
1. As a priority we should get them sending data in from production (even just a small part of thair app) so that they can see the value of PostHog quickly (decreasing time to revenue) see how we do this in the Onboarding section below.


## Self-serve Process

For customers that sign up themselves, and begin using the product, we provide a number of self-serve resources, including:

1. [Docs](/docs)
1. [Tutorials](/tutorials)
1. [Pre-recorded demo](/book-a-demo)
1. [Slack community](/slack)

Additionally, all users can contact us for support/bugs/feedback using the `?` icon in the top right of the PostHog app. This is routed to the appropriate team in Zendesk.


## Ensuring customers see value quickly

Most potential customers will show up because they want to replace an existing analytics product, or start doing product 
analytics from scratch.  In either case, we should show them the power of PostHog as quickly as possible.  To that end, 
getting live **production** data through our pipeline and available for analysis should be our top priority.
1. Help them get set up with tracking their production site/app using one of our client or server [libraries](/docs/getting-started/install).
   1. JavaScript / Autocapture is the easiest - also make sure to turn on Session Replay.
1. If people aren't sure what they want to track, AARRR is a great framework to use and will give people a good taster on the types on insight they can see.  We have a number of supporting resources:
   1. A [blog post](/blog/aarrr-pirate-funnel) on getting started with the framework.
   2. A sample AARRR [tracking plan](https://docs.google.com/spreadsheets/d/12uV5aKAhU_wygUQl3YXZU2J_QN_AZi4nPFj-9WIKhlY/edit#gid=0) which we can give to customers to fill in.  It shows how we do things at PostHog and may help inspire people who don't know how to get started.
1. Encourage them to create dashboards for them to show off PostHog in the wider organization.
1. Keep on top of any [support](/handbook/growth/customer-support) requests / blockers they may have.


## Free trials?

Generally speaking we don't need to do anything around free trials as our free tier has a generous 1m events, 1m feature flag calls, and 15K sessions.  If a customer is going to go over this limit pretty quickly then we can agree to give them 2 weeks of free usage - this can be done in the billing service.  See the [billing](/handbook/growth/sales/billing) page for more info (and the latest on this).


### Figuring out the best solution for a customer

Assuming PostHog is the best solution for a customer, you should look at their level of scale and if they have any specific security needs to determine the most appropriate plan for them.  

In general, PostHog Cloud is the best option for customers. It is much more scalable than self-hosted instances, doesn't require devops time to configure, monitor, and run, and is also the only way to use all of PostHog's paid features. In certain cases, the open source / free product may be the best choice, if customers are very technical, and also have a strong data control requirement.  

### What about Open Source?

Open Source will be appealing to customers who want to self-host, but are happy with 1 project only and community-based support. 

By contrast, paid has premium features around collaboration - such as user permissions so people can't delete everything, multiple projects to keep data tidy, basically functionality to keep things running smoothly when you have lots of logins.


### Okay, they're using PostHog. Now what?

Congratulations, this is the best part! Now we focus on making customers successful at unlocking insights into their product. 

Read about how we do this in the dedicated handbook section, [Ensuring Customer Delight at PostHog](/handbook/growth/customer-support). 

## How we measure revenue

We typically use two top-level metrics when looking at revenue: MRR (monthly recurring revenue) and NRR (net revenue retention).

The easiest way to see these is on the [go/revenue](http://go/revenue) dashboard. These queries were built by Tim 


## FAQs

_Can I give a customer a discount?_

Again, no need - we already have usage-based pricing which is _heavily_ discounted at higher volumes, and we only bill month-to-month, so customers don't need to feel locked in to a longer term contract.  If it's high volume (B2C) we can do this on an ad-hoc basis.

_How do I work with a customer who wants to sign an MSA?_

This occasionally happens when we are dealing with very large companies, who may prefer to sign an MSA due to their internal procurement processes or to have the security of a locked-in contract from a pricing perspective. We have a contract version of our standard terms and conditions that we can use for this - ask Charles. 

We'd only really look to do this with people spending $20k+ per year - we don't do it below this value because of the legal effort required.

_How do I find out a customer's usage?_

The tool we use for this currently is [Pocus](https://app.pocus.com), which combines revenue, PostHog, HubSpot data all in one place. You can search for the org/user/domain using cmd + k and the popover should give a deep dive into usage across products, revenue, engagement, etc.

_Can a customer transfer from self-hosted (e.g. Open Source) to Cloud?_

Yes! See [migration tools repo](https://github.com/PostHog/posthog-migration-tools) for events and the [migrate meta](https://github.com/PostHog/posthog-migrate-meta) repo for everything else.

_Can a customer transfer from Cloud to Self-hosted?_

Yes! See [the Replicator app](/docs/apps/replicator) for events and the [migrate meta](https://github.com/PostHog/posthog-migrate-meta) repo for everything else.


_What if the customer knows their user volumes but has no idea about number of events?_

A good approach is to point them to our [Downsampler app](/plugins/downsampling) and set it to say only capture 1% of users. If they then go to their [billing page](https://app.posthog.com/organization/billing), they can see the events count. Multiplying this by 100 will indicate their actual likely volume, without creating a ton of risk that they spend too much money.

We also did a study on PostHog Cloud and most companies were within the range of 50-100 per user per month.


_What privacy features does PostHog offer?_

- Self-hosting so no data needs to go to a 3rd party
- You can block Auto Capture on certain elements
- You can use PostHog without cookies
- You can mask IPs
- We make it trivial to delete a user's data if requested to do so

_What apps are available?_

We have the [full list here](/apps/). We also accept apps built by the community, which we audit first before adding to the list. 

