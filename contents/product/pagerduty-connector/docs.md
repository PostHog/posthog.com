---
title: How the PagerDuty Connector app works
showTitle: true
topics:
    - pagerduty connector
---

# What does the PagerDuty plugin do?

This plugin alerts PagerDuty when a PostHog insights/trends graph goes below or above a threshold.

Example use cases:
- alert when there is no $pageviews captured on my site the past hour,
- alert when the rate of $billing_error events crosses a threshold.

## How do I configure the PagerDuty plugin?

1. Get the trends URL.
  - Go to Insights
  - Construct the Trends query you want to alert on
  - Copy the URL
2. Choose threshold and operator (less than or equal, greater than or equal)
3. Enter PagerDuty service integration key (for Events API v2)

## Are there any limitations?

This PagerDuty plugin only works when reading from single-line trend graphs.

It also requires PostHog 1.26.0 or above, or PostHog Cloud.

## How can I find out more?

Easy. [Join our Slack community.](/slack)

