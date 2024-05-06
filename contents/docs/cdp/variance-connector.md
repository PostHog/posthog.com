---
title: Variance
github: 'https://github.com/PostHog/posthog-variance-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=Variance'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/variance.png
tags:
  - variance-connector
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"

This destination exports PostHog data to Variance in real-time and formats it for use by revenue teams. This includes extracting accounts and contacts, making it easy to see customers by sales stage, and more.

<Requirements />

The destination supports `capture`, `page`, `identify`, and `alias` calls.

## Installation

To install the Variance destination you'll need a Variance account. In your Variance account go to Variance > Integrations > Create a new PostHog connection. This will give you a Webhook URL and Authorization header value. You will then use those two values when installing the destination in your PostHog instance. Don't forget to hit enable after you've added the configuration details.

## Configuration

<AppParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all transformations on the platform. The [source code](https://github.com/PostHog/posthog-variance-plugin) is available on GitHub.

### Who created this destination?

This destination was created by Variance. We'd like to thank everyone at Variance for creating this. Thanks!

### Who maintains this destination?

This destination is maintained by Variance. If you have issues with the destination not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

<FeedbackQuestions />
