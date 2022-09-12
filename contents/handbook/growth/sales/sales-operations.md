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
   1. Book a demo directly on our calendar via our [pricing](/pricing) page
   1. Fill in the contact form on the [signup](/signup/self-host/get-in-touch) page, which captures which plan they are interested in as well as metrics such as MAUs, event count etc.
   1. Email us directly at hey@ or sales@
1. (If it's a direct demo booking, skip to 3)  We'll email them introducing ourselves and answering any questions they've shared as well as offering up a call/demo to discuss their needs further.
1. On the initial call we'll spend some time understanding what they want and then optionally give a [demo](/handbook/growth/sales/demos) if that's what they are there for.
1. Ensure call notes go into HubSpot against the contact/company/deal so that they are shared amongst the wider team
1. If they are ready to get started with PostHog, we should get them into Slack:
   1. For lower volume customers we should direct them to User Slack.  Send them an invitation from the workspace and don't forget to say hi when they join, directing them to #community-support for help.
   2. For higher volume customers we can create a Slack Connect channel in our Company Slack, this allows us to provide more focused support to ensure that they are successful.
1. As a priority we should get them sending data in from production (even just a small part of thair app) so that they can see the value of PostHog quickly (decreasing time to revenue) see how we do this in the Onboarding section below.


## Self-serve Process

1. Customer will either:
   1. Sign up for a cloud account at app.posthog.com
   1. Sign up for a self-hosted license at license.posthog.com

   (Both of these options require a credit card to be entered so will set up a billing plan in Stripe).
1. At the earliest opportunity we should invite them to our [User Slack](https://posthogusers.slack.com).  When they join say hi and have a chat about what they are doing.
1. Monitor volumes using revenue.posthog.net and the [CS Customer Lookup](https://app.posthog.com/dashboard/47319) dashboard.  If it looks like they are ramping up their usage get in touch to make sure they aren't blocked:
   1. Offer up a Zoom to discuss what they are trying to do.
   1. Create a Slack Connect channel for support if they are sufficiently large.


## Ensuring customers see value quickly

Most potential customers will show up because they want to replace an existing analytics product, or start doing product 
analytics from scratch.  In either case, we should show them the power of PostHog as quickly as possible.  To that end, 
getting live **production** data through our pipeline and available for analysis should be our top priority.
1. Help them get set up with tracking their production site/app one of our client or server [libraries](https://posthog.com/docs/integrate/libraries).
   1. JavaScript / Autocapture is the easiest - also make sure to turn on Session Recording.
1. If people aren't sure what they want to track, AARRR is a great framework to use and will give people a good taster on the types on insight they can see.  We have a number of supporting resources:
   1. A [blog post](/blog/aarrr-pirate-funnel) on getting started with the framework.
   2. A sample AARRR [tracking plan](https://docs.google.com/spreadsheets/d/12uV5aKAhU_wygUQl3YXZU2J_QN_AZi4nPFj-9WIKhlY/edit#gid=0) which we can give to customers to fill in.  It shows how we do things at PostHog and may help inspire people who don't know how to get started.
1. Encourage them to create dashboards for them to show off PostHog in the wider organization.
1. Keep on top of any [support](/handbook/growth/customer-support) requests / blockers they may have.


## Free trials?

Generally speaking we don't need to do anything around free trials as both our self-serve and cloud plans have generous 1m free tiers.  If a customer is 
going to go over this limit pretty quickly then we can agree to give them 1 month free usage - the easiest way to do this is to get them to subscribe to either plan and then apply a 100% discount coupon for a month on Stripe.  See the [billing](/handbook/growth/sales/billing) page for more info.


### Figuring out the best solution for a customer

Assuming PostHog is the best solution for a customer, you should look at their level of scale and if they have any specific privacy or security needs to determine the most appropriate plan for them.  

- _Low volume, less technical_ - start with Cloud, which is free up to 1m monthly events and very fast to get going with. 
- _Low volume, more technical_ - Cloud still probably makes sense, unless they have privacy needs in which case Self-host has a 1m monthly event free tier. 
- _High volume, less technical_ - Cloud will be the best bet - pricing does increase at scale as we take on hosting costs, but the setup process and ongoing maintenance is very straightforward. 
- _High volume, more technical_ - Still Cloud, although with strict privacy constraints Self-host + Enterprise pack although we can't yet support this at super high volumes (>1bn events/month).

### What about Open Source?

Open Source will be appealing to customers who want to self-host, but are happy with 1 project only and community-based support. 

By contrast, paid has premium features around collaboration - such as user permissions so people can't delete everything, multiple projects to keep data tidy, basically functionality to keep things running smoothly when you have lots of logins.


### Okay, they're using PostHog. Now what?

Congratulations, this is the best part! Now we focus on making customers successful at unlocking insights into their product. 

Read about how we do this in the dedicated handbook section, [Ensuring Customer Delight at PostHog](/handbook/growth/customer-support). 

## How we measure revenue

We typically use two top-level metrics when looking at revenue: MRR (monthly recurring revenue) and NRR (net revenue retention).

The easiest way to see these is on the [revenue site](https://revenue.posthog.net)

The revenue site is based on a [script](https://github.com/PostHog/growth-accounting#calculating-revenue) located in the [growth accounting repo](https://github.com/PostHog/growth-accounting) which we originally used to make these calculations easy.

## FAQs

_Can I give a Self-host customer a free trial?_

No, because we don't need to - they can get up and running with up to 1 million monthly free events on either Scale or Cloud first if they want to try out PostHog for free. You'll find a lot of inbound customers will do this anyway before talking to us about Scale. 

_Can I give a customer a discount?_

Again, no need - we already have usage-based pricing which is _heavily_ discounted at higher volumes, and we only bill month-to-month, so customers don't need to feel locked in to a longer term contract.  If it's high volume (B2C) we can do this on an ad-hoc basis.

_How do I work with a customer who wants to sign an MSA?_

This occasionally happens when we are dealing with very large companies, who may prefer to sign an MSA due to their internal procurement processes or to have the security of a locked-in contract from a pricing perspective. We have a contract version of our standard terms and conditions that we can use for this - ask Charles. 

We'd only really look to do this with people spending $10k+ per month - we don't do it below this value because of the legal effort required.

_How do I find out a customer's usage?_

[Go to this link](https://app.posthog.com/dashboard/47319) and replace the email filter at the top of the dashboard with the customer's email domain.  You can also filter by organization_id or license_keys if you have them. 

_Can a customer transfer from self-hosted (e.g. Open Source) to Cloud?_

Yes! See [Migrator 3000](https://posthog.com/docs/apps/migrator-3000)

_Can a customer transfer from Cloud to Self-hosted?_

Yes! See [Migrator 3000](https://posthog.com/docs/apps/migrator-3000)

They will _lose_ their dashboard and configuration - this will just retain their events, but usually that's the principal concern.

_A Self-host customer has experienced downtime while we're getting set up - have they lost their data?_

Downtime means that queries won't load, but event ingestion will still continue to work fine. 

_What if the customer knows their user volumes but has no idea about number of events?_

A good approach is to point them to our [Downsampler app](/plugins/downsampling) and set it to say only capture 1% of users. If they then go to their [billing page](https://app.posthog.com/organization/billing), they can see the events count. Multiplying this by 100 will indicate their actual likely volume, without creating a ton of risk that they spend too much money.

We also did a study on PostHog Cloud and most companies were within the range of 50-100 per user per month.

_Can we air gap an installation for customers with especially stringent compliance requirements, for example?_

We _can_ do this, but it is really important to stress that this drastically limits our ability to provide proactive support, and expectations need to be really carefully managed. In addition, we then need them to make an annual, up-front commitment (not month to month), as we won't be able to monitor usage ourselves. 

_Do we provide customers with estimated hosting costs if they are self-hosting?_

We are able to provide rough estimates if they give us their anticipated event volumes, but again this needs to be carefully managed. This can vary a lot - depends on things like how complex their queries are - and we'd expect some instability to start with as we get the scaling to be appropriate.

_What privacy features does PostHog offer?_

- Self-hosting so no data needs to go to a 3rd party
- You can block Auto Capture on certain elements
- You can use PostHog without cookies
- You can mask IPs
- We make it trivial to delete a user's data if requested to do so

_What apps are available?_

We have the [full list here](/apps/). We also accept apps built by the community, which we audit first before adding to the list. 

