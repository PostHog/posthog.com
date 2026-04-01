---
title: Send events to Trophy for gamification
templateId:
    - template-trophy
---

import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import CommunityMaintained from "../_snippets/community-maintained.mdx"

Send PostHog events to [Trophy](https://trophy.so) to power gamification features like achievements, streaks, and leaderboards.

## Requirements

You'll need:

- A PostHog Cloud account
- A Trophy account with an API key

## Configuring Trophy

First, get your API key from Trophy:

1. Log in to your Trophy account.
2. Navigate to your project settings.
3. Copy your API key.

## Configuring PostHog's Trophy destination

1. In PostHog, click the [Data pipeline](https://app.posthog.com/data-management/destinations) tab in the left sidebar.
2. Click the [Destinations](https://app.posthog.com/data-management/destinations?search=trophy) tab.
3. Search for **Trophy** and click **+ Create**.
4. Enter your Trophy API key and metric key.
5. Map your PostHog user properties to Trophy user attributes as needed.
6. Press **Create & Enable**.

<HideOnCDPIndex>

### Testing

Once you've configured your Trophy destination, click **Start testing** to verify events are being sent correctly.

***

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/trophy/template_trophy.py) is available on GitHub.

<CommunityMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
