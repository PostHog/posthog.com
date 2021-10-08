---
title: Disruption Messages
sidebar: Handbook
showTitle: true
---

## What is a disruption message?

On the Cloud version of PostHog we have the ability to show a message in a yellow warning box to explain to our customers about ongoing disruption. The purpose of this is to be open and proactive with any issues affecting us and reduce the burden on our support hero answering the same question when there is systematic disruption.

## When to use a diruption message?

The disruption message should be used when:
1. **Outage:** Services PostHog relies on are unavailable or intermittent (e.g. Clickhouse is in scheduled maintenance)
2. **Data integrity:** Data is temporarily missing, inaccurate (e.g. duplicated) or significantly delayed
3. **Slow:** Significant regression in the performance of querying or user experience

This list is just a guide - if you feel a disruption message would be valuable in a different scenario, use it.

## How to write a disruption message? 

To give our customers the information they need to work around any disruption and confidence that we're going to resolve it shortly we should include the following information in any issue:
* The approx time the event started
* An approx time the event is expected to end (If unknown, provide the time a further update can be expected)
* The nature of the issue
* The impact the issue is likely to have on any user
* A link to a public GitHub issue with more details in the format `ph-1234`

## How to set up a disruption message?

Its simple:

* Go to feature flags - open the "cloud-announcement" feature flag
* Use a multi-variate feature flag and set the **Variant Key** to be your message in the following format
    * Replace spaces with _ (underscores). E.g. This_is_a_disruption
    * Add a link to the relevant issue using the format `ph-1234` where the number is the id of an issue in the posthog/posthog GitHub repo
    * (N.B. This is quite a hacky feature - since it relies on feature flag keys to render the message)
* Double check the message for PostHog team users first
* If it looks good - set the feature flag "matching settings" to deploy to relevant users (usually all of PostHog Cloud - but sometimes the disruption may only affect a subset of users so the scope of the message can be reduced)
