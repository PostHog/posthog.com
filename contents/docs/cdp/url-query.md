---
title: Convert URL query parameters to event properties
github: 'https://github.com/PostHog/posthog-app-url-parameters-to-event-properties'
installUrl: 'https://app.posthog.com/project/apps?name=url-query-parameter-converter'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/url-query.png
tags:
  - url-query
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import CommunityMaintained from "./_snippets/community-maintained.mdx"

This transformation automatically converts URL query parameters for specific terms into event properties in PostHog, enabling you to analyse them like any other data point. This can be useful for seeing how your product or content converts based on search terms. 

<Requirements />

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline)" tab in the left sidebar.
2. Search for 'URL query parameter converter' and select the transformation, press Install.
3. Configure the transformation to whitelist the parameters you want to turn into events.

That's it!

## FAQ

### Is the source code for this transformation available?

PostHog is open-source and so are all transformations on the platform. The [source code for this transformation](https://github.com/PostHog/posthog-app-url-parameters-to-event-properties) is available on GitHub.

### Who created this transformation?

We'd like to thank PostHog community member [Benjamin Werker](https://github.com/everald) for creating this app.

<CommunityMaintained />

<FeedbackQuestions />

