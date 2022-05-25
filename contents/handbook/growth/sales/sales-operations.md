---
title: Sales operations
sidebar: Handbook
showTitle: true
---

## Overview

This page outlines how we manage customers, specifically those who are interested in our Scale or Enterprise plans. Our Cloud plan is generally self-serve, although we may direct customers to sign up for a Cloud account after an initial demo based on their requirements.

If you are looking for guidance on how to manage customers in HubSpot specifically, visit our [CRM page](/handbook/growth/sales/overview).

## Process 

1. Customer will either:
   1. Book a demo directly on our calendar via our [pricing](/pricing) page
   2. Fill in the contact form on the [signup](/signup/self-host/get-in-touch) page, which captures which plan they are interested in as well as metrics such as MAUs, event count etc.
   3. Email us directly at hey@ or sales@
2. (If it's a direct demo booking, skip to 3)  We'll email them introducing ourselves and answering any questions they've shared as well as offering up a call/demo to discuss their needs further.
3. On the initial call we'll spend some time understanding what they want and then optionally give a [demo](/handbook/growth/sales/demos) if that's what they are there for.
4. Ensure call notes go into HubSpot against the contact/company/deal so that they are shared amongst the wider team
5. At the end of the call we should figure out if they fit into the hands-on or self-serve pipeline, agree the relevant next steps and continue accordingly.

### Self-serve pipeline

This is for organizations who are likely smaller and prefer the flexibility of metered monthly billing, either on Cloud or Scale.
1. After the initial call, send a follow-up email covering the following topics:
   1. Any unanswered questions which came up in the call
   2. Encouraging them to join our [User Slack](https://posthogusers.slack.com)
   3. Encouraging them to enter credit card details to unlock the 1m event free tiers on [Cloud](https://app.posthog.com/organization/billing) or [Scale](https://license.posthog.com)
2. Move any associated deals in HubSpot to the self-serve pipeline (see the [CRM](/handbook/growth/sales/crm) section)

### Hands-on pipeline
This is for organizations who are interested in our Enterprise plans (self-hosted or cloud) and will likely be at higher monthly event volumes (>50m) or want non-standard monthly billing.
1. For hands-on evaluations, enterprises can do one of the following:
   1. If they are willing to time-box the evaluation to 30 days then we can grant them free unlimited use of either a cloud account or self-hosted license.
   2. For longer evaluations, encourage them to take advantage of the 1m free monthly events either on Cloud or Self-hosted by entering credit card details.
2. Set up a shared public Slack channel using Slack Connect in our company workspace.  Pull the relevant PostHog team members in at the right time to help with:
   1. Deploying and tuning a self-hosted instance
   2. Product feedback
   3. Anything else to make the customer successful
3. Create a deal in the hands-on pipeline in HubSpot (see the [CRM](/handbook/growth/sales/crm) section)
4. Schedule an initial kick-off call to agree the plan for:
   1. Event ingestion (Autocapture is preferable)
   2. Action and Cohort Setup
   3. Required Insights and Dashboards
   4. Extra features such as Feature Flags, Experiments, Apps
5. Check in with the customer regularly to ensure they are getting value out of the evaluation; offer calls to help them but only if they want/need it.
6. As the trial comes to an end, schedule a call with decision makers to review the progress and agree the commercial next steps.

### CS team customer profiles
Through automation on PostHog.com and HubSpot we have the following (broad) splits of responsibility:

[Cameron](https://posthogusers.slack.com/archives/D038B692C86) looks after:
- Group Demos
- YC onboarding
- Scale customers in the US

[Simon](https://posthogusers.slack.com/archives/D02QULW4MDZ) looks after:
- Scale customers in the EU
- Enterprise customers


### Figuring out the best solution for a customer

Assuming PostHog is the best solution for a customer, you should look at their level of scale and if they have any specific privacy or security needs to determine the most appropriate plan for them.  

- _Low volume, less technical_ - start with Cloud, which is free up to 1m monthly events and very fast to get going with. 
- _Low volume, more technical_ - Cloud still probably makes sense, unless they have privacy needs in which case Scale has a 1m monthly event free tier. 
- _High volume, less technical_ - Cloud will be the best bet - pricing does increase at scale as we take on hosting costs, but the setup process and ongoing maintenance is very straightforward. 
- _High volume, more technical_ - Usually Enterprise as they'll get more focused support from us, as well as SSO and Project permissions but if these aren't needed then Scale.

### What about Open Source?

Open Source will be appealing to customers who want to self-host, but are happy with 1 project only and community-based support. 

By contrast, paid has premium features around collaboration - such as user permissions so people can't delete everything, multiple projects to keep data tidy, basically functionality to keep things running smoothly when you have lots of logins.


### Okay, they're using PostHog. Now what?

Congratulations, this is the best part! Now we focus on making customers successful at unlocking insights into their product. 

Read about how we do this in the dedicated handbook section, [Ensuring Customer Delight at PostHog](/handbook/growth/customer-support). 

## How we measure revenue

We typically use two top-level metrics when looking at revenue: MRR (monthly recurring revenue) and NRR (net revenue retention).

We have developed a [script](https://github.com/PostHog/growth-accounting#calculating-revenue) located in the [growth accounting repo](https://github.com/PostHog/growth-accounting) to make these calculations easy.

## FAQs

_Can I give a Scale customer a free trial?_

No, because we don't need to - they can get up and running with up to 1 million monthly free events on either Scale or Cloud first if they want to try out PostHog for free. You'll find a lot of inbound customers will do this anyway before talking to us about Scale. 

_Can I give a Scale customer a discount?_

Again, no need - we already have usage-based pricing which is _heavily_ discounted at higher volumes, and we only bill month-to-month, so customers don't need to feel locked in to a longer term contract. 

_How do I work with a customer who wants to sign an MSA?_

This occasionally happens when we are dealing with very large companies, who may prefer to sign an MSA due to their internal procurement processes or to have the security of a locked-in contract from a pricing perspective. We have a contract version of our standard terms and conditions that we can use for this - ask Charles. 

We'd only really look to do this with people spending $10k+ per month - we don't do it below this value because of the legal effort required.

_How do I find out a customer's usage?_

[Go to this link](https://app.posthog.com/insights/ZJT7kCug) and replace 'PostHog' with the customer's organization name.  You can also filter by organization_id or license_keys if you have them. 

_Can a customer transfer from self-hosted (e.g. Open Source) to Cloud?_

Unfortunately we don't have a way to do this easily right now. If they have been on a Scale plan, we can do this manually. If they are coming from the Open Source version, we suggest that they just restart on Cloud. 

_Can a customer transfer from Cloud to Scale?_

We offer apps for customers to export all their data to a data warehouse. Then they can [bulk import historical data](/docs/integrate/ingest-historic-data).

They will _lose_ their dashboard and configuration - this will just retain their events, but usually that's the principal concern.

If they need a more complex migration with many pre-made dashboards and lots of users and actions, we are currently trialling a partnership with another company to do this for them for a one off fee. Speak to James H if you have a client interested in this.

_A Scale customer has experienced downtime while we're getting set up - have they lost their data?_

Downtime means that queries won't load, but event ingestion will still continue to work fine. 

_What if the customer knows their user volumes but has no idea about number of events?_

A good approach is to point them to our [Downsampler app](/plugins/downsampling) and set it to say only captiure 1% of users. If they then go to their [billing page](https://app.posthog.com/organization/billing), they can see the events count. Multiplying this by 100 will indicate their actual likely volume, without creating a ton of risk that they spend too much money.

_Can we air gap an installation for customers with especially stringent compliance requirements, for example?_

We _can_ do this, but it is really important to stress that this drastically limits our ability to provide proactive support, and expectations need to be really carefully managed. In addition, we then need to rely on customers to self-report usage back to us monthly, as we won't be able to monitor usage ourselves. 

_Do we provide customers with estimated hosting costs if they are self-hosting?_

We are able to provide rough estimates if they give us their anticipated event volumes, but again this needs to be carefully managed. This can vary a lot - depends on things like how complex their queries are - and we'd expect some instability to start with as we get the scaling to be appropriate.

_What privacy features does PostHog offer?_

- Self-hosting so no data needs to go to a 3rd party
- You can block Auto Capture on certain elements
- You can use PostHog without cookies
- You can mask IPs
- We make it trivial to delete a user's data if requested to do so

_What apps are available?_

We have the [full list here](/plugins/). We also accept apps built by the community, which we audit first before adding to the list. 

