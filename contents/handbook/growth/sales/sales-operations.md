---
title: Sales operations
sidebar: Handbook
showTitle: true
---

## Overview

This page outlines how we generally manage customers, specifically those who are interested in our Scale plans. Our Cloud plan is self-serve, and may be covered by its own section in the future, but doesn't require a specific guide at this stage.

If you are looking for guidance on how to manage customers in HubSpot specifically, visit our [CRM page](/handbook/growth/sales/overview).

## Process

1. Customer emails us, usually hey@ or sales@, asking about one of our Scale plans (Free or Paid). 
2. We respond quickly and to-the-point. We give specific and clear answers to questions, and do not hide information behind a call or demo. You should find out:
    1. Their company's name if not obvious
    2. Their approximate monthly events and/or MAUs
    3. Who their cloud provider is - AWS, GCP etc.
    4. (Scale Free only) If they have Helm Chart/Kubernetes (k8s) experience
3. We'll usually do an intro call with Yakko (demo and technical questions) and Charles (setup process and pricing) next. The objective of this call is to help figure out with the customer what the best solution is for them, not to push a sale onto them. We have [demo guidelines here](/handbook/growth/sales/demos). For pricing, the most important things to emphasize are a) month-to-month billing only, no minimum contract and b) cost per event is _massively_ discounted at higher volumes. If multiple technical people are joining on the customer's side and they are a large company, you may want an infra engineer to join - only do this _very_ occasionally. 
4. If it looks like the customer wants to go for Scale Paid, create [a Deal](/handbook/growth/sales/crm) in HubSpot to keep track of everything. Record your notes and tag the appropriate member of the [Infrastructure & Deployments Team](/handbook/people/team-structure/infrastructure) depending on the customer's timezone. 
5. You should also set up a shared Slack channel to discuss implementation, as it's the easiest way to resolve any follow up questions. Add as many relevant people on PostHog's side as seems relevant - customers will have a better experience at this stage talking directly to engineers about implementation, not funnelling questions through a single point of contact. 
6. We track implementation in a [GitHub project](https://github.com/orgs/PostHog/projects/10). The first 1-2 months are spent scaling the instance properly so we don't go too big and waste customers' money. Manage expectations - the first few weeks _should_ be a bit laggy/buggy, as this ensures we're not setting them up with a needlessly large server. 
7. Once the customer is ready to begin event ingestion, this is the point at which we will ask for payment details, so we can start tracking usage. Paolo will generate a payment link in Stripe. 
8. Schedule a call to help them set up their first dashboards and ensure they are getting the most out of PostHog. We should ask for at least one Product Manager on the customer's side to join this call, as they are likely to be the key stakeholder at this point. 
9. As part of this dashboard setup, you should get the relevant member(s) of our team added to their account as a guest so we can proactively support with ensuring they have the right dashboards, config etc. (but don't push if they would rather we didn't do this). 
10. Ongoing support is provided in the shared Slack channel. 

After the initial call, if a customer is keen to proceed, you should share steps 5 through 9 with them to ensure that everyone is on the same page and expectations are managed appropriately. 

### Figuring out the best solution for a customer

Assuming PostHog is the best solution for a customer, you should look at their level of scale and if they have any specific privacy or security needs to determine the most appropriate plan for them.  

- _Low volume, less technical_ - start with Cloud, which is free up to 1m monthly events and very fast to get going with. 
- _Low volume, more technical_ - Cloud still probably makes sense, unless they have privacy needs in which case Open Source will be fine up to 10k MAUs. Beyond 10k, Open Source will still work but Postgres limitations at scale means performance will be degraded. 
- _High volume, less technical_ - Cloud will be the best bet - pricing does increase at scale as we take on hosting costs, but the setup process and ongoing maintenance is very straightforward. 
- _High volume, more technical_ - Scale, as the price per event is greatly discounted at higher volumes vs. Cloud because we don't pay hosting costs. The only time Cloud makes sense here is if the customers wants absolutely zero hassle, doesn't have privacy needs and aren't budget-focused.

### What about Scale Free?

We have recently started rolling out Scale Free. Our plan is to make it widely available as a config option in Open Source, but we're keeping them separate for now. Scale Free will be appealing to customers who need ClickHouse due to volume rather than Postgres, but are happy with 3 logins only and community-based support. 

By contrast, Scale Paid is for an entire team to adopt - customers will have engineering and product management all on the platform, and perhaps marketing/execs. Paid has premium features around collaboration - such as user permissions so people can't delete everything, multiple projects to keep data tidy, basically functionality to keep things running smoothly when you have lots of logins.


We have a short waiting list of customers waiting for deployment, so are currently prioritizing those with 10k-1m MAUs, are on GCP and are familiar with Helm Charts/k8s. 

### Okay, they're using PostHog. Now what?

Congratulations, this is the best part! Now we focus on making customers successful at unlocking insights into their product. 

Read about how we do this in the dedicated handbook section, [Ensuring Customer Delight at PostHog](/handbook/growth/customer-support). 

## FAQs

_Can I give a Scale customer a free trial?_

No, because we don't need to - they can get up and running with our Scale Free or Cloud plans first if they want to try out PostHog for free. You'll find a lot of inbound customers will do this anyway before talking to us about Scale. 

_Can I give a Scale customer a discount?_

Again, no need - we already have usage-based pricing which is _heavily_ discounted at higher volumes, and we only bill month-to-month, so customers don't need to feel locked in to a longer term contract. 

_How do I work with a customer who wants to sign an MSA?_

This occasionally happens when we are dealing with very large companies, who may prefer to sign an MSA due to their internal procurement processes or to have the security of a locked-in contract from a pricing perspective. We have a contract version of our standard terms and conditions that we can use for this - ask Charles. 

We'd only really look to do this with people spending $10k+ per month - we don't do it below this value because of the legal effort required.

_How do I find out a customer's usage?_

[Go to this link](https://app.posthog.com/events?properties=%5B%7B%22key%22%3A%22users_who_logged_in__0__email%22%2C%22value%22%3A%22xyz%22%2C%22operator%22%3A%22icontains%22%2C%22type%22%3A%22event%22%7D%5D) and replace 'xyz' with the customer's company name. 

_Can a customer transfer from self-hosted (e.g. Open Source) to Cloud?_

Unfortunately we don't have a way to do this easily right now. If they have been on a Scale Paid plan, we can do this manually. If they are coming from the Open Source version, we suggest that they just restart on Cloud. 

_Can a customer transfer from Cloud to Scale Paid?_

Yes - we offer 3 months free of Scale Paid so they can run both systems in parallel, tracking events in both places. That means when they switch off Cloud, they'll have 3 months of data to start with in Scale.

_A Scale customer has experienced downtime while we're getting set up - have they lost their data?_

Downtime means that queries won't load, but event ingestion will still continue to work fine. 

_What's the difference between Postgres and ClickHouse?_

Postgres you can write huge volumes to, but for analytics queries it's very slow once a team has thousands of users or more. The advantage is that it's super easy to deploy - so a good way to ie get a small project in a huge enterprise up and running. However, you you can't migrate from Postgres to ClickHouse (since the data format is different later). ClickHouse is massively more scalable, but requires a lot more work to deploy, so we provide extra support from our infra team to get everything set up and refined over the first few weeks. 

_What if the customer knows their user volumes but has no idea about number of events?_

A good approach is to point them to our [downsampling plugin](https://posthog.com/plugins/downsampling) and set it to say only captiure 1% of users. If they then go to their [billing page](https://app.posthog.com/organization/billing), they can see the events count. Multiplying this by 100 will indicate their actual likely volume, without creating a ton of risk that they spend too much money.

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

_What plugins are available?_

We have the [full list here](https://posthog.com/plugins/). We also accept plugins built by the community, which we audit first before adding to the list. 

