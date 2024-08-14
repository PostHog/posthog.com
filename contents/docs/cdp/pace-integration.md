---
title: Pace
github: 'https://github.com/PostHog/pace-posthog-integration'
installUrl: 'https://app.posthog.com/project/apps?name=Pace'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/pace-integration.png
tags:
  - pace-integration
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import CommunityMaintained from "./_snippets/community-maintained.mdx"

[Pace](https://www.paceapp.com/) is a tool that equips sellers with relevant insights at the right time so they can spend time growing revenue. It allows them to convert, retain, and grow customers by prioritizing time and effort on the users who need it most.

This simply forwards any events that PostHog receives to Pace's internal ingestion endpoint

<Requirements />

You'll also need access to the relevant Pace account.

### Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline)" tab in the left sidebar.
2. Search for 'Pace' and select the destination, press Install.
3. Enable the destination enter your Pace API key to authenticate with Pace.

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all destinations on the platform. The [source code](https://github.com/PostHog/pace-posthog-integration) is available on GitHub.

### Who created this destination?

This destination was created by [Saimon Alam](https://github.com/SaimonAlam15) at [Pace](https://www.paceapp.com/). 

<CommunityMaintained />

<FeedbackQuestions />
