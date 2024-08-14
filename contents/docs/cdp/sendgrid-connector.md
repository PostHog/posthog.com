---
title: Sendgrid
github: 'https://github.com/PostHog/sendgrid-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=Sendgrid'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/sendgrid-connector.png
tags:
  - sendgrid-connector
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import PostHogMaintained from "./_snippets/posthog-maintained.mdx"

Send event and emails data from PostHog into Sendgrid whenever a user is identified in PostHog.

<Requirements />

You'll also need Sendgrid access, obviously.

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline)" tab in the left sidebar.
2. Search for 'Sendgrid' and select the destination, press Install.
3. Add your Sendgrid API key at the configuration step.
4. Enable the destination and watch your contacts list get populated in Sendgrid!

## Configuration

<AppParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all destinations on the platform. The [source code](https://github.com/PostHog/sendgrid-plugin) is available on GitHub.

### Who created this destination?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri) and [Marius Andra](https://github.com/mariusandra), as well as and community member [Jose Fuentes Castillo](https://github.com/j-fuentesg) for creating this. Thank you, all!

<PostHogMaintained />

<FeedbackQuestions />

