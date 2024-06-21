---
title: Memphis
github: 'https://github.com/PostHog/posthog-memphisdev-app'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/memphis_logo.jpg
tags:
  - memphis
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import CommunityMaintained from "./_snippets/community-maintained.mdx"
import ExportDisabled from "./_snippets/export-disabled.mdx"

<ExportDisabled />

This destination enables you to publish events to Memphis as they are ingested into PostHog. [Memphis](https://memphis.dev) is an alternative to traditional message brokers and a real-time data processing platform.    

<Requirements />

You'll also need to have a Memphis account. 

## Install

1. Visit PostHog's [Data Pipeline](https://app.posthog.com/project/apps) tab in the product.
2. Search for Memphis to find the destination, and press install. Alternatively, you can install directly from the repo via the Advanced tab by fetching the following URL: https://github.com/PostHog/posthog-memphisdev-app.
3. Configure the plugin by entering your Memphis credentials and station details.
4. Watch events roll into your station!

To get started with Memphis, please visit [Memphis.dev](https://memphis.dev)

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all destinations on the platform. The [source code for this destination](https://github.com/PostHog/posthog-memphisdev-app) is available on GitHub.

### Who created this destination?

We'd like to thank [EbubeCode](https://github.com/EbubeCode) for creating this destination. Thank you!

<CommunityMaintained />

<FeedbackQuestions />
