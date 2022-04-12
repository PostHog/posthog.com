---
title: How the Property Filter app works
showTitle: true
topics:
    - property-filter
---

## What does the Property Filter app do?

This app sets all specified properties on ingested events to `null`, effectively preventing PostHog from collecting information you do not want it to use. 

It is [used by teams such as WittyWorks to protect user privacy](https://posthog.com/customers/wittyworks) by removing unneeded geographic data. 

## How do I install the Property Filter app?

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'Property Filter' press 'Install'
4. Configure the by app by following the onscreen instructions. 

It's important to note that this app effectively removes information from PostHog events by setting properities to `null`. Apps on PostHog run in sequence, so it usually makes sense to place this app at the _end_ of a sequence. 

Note: If you are filtering `$ip`, `event.ip` will also be set to null.

## Does this filter properties for retrospective events?

No. The Property Filter app will only work on events ingested _after_ it was enabled. 

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.