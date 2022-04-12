---
title: How the Orbit app works
showTitle: true
topics:
    - orbit
---

## What does the Orbit app do?

The Orbit app for PostHog pulls data from the Orbit.love workspace API into PostHog, enabling you to track your community as a product metric. 

## How do I install the Orbit app?

1. Visit the "Apps" page in your instance of PostHog.
2. Search for 'Orbit' and select the app, press Install.
3. Follow the on-screen steps to configure the app.

## How do I use the Orbit app?

Workspace stats are sent into your PostHog instance as an `orbit love report` event, which you can filter and explore using PostHog. Supported report types include: overview, members, and activities.

Refer to [Orbit's API documentation](https://docs.orbit.love/reference/about-the-orbit-api) for a full list of properties available in each report.

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.