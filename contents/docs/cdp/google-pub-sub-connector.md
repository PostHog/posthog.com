---
title: Google Pub/Sub
github: 'https://github.com/vendasta/pubsub-plugin'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/pub-sub-export.png
tags:
  - pub-sub
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import PostHogMaintained from "./_snippets/posthog-maintained.mdx"
import ExportDisabled from "./_snippets/export-disabled.mdx"

<ExportDisabled />

This destination sends events from PostHog to a [Google Cloud Pub/Sub](https://cloud.google.com/pubsub/) topic when they are ingested. It's [used by teams such as Vendasta](https://posthog.com/customers/vendasta).

<Requirements />

You'll also need a Google Cloud Pub/Sub account to connect to.

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/apps)" tab in the left sidebar.
2. Search for 'Pub/Sub' and select the destination, press Install.
3. Upload your Google Cloud key .json file. ([How to get the file.](https://cloud.google.com/pubsub/docs/reference/libraries))
4. Enter your Topic ID.
5. Watch events publish to Topic.

## Finding your Google Cloud key .json file

You'll need this file to configure the Pub/Sub destination for PostHog. You can find out where to find it in [Google's Pub/Sub client libraries documentation](https://cloud.google.com/pubsub/docs/reference/libraries).

## Configuration

<AppParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all destinations on the platform. The [source code](https://github.com/PostHog/pubsub-plugin) is available on GitHub.

### Who created this destination?

We'd like to thank PostHog community member Jesse Redl from [Vendasta](https://posthog.com/customers/vendasta) for creating this. Thanks, Jesse!

<PostHogMaintained />

<FeedbackQuestions />
