---
title: Avo
github: 'https://github.com/PostHog/posthog-avo-plugin'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/avo-logo.png
tags:
  - avo
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import CommunityMaintained from "./_snippets/community-maintained.mdx"


[Avo](https://www.avo.app/) is a data governance platform which helps teams plan, implement and verify analytics at any scale. The Avo Inspector sends event schema - but not events themselves - to Avo. This enables you to, for example, avoid losing data or events due to naming issues in your analytics. 

You can read more about Avo in [the official announcement](/blog/avo-plugin-announcement). 

<Requirements />

You'll also need to have an [Avo](https://www.avo.app/) account, obviously. 

## Installation

First, you need to set PostHog as a data source in Avo. We recommend checking Avo's [documentation for setting PostHog as a source in Avo](https://www.avo.app/docs/workspace/connect-inspector-to-posthog).

Once PostHog is set as a source in Avo, simply install and enable the destination in your PostHog instance by heading to the [Data pipelines](https://app.posthog.com/pipeline) section. You'll need to enter your Avo API key to complete the setup. 

## FAQ

### Where can I find out more?

Avo maintains robust [documentation about integrating PostHog and Avo](https://www.avo.app/docs/workspace/connect-inspector-to-posthog).

<CommunityMaintained />

<FeedbackQuestions />
