---
title: Normalize URLs
github: 'https://github.com/PostHog/posthog-url-normalizer-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=URL%20Normalizer'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/url_normalizer.png
tags:
  - url-normalizer
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import CommunityMaintained from "./_snippets/community-maintained.mdx"

This transformation normalizes the format of URLs so you can more easily compare them in insights.

By default, the URL Normalizer converts all URLs to lowercase and strips trailing /s, overriding the old `current_url` property.

<Requirements />

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline)" tab in the left sidebar.
2. Search for 'URL Normalizer' and select the transformation, press Install.

## Configuration

No configuration is needed. The URL Normalizer will automatically convert all URLs to lowercase and remove any trailing slashes.

If you'd like to normalize URLs into a different format, please consider contributing a PR to [the repo](https://github.com/PostHog/posthog-url-normalizer-plugin).

## FAQ

### Is the source code for this transformation available?

PostHog is open-source and so are all transformations on the platform. The [source code for the URL Normalizer](https://github.com/PostHog/posthog-url-normalizer-plugin) is available on GitHub.

### Who created this transformation?

We'd like to thank PostHog user and community member [Mark Bennett](https://github.com/MarkBennett) for creating this app

<CommunityMaintained />

<FeedbackQuestions />
