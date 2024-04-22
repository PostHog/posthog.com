---
title: Salesforce
github: 'https://github.com/PostHog/salesforce-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=Salesforce'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/salesforce.svg
tags:
  - salesforce
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import CommunityMaintained from "./_snippets/community-maintained.mdx"

This destination connects to your Salesforce instance, sending events from PostHog to Salesforce as they are ingested.

<Requirements />

You'll also need a Salesforce account to connect to, as well as the relevant levels of access to install and configure this destination.

## Installation

1. Log in to your PostHog instance
2.  Click "[Data pipeline](https://us.posthog.com/apps)" in the left sidebar
3. Search for 'Salesforce'
4. Select the destination, press 'Install' and follow the on-screen instructions

## Configuration

<AppParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all destinations on the platform. The [source code](https://github.com/PostHog/salesforce-plugin) is available on GitHub.

### Who created this destination?

We'd like to thank PostHog team member [Yakko Majuri](https://github.com/yakkomajuri) and community members [Angela Purcell](https://github.com/purcell3a) and [Conrad Kurth](https://github.com/ConradKurth) for creating this. Thank you, all!

<CommunityMaintained />

<FeedbackQuestions />
