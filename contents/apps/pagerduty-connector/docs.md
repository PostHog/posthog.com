---
title: How the PagerDuty Connector app works
showTitle: true
topics:
    - pagerduty connector
---

## What does the PagerDuty Connector app do?

This app alerts PagerDuty when a PostHog insights/trends graph goes below or above a threshold.

Example use cases:
- Alert when there is no $pageviews captured on my site the past hour,
- Alert when the rate of $billing_error events crosses a threshold.

## How do I install the PagerDuty Connector app for PostHog?

1. Log in to your PostHog instance
2. Click 'Plugins' on the left-hand tool bar
3. Search for 'PagerDuty' 
4. Select the app, press 'Install' and follow the on-screen instructions

## How do I configure the PagerDuty plugin?

- Get the trends URL.
- Go to Insights.
- Construct the Trends query you want to alert on. It must be a single-line trend graph.
- Copy the URL.
- Choose threshold and operator (less than or equal, greater than or equal).
- Enter PagerDuty service integration key (for Events API v2).

## Are there any limitations?

This PagerDuty plugin only works when reading from single-line trend graphs.

It also requires PostHog 1.26.0 or above, or PostHog Cloud.

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.

