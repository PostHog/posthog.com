---
title: How to respond to frequently asked questions
sidebar: Handbook
showTitle: true
---

Here's how to respond to common customer requests. These usually arrive in the form of new contact form submissions but may also be asked by existing customers too.

## Can you increase my rate limits?

We are working on a charging model for this, but for now we need to first figure out whether a customer should optimize their usage of our [/query](/docs/api/queries) endpoint before raising any limits.  Start a thread in <PrivateLink url='https://posthog.slack.com/archives/C0932JBCUFL'>#project-endpoints</PrivateLink> with the organization and project IDs of the customer and which endpoint they are using.  The Endpoints team can then help figure out why they are being rate limited and whether they can solve their problem without removing rate limits (e.g. through materialization of views).  If we do need to add them to the rate limit override, you should first make it clear to the customer that we will soon be charging separately for this endpoint, but increased rate limits are free before that charging model is released.

You may also find customers using our deprecated /events endpoint.  They should migrate from this to a supported solution - this [docs page](/docs/api/events) details the correct path that they should take based on their use case.

## Do you have plans to add more hosting options outside of the US and EU?

Right now, no. The vast majority of our customers are happy to host on one or the other, with EU being the preferred domain for GDPR compliance. This is not a "never", just not in the near future.

## Do you have a dummy account we can mess around with?

No, the best way to trial PostHog is to start sending your own data into it. When a trial is filled with dummy data, which isn't relevant to the specific team, the overall engagement and success of the trial is lower.

## Does PostHog follow the MEDDPICC sales methodology?

Yes! But like everything we do here, it's not what you would expect. At PostHog, MEDDPICC means "Make every deal a delightful PostHog implementation - Charles Cook"
