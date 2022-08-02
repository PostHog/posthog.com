---
title: PagerDuty Connector
layout: app
github: https://github.com/PostHog/posthog-pagerduty-plugin
installUrl: https://app.posthog.com/project/apps?name=PagerDuty
thumbnail: ../../apps/thumbnails/pagerduty.svg
topics:
    - pagerduty connector
---

### What does the PagerDuty Connector do?

This app alerts PagerDuty when a PostHog insights/trends graph goes below or above a threshold.

Example use cases:

-   Alert when there is no $pageviews captured on my site the past hour,
-   Alert when the rate of $billing_error events crosses a threshold.

### What are the requirements for this app?

The PagerDuty Connector app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.26.0](https://posthog.com/blog/the-posthog-array-1-26-0) or later.

Not running 1.26.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need access to a PagerDuty account.

### How do I install the PagerDuty Connector for PostHog?

This app requires PostHog 1.26.0 or above, or PostHog Cloud.

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'PagerDuty'
4. Select the app, press 'Install' and follow the on-screen instructions

### How do I configure the PagerDuty Connector?

-   Get the trends URL.
-   Go to Insights.
-   Construct the Trends query you want to alert on. It must be a single-line trend graph.
-   Copy the URL.
-   Choose threshold and operator (less than or equal, greater than or equal).
-   Enter PagerDuty service integration key (for Events API v2).

### Are there any limitations?

This PagerDuty Connector only works when reading from single-line trend graphs.

It also requires PostHog 1.26.0 or above, or PostHog Cloud.

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the PagerDuty connector](https://github.com/PostHog/posthog-pagerduty-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri) and [Michael Matloka](https://github.com/Twixes) and [Karl-Aksel Puulmann](https://github.com/macobo) for creating the Currency Normalizer. Thank you, all!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
