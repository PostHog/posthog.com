---
title: Taxonomy Standardizer
installUrl: 'https://app.posthog.com/project/apps?name=Taxonomy+Plugin'
github: 'https://github.com/PostHog/taxonomy-plugin'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/taxonomy-standardizer.png
tags:
  - taxonomy-standardizer
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import PostHogMaintained from "./_snippets/posthog-maintained.mdx"

This connector standardizes all your event names into a single pattern, so that data becomes more consistent and marketing teams aren't driven wild.

## Supported taxonomies

This connector can convert from any of these taxonomies, to any other.

-   Camel Case: `helloThereHedgehog`
-   Pascal Case: `HelloThereHedgehog`
-   Snake Case: `hello_there_hedgehog`
-   Kebab Case: `hello-there-hedgehog`
-   Spaces: `hello there hedgehog`

<Requirements />

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/apps)" tab in the left sidebar.
2. Search for 'Taxonomy Standardizer' and select the connector, press Install.
3. Follow the on-screen steps to configure the connector.

## Configuration

<AppParameters />

## FAQ

### Is the source code for this connector available?

PostHog is open-source and so are all connectors on the platform. The [source code for the Taxonomy Standardizer](https://github.com/PostHog/taxonomy-plugin) is available on GitHub.

### Who created this connector?

We'd like to thank PostHog team member [Yakko Majuri](https://github.com/yakkomajuri) for creating the Taxonomy Standardizer. Thank you, Yakko!

<PostHogMaintained />

<FeedbackQuestions />
